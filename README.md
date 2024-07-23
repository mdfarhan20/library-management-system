# Library Management System

This is a simple library management system API built with Node.js, Express, and MongoDB. It allows you to manage books, authors, users, and borrowing records.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=[YOUR PORT] // eg. 3000
DATABASE_URL=mongodb://localhost:27017/[Your Database Name]
REDIS_PORT=[REDIS SERVER PORT] eg. 6379
HOST_URL=[HOST_URL] // eg. http://localhost:3000
```

## Install dependencies:

```bash
npm install
```

## Start the server

```bash
npm start
```