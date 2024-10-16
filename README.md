# Sports Complex Management System

A backend project for managing sports classes and related activities within a sports complex. This project is developed using NestJS and TypeScript with Express for building RESTful APIs. It includes functionalities for creating, editing, viewing, and managing sports classes and their schedules, along with role-based authorization and user registration.

## Features
```User registration and authentication.
Role-based authorization (admin, user).
CRUD operations for sports classes.
View and manage sports schedules.
Ability to track users who applied for sports classes.
Integration with MySQL for data persistence.
Swagger documentation for API endpoints.
```
## Technologies
```
NestJS: A framework for building efficient and scalable server-side applications.
TypeScript: For type safety and modern JavaScript features.
Express: A minimal web framework for handling HTTP requests.
TypeORM: An ORM for database interactions.
MySQL: The database used for storing application data.
Swagger: For generating API documentation.
Jest: For testing.
```
## Installation
Clone the repository:

```
git clone https://github.com/your-username/sports-complex-management.git
cd sports-complex-management
```
Install dependencies:
```
npm install
```

Set up environment variables:

Create a .env file in the root directory of your project with the following configuration:

### Database (example)
```
JWT_SECRET=jwt_secret
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=pass
DB_NAME=valere-margins-task
```

Ensure your database is running, then:
```
npm run migration:run
```
### Other configurations
```
PORT=3000
```
Start the development server:
```
npm run start:dev
```
Your server should be running on http://localhost:3000.
## Testing
To run tests:

Run unit and integration tests(only 1 test):
```
npm run test
```


## API Documentation
After starting the server, you can access the Swagger documentation at:
```
http://localhost:3000/api
```
This provides a visual interface for interacting with all available API endpoints.

## Folder Structure

```
src/
├── auth/               # Authentication module
├── classes/            # Classes module for managing sports classes
├── sports/             # Sports module for managing sports
├── users/              # User module for user management
└── main.ts             # Application entry point
```