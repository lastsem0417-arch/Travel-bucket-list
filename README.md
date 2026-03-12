# 🌍 Travel Bucket List Platform

A **Full Stack MERN Travel Bucket List Application** that allows users to plan, track, and manage the places they want to visit around the world.

Users can create their personal travel bucket list, view statistics about their travel plans, explore destinations on a map, and manage their trips efficiently.
An **Admin Dashboard** is also included to manage users and destinations.

---

# 🚀 Live Demo

Frontend: https://your-netlify-link.netlify.app
Backend API: https://your-render-link.onrender.com

---

# 📌 Features

### 👤 User Features

* User Registration & Login
* JWT Authentication
* Personal Travel Bucket List
* Add / Delete Travel Destinations
* Mark Destinations as Visited
* View Travel Statistics
* Filter & Search Destinations
* Map View of Destinations
* Image Preview for Places

### 📊 Statistics Dashboard

* Total Places
* Visited vs To Visit
* Priority Level Chart
* Trip Type Analytics

### 🗺 Map Integration

* Interactive Map using Leaflet
* Displays locations of added places
* Popup with place information

### 👑 Admin Panel

Admin users can:

* View all users
* View all places
* See which user added which place
* Delete any place
* Monitor overall platform activity

---

# 🧠 Tech Stack

### Frontend

* React.js
* React Router
* Context API (State Management)
* Framer Motion (Animations)
* React Leaflet (Map)
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST API

### Database

* MongoDB Atlas

### Deployment

* Netlify (Frontend)
* Render (Backend)

---

# 📂 Project Structure

```
travel-bucket-list
│
├── client
│   ├── components
│   ├── context
│   ├── pages
│   │   ├── Home
│   │   ├── Places
│   │   ├── AddPlace
│   │   ├── Statistics
│   │   ├── MapPage
│   │   ├── AdminDashboard
│   │
│   ├── services
│   └── App.jsx
│
├── server
│   ├── controllers
│   │   ├── authController.js
│   │   ├── destinationController.js
│   │   └── adminController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Destination.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── destinationRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware
│   │   └── authmiddleware.js
│   │
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/travel-bucket-list.git
```

```
cd travel-bucket-list
```

---

## 2️⃣ Install Backend Dependencies

```
cd server
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```
cd ../client
npm install
```

---

# 🔐 Environment Variables

Create `.env` file inside **server folder**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# ▶️ Run Project Locally

Start backend:

```
cd server
node server.js
```

Start frontend:

```
cd client
npm start
```

Application will run at:

```
http://localhost:3000
```

---

# 📡 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Destinations

```
GET /api/destinations
POST /api/destinations/add
DELETE /api/destinations/:id
PUT /api/destinations/visit/:id
```

### Admin

```
GET /api/admin/users
GET /api/admin/places
DELETE /api/admin/place/:id
```

---

# 📊 Screenshots

### Dashboard

Displays travel overview and quick stats.

### Places Page

Shows all added travel destinations with filters.

### Statistics

Charts and analytics about travel plans.

### Map

Interactive map displaying travel locations.

### Admin Dashboard

Admin can manage users and destinations.

---

# 🔒 Authentication Flow

1. User logs in
2. Server generates JWT Token
3. Token stored in localStorage
4. Protected routes verify JWT
5. User can access personal travel data

---

# 📈 Future Improvements

* Google Maps Integration
* Image Upload via Cloudinary
* Travel Recommendations using AI
* Social sharing of travel lists
* User profile page
* Dark mode

---

# 👨‍💻 Author

Aryan Singh
BCA Student
Full Stack MERN Developer

---

# ⭐ Support

If you like this project please consider giving it a ⭐ on GitHub!

---

# 📜 License

This project is licensed under the MIT License.
