# 📚 E-Learning Platform

A full-featured, role-based e-learning platform built with **React**, **Next.js**, **Node.js**, **MongoDB**, **Stripe** and **socket.io**. The platform enables students to purchase and learn from courses, instructors to manage course content, and admins to control the entire system.

---

## 🚀 Features

### 👤 Role-Based Access

-   **Admin**
    -   Create and manage courses, modules, and lectures.
    -   Assign instructors to courses.
    -   Create and manage categories.
-   **Instructor**
    -   Can only update existing courses assigned by admin.
    -   Create and manage modules and lectures under assigned courses.
-   **Student**
    -   Browse available courses.
    -   Purchase courses via Stripe.
    -   Access lectures in sequential order.
    -   Track learning progress.

### 💳 Payment Integration

-   Integrated **Stripe** for secure course purchases.
-   Webhooks handle payment confirmation and enrollment.

### 🔐 Authentication & Authorization

-   JWT-based authentication.
-   Refresh token and access token mechanism.
-   Role-based route protection (frontend and backend).

### 📡 Real-Time Features

-   **Live notifications** (new lecture uploads, announcements) using **Socket.IO**.

## 📈 Progress Tracking

-   Students’ progress is tracked at the **lecture level**.
-   Completion status saved per user per lecture.
-   Students can only access **unlocked** lectures based on prior completion.

### 📁 Course Structure

-   Each course consists of:
    -   One or more **Modules**
    -   Each module contains multiple **Lectures**
-   Lecture unlocking handled sequentially (can’t access next until previous completed).

### Live Link and Backend GitHub

-   **Live Link** [Edu Sphere](https://edu-sphere-five.vercel.app/)
-   **Backend GitHub Link:** [edu-sphere-backend](https://github.com/NiharMondal/edu-sphere-backend)

---

## 🧑‍💻 Tech Stack

### Frontend

-   **Next.js** (App Router)
-   **React**
-   **Tailwind CSS** for styling
-   **shadcn/ui** for UI components
-   **React Hook Form + Zod** for form validation
-   **Redux Toolkit** for state management
-   **RTK Query** for data fetching and caching
-   **Socket.IO Client** for live updates

### Backend

-   **Node.js**, **Express.js**
-   **MongoDB**, **Mongoose**
-   **JWT** for authentication
-   **Stripe API** for payments
-   **Socket.IO Server** for real-time notifications
-   **CORS**, **cookie-parser**, etc. for security & middleware

---

## ⚙️ Installation & Setup

### Run Locally

Clone the project

```bash
  git clone https://github.com/NiharMondal/edu-sphere
```

Go to the project directory

```bash
  cd edu-sphere
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_SERVER_URL` = http://localhost:5000/api/v1 // replace this url when in production  
`NEXT_PUBLIC_NODE_ENV` = development  
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`=[your cloudinary name]  
`NEXT_PUBLIC_UPLOAD_PRESET`=[your upload preset]  
`NEXT_PUBLIC_CLOUDINARY_API_KEY`=[your cloudinary api key]  
`NEXT_PUBLIC_CLOUDINARY_API_SECRET`=[your cloudinary api secret]

## 🔒 Security

-   All tokens are stored using HttpOnly cookies.
-   Implemented CSRF and CORS protections.
-   Role-based middleware for API route protection.
-   Environment variables used for sensitive configs.

## 📬 Contact

Built by [Nihar Mondal](https://nihar-mondal.vercel.app)  
Feel free to reach out for collaboration or feedback!
