# Team Task Manager

A full-stack MERN application for managing team projects, tasks, and user roles with secure authentication and role-based access control.

## Features

### Authentication

* User Signup & Login
* JWT-based authentication using cookies
* Secure logout functionality
* Protected routes

### Role-Based Access

* **Admin**

  * Dashboard overview
  * Manage Projects
  * Manage Tasks
  * View team performance

* **Member**

  * Personal dashboard
  * View assigned tasks
  * View assigned projects

### Project Management

* Create projects
* Assign members to projects
* Track project details

### Task Management

* Create tasks
* Assign tasks to members
* Update task status
* Track pending, completed, and overdue tasks

### Dashboard Analytics

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Cookie Parser
* CORS
* bcryptjs

### Deployment

* Railway
* MongoDB Atlas
* GitHub

---

## Folder Structure

```bash
Team-Task-Manager/
│
├── frontend/
│   ├── client/
│   │   ├── src/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── assets/
│   │   │   └── main.jsx
│   │   └── .env
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## Environment Variables

### Backend `.env`

```env
MONGO_URI=mongodb+srv://aman4578kumar_db_user:bQ8cWGC0KW3pYm3x@cluster0.gdcxpkc.mongodb.net/?appName=Cluster0
JWT_SECRET=fvneveiefvefnv94ru34iofr
PORT=5000
```

### Frontend `.env`

```env
VITE_API_URL=https://team-task-manager-production-0764.up.railway.app/api
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/1amankumar/team-task-manager.git
cd team-task-manager
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend/client
npm install
npm run dev
```

---

## Deployment Steps

### Backend Deployment (Railway)

1. Push backend code to GitHub
2. Create a new Railway project
3. Connect GitHub repository
4. Add environment variables
5. Deploy backend

### Frontend Deployment (Railway)

1. Push frontend code to GitHub
2. Create frontend Railway service
3. Set `VITE_API_URL`
4. Deploy frontend

---

## API Routes

### Auth Routes

* `POST /api/auth/signup`
* `POST /api/auth/login`
* `GET /api/auth/logout`

### Project Routes

* `POST /api/projects`
* `GET /api/projects`

### Task Routes

* `POST /api/tasks`
* `GET /api/tasks`
* `GET /api/tasks/dashboard`

---

## Future Improvements

* Email notifications
* File upload support
* Team chat system
* Calendar integration
* Task priority system
* Admin reports export

---

## Author

**Aman Kumar**

MERN Stack Developer

---

## License

This project is for learning and portfolio purposes.
