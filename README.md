
# User Authentication API

This is a simple User Authentication API built with Express.js and MongoDB. It uses bcrypt for password hashing.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MongoDB

### Installing

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the server with `npm start`

## API Endpoints

### POST /register

Registers a new user.

#### Request

```json
{
    "name": "John",
    "surname": "Doe",
    "emailAddress": "john.doe@example.com",
    "username": "johndoe123",
    "password": "password123"
}
```
#### Response
```
{
    "message": "User saved successfully"
}
```

#### POST /login
Authenticates a user.
```
Request
{
    "username": "johndoe123",
    "password": "password123"
}
```
#### Response
```
{
    "message": "Hello John Doe, Authenticated successfully"
}
```
#### Built With
Express.js - The web framework used    
MongoDB - The database used    
Mongoose - MongoDB object modeling tool    
bcrypt - Password hashing function    
