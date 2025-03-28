import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { AppError } from "../middleware/errorHandler.js";
import { prisma } from "../models/index.js";
import { userService } from "../services/userService.js";

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

// Generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, config.jwtRefreshSecret, {
    expiresIn: config.jwtRefreshExpiresIn,
  });
};

// @desc    Regenerate access token
// @route   POST /api/v1/users/access-token
// @access  Private
export const regenerateAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 400));
    }

    jwt.verify(refreshToken, config.jwtRefreshSecret, async (err, decoded) => {
      if (err) {
        return next(new AppError("Invalid refresh token", 401));
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return next(new AppError("User not found", 404));
      }

      res.status(200).json({
        accessToken: generateToken(user.id, user.role),
      });
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role,
        accessToken: generateToken(user.id, user.role),
        refreshToken: generateRefreshToken(user.id),
      });
    } else {
      return next(new AppError("Invalid user data", 400));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: generateToken(user.id, user.role),
        refreshToken: generateRefreshToken(user.id),
      });
    } else {
      return next(new AppError("Invalid email or password", 401));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (user) {
      res.json(user);
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a user
// @route   POST /api/v1/users
// @access  Private/Admin
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await userService.createUser({
      name,
      email,
      password,
      role: role || "user",
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    if (user) {
      res.json(user);
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const success = await userService.deleteUser(req.params.id);

    if (success) {
      res.json({ message: "User removed" });
    } else {
      return next(new AppError("User not found", 404));
    }
  } catch (error) {
    next(error);
  }
};
