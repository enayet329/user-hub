
# CleanAuth Frontend

## Description

CleanAuth is a web application that implements registration and authentication features following Clean Architecture principles. The frontend of CleanAuth is built with Angular and provides a user interface for authentication and user management functionalities and i also use jwt decode functionality to get user claims.

Key features include:
- User registration and authentication
- User management table with details such as id, name, email, last login time, registration time, and status
- Admin panel for managing users (restricted to authenticated users)
- Multiple user selection with checkboxes
- User actions: Block, Unblock, and Delete
- Jwt Decodding

## Technologies Used

- TypeScript
- Angular
- Bootstrap (CSS framework)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest LTS version)
- npm (comes with Node.js)
- Angular CLI

## Installation

1. Clone the repository:
   ```
   git clone [repository URL]
   ```

2. Navigate to the frontend directory:
   ```
   cd cleanauth/frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server:

```
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Features

1. **Authentication:**
   - User registration
   - User login
   - JWT-based authentication

2. **User Management:**
   - Table view of users with details (id, name, email, last login, registration time, status)
   - Multiple user selection
   - User actions: Block, Unblock, Delete

3. **Admin Panel:**
   - Restricted access to authenticated users
   - Comprehensive user management capabilities

## Project Structure

The project follows Angular's standard directory structure:

```
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   ├── guards/
│   └── ...
├── assets/
└── environments/
```

## Backend Integration

This frontend is designed to work with a .NET backend. Ensure the backend API is running and properly configured for full functionality [Back-end GitHub](https://github.com/enayet329/UserHub.git).

## Authors

- **Md Enayet Hossain**
  - Email: md.enayet.hossain329@gmail.com

## Contact

For inquiries or support, visit [Md Enayet Hossain's Portfolio](https://portfolio-enayet-hossain.vercel.app/home).
