# 📜 LEARN FLOW BACKEND - CONTRIBUTION RULES

এই ডকুমেন্টটি বিস্তারিতভাবে ব্যাখ্যা করবে কিভাবে এই Express, MongoDB, এবং Prisma ভিত্তিক ব্যাকএন্ড রেপোজিটরিতে কাজ করতে হবে, কিভাবে ব্রাঞ্চ তৈরি করতে হবে, কিভাবে কমিট মেসেজ লিখতে হবে, এবং কীভাবে PR সাবমিট করতে হবে।

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Reactive-accelerator-batch-2/learn-flow-backend.git
cd learn-flow-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Environment Setup
`.env.example` ফাইল থেকে `.env` ফাইল তৈরি করুন:
```sh
cp .env.example .env
```
এবং আপনার লোকাল ডেভেলপমেন্ট এনভায়রনমেন্ট অনুযায়ী `.env` ফাইল এর ভ্যালুগুলো আপডেট করুন:

```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/learn-flow?retryWrites=true&w=majority"
PORT=3000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d
```

### 4️⃣ Prisma Setup
```sh
npx prisma generate
```

### 5️⃣ Start the Development Server
```sh
npm run dev
```

The application should now be running at `http://localhost:3000`.

---

## 🌲 Branching Strategy

আমরা **Git Flow** মডেল অনুসরণ করি।

- `main` → **Production** (শুধুমাত্র স্থিতিশীল এবং টেস্টেড কোড থাকবে)
- `develop` → **Development Branch** (সর্বশেষ ফিচারগুলোর কাজ চলবে)
- `feature/{feature-name}` → **নতুন ফিচারের জন্য ব্রাঞ্চ**
- `fix/{bug-name}` → **বাগ ফিক্স করার জন্য ব্রাঞ্চ**
- `docs/{documentation-portion}` → **ডকুমেন্টেশন আপডেটের জন্য ব্রাঞ্চ**
- `schema/{model-name}` → **Prisma Schema আপডেটের জন্য ব্রাঞ্চ**
- `api/{endpoint-name}` → **নতুন API এন্ডপয়েন্ট তৈরির জন্য ব্রাঞ্চ**

#### ব্রাঞ্চ তৈরির নিয়ম:

প্রথমে ডেভেলপ ব্রাঞ্চ থেকে নতুন ব্রাঞ্চ তৈরি করুন:
```sh
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication
```

---

## 🗂️ Project Structure

```
learn-flow-backend/
├── prisma/
│   ├── schema.prisma    # Prisma schema file
│   └── seed.js          # Database seeding script
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # MongoDB/Prisma models
│   ├── routes/          # Express routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validations/     # Request validation
│   └── app.js           # Express app configuration
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
└── package.json         # Project dependencies
```

### কোডিং স্ট্যান্ডার্ড

- **মডুলার আর্কিটেকচার**: MVC (Model-View-Controller) প্যাটার্ন অনুসরণ করুন
- **RESTful API নীতি** অনুসরণ করুন
- **Prisma মডেল** সম্পর্কিত পরিবর্তনের জন্য `prisma/schema.prisma` ফাইল আপডেট করুন
- **Controller ফাংশন** নেমিং: `getAllUsers`, `createUser`, `updateUser`, ইত্যাদি
- **Service ফাংশন** নেমিং: `fetchUsers`, `addUser`, `modifyUser`, ইত্যাদি
- **MiddleWare ফাংশন** নেমিং: `isAuthenticated`, `validateUserInput`, ইত্যাদি

---

## 🔖 Issue Management

কোনো ফিচার, বাগ ফিক্স বা ডকুমেন্টেশন আপডেট করার আগে অবশ্যই একটি **GitHub Issue** তৈরি করতে হবে।

### 🔹 Issue তৈরির ধাপ:

1. **Issue Tab এ যান** → `https://github.com/Reactive-accelerator-batch-2/learn-flow-backend/issues`
2. **New Issue ক্লিক করুন**
3. **Issue টাইটেল দিন** (যেমন `Bug: JWT expire not working`)
4. **Description এ বিস্তারিত লিখুন** (যেমন স্ক্রিনশট, স্টেপ-বাই-স্টেপ রিপ্রোডাকশন, ইত্যাদি)
5. **Labels যোগ করুন** (যেমন `bug`, `enhancement`, `documentation`, `prisma`, `express` ইত্যাদি)
6. **Assignee নির্বাচন করুন** (যদি আপনি নিজে করেন তাহলে assign yourself করুন)
7. **Create Issue করুন**

---

## ✍️ Commit Message Convention

আমরা **Conventional Commits** অনুসরণ করি।

