# WSD_Individual_Assignment_Backend

## Project Description

This repository contains the backend implementation for the individual project of the WSK-Web-Dev course. It provides the necessary APIs and server-side logic to support the application's functionality.

Server is accessible at [https://10.120.32.74/web-page/](https://10.120.32.74/web-page/)

More information about the project in the [frontend repository](https://github.com/TonyKarlin/WSD_Individual_Assignment)

### Feature

- RESTful API endpoints for data management.
- Authentication and authorization mechanisms.
- Database integration for persistent storage.
- Error handling and logging.

### API Endpoints

#### Users

- `GET /api/v1/users/`: Retrieve all users.
- `GET /api/v1/users/:id`: Retrieve details of a specific user by ID.
- `POST /api/v1/users/`: Create a new user.
- `PUT /api/v1/users/:id`: Update an existing user's details by ID.
- `DELETE /api/v1/users/:id`: Delete a user by ID.

#### Authentication

- `POST /api/v1/auth/login`: Authenticate user and retrieve a token.
- `GET /api/v1/auth/me`: Retrieve details of the authenticated user.

### Technologies Used

- Node.js
- Express.js
- JWT for authentication

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/WSD_Individual_Assignment_Backend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in a `.env` file.
4. Start the development server:
   ```bash
   npm start
   ```
