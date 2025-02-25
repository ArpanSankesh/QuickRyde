# QuickRyde 🚖  

QuickRyde is a modern ride-hailing web application built with the MERN stack. It provides a seamless experience for users to book rides, track drivers in real time, and manage trips efficiently.  

## 🚀 Features  
- 🔹 User authentication (Rider & Driver)  
- 🔹 Real-time ride tracking  
- 🔹 Dynamic fare calculation  
- 🔹 Ride history & trip management  
- 🔹 Secure payment integration  
- 🔹 Admin dashboard for fleet management  

## 🛠️ Tech Stack  
- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Real-time:** Socket.io  
- **Authentication:** JWT  

## 📌 Getting Started  
Clone the repository and follow the setup instructions to run QuickRyde locally.

## 📚 API Documentation

### User Endpoints

#### POST /user/register
Registers a new user.

**Request Body:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### POST /user/login
Logs in an existing user.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors.
- `401 Unauthorized`: Invalid email or password.
- `500 Internal Server Error`: Server error.

