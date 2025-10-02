# Frontend-Backend Task Manager App

## Description
A full-stack task management web application built with MERN stack featuring user authentication, profile display, and task CRUD operations including task completion toggling and filtering.

## Features
- User registration and login with JWT authentication.
- Protected dashboard route with user profile display.
- Task create, read, update, delete (CRUD).
- Search tasks by title.
- Filter tasks by completion status (completed, not completed).
- Toggle task completion directly in the UI.
- Responsive design using Tailwind CSS.
- Backend API built with Node.js and Express.
- MongoDB for data storage.

## Technologies Used
- Frontend: React.js, Tailwind CSS, react-icons
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT (JSON Web Tokens)
- Version Control: Git, GitHub

## Installation & Setup
1. Clone the repo:
git clone https://github.com/Aryanjearth/frontend-backend-task-app.git

2. Backend setup:
cd backend
npm install
npm run dev

3. Frontend setup:
cd ../frontend
npm install
npm start

4. Make sure MongoDB is running locally or use cloud MongoDB connection string in backend `.env`.

## Usage
- Register a new user or login with existing credentials.
- Access dashboard after login.
- Add tasks with title and optional description.
- Toggle task completion by clicking checkbox.
- Use filters to view all, completed, or incomplete tasks.
- Edit and delete tasks as needed.
- Logout with the button at the dashboard.

## API Endpoints
- `POST /api/auth/register` - User registration.
- `POST /api/auth/login` - User login.
- `GET /api/auth/profile` - Get logged-in user profile.
- `GET /api/tasks` - Get user tasks with optional filters.
- `POST /api/tasks` - Create a new task.
- `PUT /api/tasks/:id` - Update task details or completion.
- `DELETE /api/tasks/:id` - Delete a task.

## Postman Collection
A Postman collection with all API endpoints is included in the `postman/` directory. You can import it into Postman for easy testing.

## Deployment
The live app is deployed and accessible at:  
https://frontend-backend-task-app.vercel.app/
## Future Enhancements
- Add pagination for task list.
- Include task deadlines and reminders.
- Add user profile editing.
- Deploy the app online on platforms like Vercel/Render.

## Author
Aryan Jearth