**Commit Format:**
```
<type>(scope): <subject>
```

**উদাহরণ:**
```
feat(auth): add JWT authentication system
fix(db): resolve MongoDB connection timeout issue
schema(user): add role field to User model
api(courses): implement GET courses endpoint
docs(readme): update API documentation
```

### 🏷️ Allowed Commit Types:

- **feat** → নতুন ফিচার যোগ করা হলে
- **fix** → বাগ ফিক্স করা হলে
- **docs** → ডকুমেন্টেশন আপডেট করা হলে
- **style** → শুধুমাত্র কোড ফরম্যাটিং (কোনো লজিক পরিবর্তন নয়)
- **refactor** → কোড পুনর্গঠন (ফাংশনালিটি পরিবর্তন ছাড়া)
- **test** → টেস্ট যোগ করা বা আপডেট করা হলে
- **chore** → বিল্ড প্রসেস বা টুলিং সংক্রান্ত পরিবর্তন
- **schema** → Prisma Schema আপডেট
- **api** → API এন্ডপয়েন্ট বাস্তবায়ন
- **db** → ডাটাবেস সংক্রান্ত পরিবর্তন

---

## ⚖️ Contribution Steps

### ✅ Pull the latest changes
```sh
git checkout develop
git pull origin develop
```

### ✅ Create a new branch
```sh
git checkout -b feature/user-authentication
```

### ✅ Make changes and test locally
```sh
npm run dev
npm test  # Run tests if available
```

### ✅ Add and commit your changes
```sh
git add .
git commit -m "feat(auth): add JWT authentication system"
```

### ✅ Push your changes
```sh
git push origin feature/user-authentication
```

### ✅ Create a Pull Request (PR)
1. GitHub এ যান
2. `Pull Requests` ট্যাবে ক্লিক করুন
3. `New Pull Request` ক্লিক করুন
4. `develop` ব্রাঞ্চে merge করার জন্য আপনার ব্রাঞ্চ নির্বাচন করুন
5. বিস্তারিত বর্ণনা লিখুন
6. `Reviewers` যুক্ত করুন (এখানে Syfuddin ভাইকে অ্যাড করুন)
7. `Create Pull Request` ক্লিক করুন

### ✅ PR Review Process
- PR তৈরি করার পর একজন মেইনটেইনার রিভিউ করবে
- অন্তত ১ জনের অ্যাপ্রুভাল প্রয়োজন
- প্রয়োজন হলে ফিডব্যাক অনুযায়ী কোড আপডেট করুন
- সব কিছু ঠিক থাকলে PR merge করা হবে

---

## 📊 Database Management

### Prisma Schema Updates

1. `schema.prisma` ফাইলে আপনার পরিবর্তন করুন
2. Prisma client রিজেনারেট করুন:
   ```sh
   npx prisma generate
   ```
3. ডাটাবেস আপডেট করুন (ডেভেলপমেন্ট এনভায়রনমেন্টে):
   ```sh
   npx prisma db push
   ```

### Seed Data

টেস্টিং এর জন্য ডাটাবেস সীড করার প্রসেস:
```sh
npx prisma db seed
```

---

---

## ❗ Important Rules

✅ **সবসময় ক্লিন এবং মডুলার কোড লিখুন।**
✅ **অর্থপূর্ণ ভেরিয়েবল নেম ব্যবহার করুন।**
✅ **কখনও সরাসরি `main` বা `develop` ব্রাঞ্চে পুশ করবেন না।**
✅ **মার্জ করার আগে অবশ্যই কোড রিভিউ করান।**
✅ **সেনসিটিভ তথ্যের জন্য এনভায়রনমেন্ট ভেরিয়েবল ব্যবহার করুন।**
✅ **প্রতিটি ফিচারের জন্য সঠিক ডকুমেন্টেশন লিখুন।**
✅ **Prisma স্কিমা পরিবর্তন করার আগে টিম মেম্বারদের সাথে আলোচনা করুন।**
✅ **API এন্ডপয়েন্ট ডকুমেন্টেশন আপডেট করতে ভুলবেন না।**

---

## 📚 API Documentation

আমরা Postman ব্যবহার করি API ডকুমেন্টেশনের জন্য। ডেভেলপমেন্ট সার্ভার চালু থাকলে API ডকুমেন্টেশন দেখতে নিচের লিঙ্কে যান:

```
http://localhost:3000/docs
```

---

### 🔗 Contact & Support

যদি কোনো সমস্যা হয়, তাহলে `Syfuddhin` এবং `Talha` এর সাথে যোগাযোগ করুন।

---

সবার প্রোগ্রামিং যাত্রা শুভ হোক। 🚀🎉
