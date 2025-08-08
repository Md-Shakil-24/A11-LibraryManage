# 📚 Library Management System

**Library Management System** is a full-stack web application where users can browse, borrow, and manage books efficiently. here's can add, update functionality and users can borrow available books with one click.

The system supports Firebase Authentication and JWT protection to ensure secure access to user-specific data and actions.

---

## 🌐 Live Site

🔗 [Click here to view the live project](https://library-manage-b11-a11.netlify.app/)

---

## 🚀 Backend Features (Express + MongoDB)

- 📦 Add / Get / Update
- 🔒 Secure API with Firebase JWT
- 📚 Borrow & Return Book System
- 📅 Borrow Date Tracking
- 📥 User-specific borrowed list (sorted newest first)
- 📉 Auto-decrease quantity on borrow
- 📈 Auto-increase quantity on return
- ⚙️ MongoDB Atlas Integration

---

## 🧩 Frontend Features (React.js)

- 🔐 Firebase Authentication (Email/Password)
- ✅ Protected Routes (Only logged-in users can access borrow/edit routes)
- 📘 Browse All Books (Card & Table View)
- 📂 Filter by Category
- ✏️ Add / Edit
- 📥 Borrow Book with Return Date Modal
- 📄 My Borrowed Books Page
- 🌙 Dark/Light Theme Toggle
- 📱 Fully Responsive (Mobile, Tablet, Desktop)
- 💫 Smooth UI with Framer Motion & AOS
- 🔍 Typewriter Search Animation
- 📩 Newsletter Subscription (Footer)

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 🌐 React Router DOM
- 🔐 Firebase (Auth & Hosting)
- 🎨 Tailwind CSS + Daisy UI
- ✨ Framer Motion / AOS / Lottie React
- 🖼️ React Icons
- 🛎️ React Toastify
- 🎯 React Helmet

### Backend
- 🧰 Node.js
- 🧬 Express.js
- 🌍 MongoDB Atlas
- 🔑 Firebase Admin SDK (JWT Verification)
- 🛡️ Middleware for Token Verification

---

## 🧪 NPM Packages Used

```bash
# React Frontend
npm install react-router-dom
npm install firebase
npm install react-icons
npm install react-helmet
npm install framer-motion
npm install swiper
npm install aos
npm install react-toastify
npm install daisyui
npm install tailwindcss
npm install react-awesome-reveal
npm install react-simple-typewriter
npm install lottie-react

# Express Backend
npm install express cors dotenv mongodb
npm install firebase-admin
