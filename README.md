# Personal-Task-Manager

 **A modern, responsive Task Manager built with Spring Boot backend and React frontend with Tailwind CSS. Stay organized and manage your tasks efficiently with this beautiful full-stack application.**

# ✨ Features

## Backend (Spring Boot) ##
1. RESTful API with HTTP status codes
2. DTO Pattern for clean separation of concerns
3. JPA/Hibernate for database operations
4. PostgreSQL Database for easy development and testing
5. CORS Configuration for frontend communication
6. Input Validation with proper error handling

## Frontend (React + Tailwind CSS) ##
1. Modern UI with animations
2. Responsive Design that works on all devices
3. Real-time Updates with instant state management
4. Task, Task Filtering by status (All, Pending, In Progress, Completed)
5. Task Sorting by date, title, or status
6. Statistics Dashboard with progress tracking
7. Interactive Status Updates with dropdowns
8. Error Handling with user-friendly messages
9. Loading States for better user experience

# 🏗️ Project Structure

task-manager/
├── backend/                 # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/taskmanager/
│   │       ├── controller/  # REST Controllers
│   │       ├── service/     # Business Logic
│   │       ├── repository/  # Data Access Layer
│   │       ├── entity/      # JPA Entities
│   │       └── dto/         # Data Transfer Objects
│   └── src/main/resources/
│       └── application.properties
│
└── frontend/                # React Application
    ├── src/
    │   ├── components/      # React Components
    │   ├── services/        # API Services
    │   └── App.js           # Main Application
    ├── public/
    └── package.json


    
