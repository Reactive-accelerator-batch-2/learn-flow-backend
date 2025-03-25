import express from "express";
import { notFound } from "../middleware/errorHandler.js";
import categoryRouter from "./categoryRouter.js";
import instructorRoutes from "./instructorRoutes.js";
import subCategoryRouter from "./subCategoryRoute.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./order.routes.js";

import courseRoutes from "./courseRoutes.js";

const router = express.Router();

// API routes
router.use("/users", userRoutes); //api/v1/users

router.use("/category", categoryRouter);
router.use("/sub_category", subCategoryRouter);

router.use("/instructors", instructorRoutes); //api/v1/instructors
router.use("/courses", courseRoutes); //api/v1/instructors

router.use("/orders", orderRoutes);

// Handle 404 for API routes
router.use(notFound);

export default router;
