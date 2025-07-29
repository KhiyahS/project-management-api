# Project Management API

## Project Purpose
This API allows users to manage their projects and tasks. It supports full CRUD operations for projects and tasks, with secure authentication and authorization using JSON Web Tokens (JWT).

## Endpoints

### **User Routes**

- **POST** `/api/users/register`  
  Registers a new user. Requires `username`, `email`, and `password`.

- **POST** `/api/users/login`  
  Logs in a user and returns a JWT token. Requires `email` and `password`.

### **Project Routes**

- **POST** `/api/projects`  
  Creates a new project. Requires `name` and `description`. Requires authentication.

- **GET** `/api/projects`  
  Gets all projects owned by the logged-in user. Requires authentication.

- **GET** `/api/projects/:id`  
  Gets a single project by ID. Requires ownership check.

- **PUT** `/api/projects/:id`  
  Updates a project. Requires ownership check.

- **DELETE** `/api/projects/:id`  
  Deletes a project. Requires ownership check.

### **Task Routes**

- **POST** `/api/projects/:projectId/tasks`  
  Creates a task for a specific project. Requires `title`, `description`, and `status`. Requires project ownership.

- **GET** `/api/projects/:projectId/tasks`  
  Gets all tasks for a specific project. Requires project ownership.

- **PUT** `/api/tasks/:taskId`  
  Updates a task. Requires project ownership check.

- **DELETE** `/api/tasks/:taskId`  
  Deletes a task. Requires project ownership check.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following:
   - `MONGO_URI` for your MongoDB connection.
   - `PORT` for the server (default is 5000).
   - `JWT_SECRET` for signing JWT tokens.

4. Run `node server.js` to start the server.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
