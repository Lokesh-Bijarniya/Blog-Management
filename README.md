# Blog Management Backend

## Overview
The **Blog Management Backend** is a RESTful API that provides functionality for managing authors and blogs. It allows users to create, read, update, and delete blog posts while ensuring secure authentication and validation.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Create, Read, Update, and Delete (CRUD) for authors and blog posts.
- **Authorization**: Protect routes with middleware to ensure only authorized users can modify content.
- **Validation**: Input validation for handling structured data.
- **Cross-Origin Resource Sharing (CORS)**: Enabled to allow frontend integration.

## Technologies Used
- **Node.js** (Backend runtime)
- **Express.js** (Framework for handling routes and middleware)
- **MongoDB & Mongoose** (Database and ODM for schema modeling)
- **JWT (jsonwebtoken)** (Authentication & Authorization)
- **Bcrypt** (Password hashing for security)
- **Dotenv** (Environment variable management)
- **CORS** (Handling cross-origin requests)

## Project Structure
```
server/
  ├── src/
  │   ├── controllers/
  │   │   ├── authorController.js
  │   │   ├── blogController.js
  │   ├── middleware/
  │   │   ├── middleware.js
  │   ├── models/
  │   │   ├── authorModel.js
  │   │   ├── blogModel.js
  │   ├── routers/
  │   │   ├── authorRouter.js
  │   │   ├── blogRouter.js
  │   ├── validator/
  │   │   ├── validation.js
  │   ├── index.js
  ├── .gitignore
  ├── package.json
  ├── README.md
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Lokesh-Bijarniya/Blog-Management
   ```
2. Navigate to the project directory:
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### **Author Routes** (`/api/authors`)
| Method | Endpoint         | Description             |
|--------|----------------|-------------------------|
| POST   | `/register`    | Register a new author  |
| POST   | `/login`       | Login author and get JWT |

### **Blog Routes** (`/api/blogs`)
| Method | Endpoint     | Description              |
|--------|-------------|--------------------------|
| POST   | `/create`   | Create a new blog post  |
| GET    | `/`         | Get all blog posts      |
| GET    | `/:id`      | Get a single blog post  |
| PUT    | `/:id`      | Update a blog post      |
| DELETE | `/:id`      | Delete a blog post      |

## License
This project is licensed under the **ISC License**.

## Contact
For any inquiries, feel free to reach out:
- **Author**: Lokesh Bijarniya
- **Email**: Lkbijarniya2@gmail.com


