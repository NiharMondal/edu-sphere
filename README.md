# Minimal LMS System

## Overview

The **Minimal LMS System** is a Learning Management System designed for course management and user learning progress tracking. It features two primary panels:

-   **Admin Dashboard**: For course content management.
-   **User Panel**: For course consumption and progress tracking.

The project follows the **MODULE architecture** and ensures a **responsive UI** using modern design principles.

## Tech Stack

-   **Frontend**: Next.js (TypeScript), Tailwind CSS
-   **Backend**: Express.js (MVC architecture)
-   **Database**: MongoDB (Mongoose ODM)

---

### Credentials for Admin

-   **Email:** nihar@gmail.com
-   **Password:** 123456

## Features

### **Admin Dashboard (Authentication Required)**

#### **1. Course Management**

-   **Course Upload**:
    -   Fields: Thumbnail (image), Title, Price, Description
    -   Courses are displayed in a grid with thumbnails, titles, prices, and descriptions.
-   **Course CRUD Operations**:
    -   Edit/Delete existing courses.
    -   Dynamic routing: Clicking on a course navigates to its **Module & Lecture Management** page.

#### **2. Module & Lecture Management**

-   **Module Creation**:
    -   Add modules with a **Title** and **Module Number** (auto-incremented).
-   **Lecture Creation**:
    -   Add lectures under modules with:
        -   Title
        -   Video Upload/URL (Embedded YouTube links for simplicity)
        -   Multiple PDF notes (Upload)
    -   CRUD operations: Edit/Delete modules and lectures.
-   **Lecture List View**:
    -   Display all lectures in a table.
    -   Filter lectures by **Course** and **Module**.

---

### **User Panel**

#### **1. Course Details Page**

-   **Dynamic Content**:
    -   Displays course details uploaded by the admin (Thumbnail, Title, Price, Description).
    -   Uses static data for additional sections (Reviews, Instructor Info).

#### **2. Lecture Page**

-   **Structure**:
    -   Numbered modules with expandable lecture lists.
    -   Search bar for filtering lessons by title.
-   **Content Delivery**:
    -   **Locked Lectures**: Users unlock lectures sequentially (Next button unlocks subsequent lectures).
    -   **Video Player**: Streams uploaded videos (Embedded YouTube links for simplicity).
    -   **PDF Notes**: Download/view multiple PDFs per lecture.
-   **Progress Tracking**:
    -   Visual indicators (progress bar/checkmarks) for completed lectures.

---

## Installation & Setup

### **1. Clone the Repository**

```bash
    git clone https://github.com/NiharMondal/lms-client
    cd lms-client
```

### **2. Install Dependencies**

```bash
    npm install

```

### **3. Configure Environement Variables**

Create a _.env.local_ file in the root directory and add the required environment variables

```
    NEXT_PUBLIC_SERVER_URL = "http://localhost:5000/api/v1"
    # NEXT_PUBLIC_SERVER_URL = "your developed backend link"
    NODE_ENV = developemnt

```

### **4. Run the application**

```
    npm run dev
```

Visit http://localhost:3000 in your browser.
