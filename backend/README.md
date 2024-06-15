# Jewelry Store (Backend )

This project implements a Jewelry Store Management System backend using Node.js, Express, MongoDB, and other libraries.

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory:
3. Install the necessary dependencies:

```
npm install
```

4. Set up environment variables:

```
DB_URL=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
EMAIL_USERNAME=your-email-username
EMAIL_PASSWORD=your-email-password

```

5. Run the project.

```
node index.js
```

6. This will start the server at http://localhost:3001.

## Routes

### Authentication Routes

**POST /api/auth/signup**

Registers a new user.

- **Required Body Parameters:** `username`, `email`, `password`.

**POST /api/auth/signin**

Authenticates a user and returns a JWT token.

- **Required Body Parameters:** `email`, `password`.

**POST /api/auth/logout**

Logs out the user by clearing the access token cookie.

### Company Routes

**POST /api/companies/**

Creates a new company.

- **Required Body Parameters:** `name`, `description`, `addressLine1`, `contact`, `location`, `establishedDate`, `totalProducts`, `ownerName`, `ownerEmail`.

**GET /api/companies/**

Retrieves all companies.

**GET /api/companies/:id**

Retrieves a company by its ID.

- **Path Parameter:** `id` (Company ID).

**PUT /api/companies/:id**

Updates a company by its ID.

- **Path Parameter:** `id` (Company ID).
- **Required Body Parameters:** Any fields to be updated.

**DELETE /api/companies/:id**

Deletes a company by its ID.

- **Path Parameter:** `id` (Company ID).

**GET /api/companies/search?query=keyword**

Searches for companies based on a keyword query.

- **Query Parameter:** `query` (Keyword to search for in company fields).

### Contact Routes

**POST /api/contact/**

Sends a query email to a company owner.

- **Required Body Parameters:** `companyId`, `userName`, `userEmail`, `userQuery`.

### Upload Routes

**POST /api/upload/upload**

Uploads an Excel file containing company data.

- **File Parameter:** `file` (Excel file to upload).

## Error Handling

Global error handling middleware is set up to catch and format errors uniformly across routes.
Errors include status codes and descriptive error messages.

## Technologies Used

- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **JWT (JSON Web Token)**: Token-based authentication mechanism.
- **Bcryptjs**: Library for hashing passwords.
- **Nodemailer**: Module for sending emails from Node.js applications.
- **Multer**: Middleware for handling multipart/form-data, used for file uploads.
- **Xlsx**: Library for reading and writing Excel files.

## Authors

- [@Snehal](https://github.com/Snehal-Salvi)
