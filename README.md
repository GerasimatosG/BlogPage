# Simple BlogPage

Simple BlogPage is a Node.js web application built using Express, EJS, and MongoDB. It provides a platform for users to view, search, and paginate through blog posts. Additionally, it includes an admin panel for managing blog posts securely with encrypted login using bcrypt.

## Features

- **Pagination:** Browse through multiple blog posts conveniently with pagination.
- **Search:** Search for specific blog posts based on keywords.
- **MongoDB Integration:** Data is stored and retrieved using MongoDB, a popular NoSQL database.
- **Admin Panel:** Admins can securely log in to an admin panel to perform CRUD operations on blog posts.
- **Encryption:** Admin login credentials are encrypted using bcrypt for enhanced security.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-blogpage.git
   ```

2. Navigate to the project directory:
   ```bash
   cd simple-blogpage
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure MongoDB:
   - Ensure MongoDB is installed and running on your system.
   - Update the MongoDB connection string in `config/db.js` if necessary.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Open a web browser and navigate to `http://localhost:3000` to view the blog page.
3. To access the admin panel, go to `http://localhost:3000/admin`.
   - Default admin credentials:
     - Username: admin
     - Password: adminpassword

## Admin Panel

The admin panel allows authenticated users to perform the following operations:

- **Create:** Add new blog posts.
- **Update:** Modify existing blog posts.
- **Delete:** Remove blog posts from the database.

To log in as an admin, use the provided credentials or create a new admin account if necessary.

## Security

- Admin login credentials are securely encrypted using bcrypt.
- Ensure that strong passwords are used to further enhance security.
```
