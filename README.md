# MentaEase API Documentation

This documentation provides a detailed guide to use the MentaEase API. The API consists of three main sections: **GroqAPI**, **User Registration**, and **Login**. This guide explains how to test the endpoints using **Postman** and integrate them into your applications.

## Base URL

The base URL for the API is:

```
https://mentaease-api.vercel.app
```

## Contents

1. [GroqAPI](?tab=readme-ov-file#1-groqapi)
2. [User Registration](?tab=readme-ov-file#2-user-registration-api)
3. [Login](?tab=readme-ov-file#3-user-login-api)
4. [Update](?tab=readme-ov-file#4-update-profile-api)
5. [Delete](?tab=readme-ov-file#5-delete-account-api)

## 1. GroqAPI

**Endpoint:** `/groq`

### Description

GroqAPI is an endpoint that enables an AI chatbot that acts as a psychologist, providing advice on psychological matters in either Indonesian or English. The AI's personality is friendly, professional, and engaging.

### Endpoint Details

- **URL**: `/groq`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `prompt` (string): The prompt or question for the AI to respond to.
  - `sessionId` (string): Unique identifier for the session to maintain conversation context.
  - `language` (string): Either `id` (Indonesian) or `en` (English).

### Example Request

```json
POST /groq
{
  "prompt": "Apa itu kecemasan berlebih?",
  "sessionId": "123e4567-e89b-12d3-a456-426614174000",
  "language": "id"
}
```

### Example Response

```
"Kecemasan berlebih adalah kondisi di mana seseorang merasa khawatir atau takut secara berlebihan terhadap situasi tertentu, meskipun tidak ada ancaman nyata."
```

### Error Responses

- `400 Bad Request`: Prompt, sessionId, and language are required.
- `500 Internal Server Error`: Error connecting to Groq API.

## 2. User Registration API

**Endpoint:** `/api/register`

### Description

This endpoint allows users to register by providing an email, phone number, and password. The system ensures that the email and phone number are unique.

### Endpoint Details

- **URL**: `/api/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `email` (string): The user's email address.
  - `phone_number` (string): The user's phone number.
  - `password` (string): The user's password.

### Example Request

```json
POST /api/register
{
  "email": "user@example.com",
  "phone_number": "08123456789",
  "password": "securepassword"
}
```

### Example Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "phone_number": "08123456789"
  }
}
```

### Error Responses

- `400 Bad Request`: Missing required fields (`email`, `phone_number`, or `password`).
  - Example:
    ```json
    {
      "message": "Email, phone number, and password are required"
    }
    ```
- `400 Bad Request`: Email or phone number is already registered.
  - Example:
    ```json
    {
      "message": "Email is already registered"
    }
    ```
    ```json
    {
      "message": "Phone number is already registered"
    }
    ```
- `500 Internal Server Error`: Error occurred during registration.
  - Example:
    ```json
    {
      "message": "Error registering user",
      "error": "Detailed error message here"
    }
    ```

## 3. User Login API

**Endpoint:** `/api/login`

### Description

This endpoint allows users to log in by providing their email and password. If the credentials are valid, a JSON Web Token (JWT) is generated for authentication.

### Endpoint Details

- **URL**: `/api/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `email` (string): The user's email address.
  - `password` (string): The user's password.

### Example Request

```json
POST /api/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Example Response

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY4MDAwMDAwMH0.Wk_v6WR6UPhZo5hxqWzKdrShImPXnQH7kj1-NkDbEQ4"
  }
}
```

### Error Responses

- `400 Bad Request`: Missing required fields (`email` or `password`).
  - Example:
    ```json
    {
      "message": "Email and password are required"
    }
    ```
- `400 Bad Request`: Invalid email or password.
  - Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```
- `500 Internal Server Error`: Error occurred during login.
  - Example:
    ```json
    {
      "message": "Error during login",
      "error": "Detailed error message here"
    }
    ```

## 4. Update Profile API

**Endpoint:** `/api/profile`

### Description

This endpoint allows users to update their profile information, such as email, phone number, or password. The user must provide a valid token for authentication.

### Endpoint Details

- **URL**: `/api/profile`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization`: `Bearer <token>`
- **Body** (JSON):
  - `email` (string, optional): The new email address.
  - `phone_number` (string, optional): The new phone number.
  - `password` (string, optional): The new password.

### Example Request

```json
PUT /api/profile
{
  "email": "newuser@example.com",
  "phone_number": "08129876543",
  "password": "newsecurepassword"
}
```

### Example Response

```json
{
  "message": "Profile updated successfully"
}
```

### Error Responses

- `400 Bad Request`: No fields provided for update.
  - Example:
    ```json
    {
      "message": "At least one field is required to update"
    }
    ```
- `401 Unauthorized`: Invalid or missing token.
  - Example:
    ```json
    {
      "message": "Access denied, no token provided"
    }
    ```
    ```json
    {
      "message": "Invalid token"
    }
    ```
- `404 Not Found`: User not found.
  - Example:
    ```json
    {
      "message": "User not found"
    }
    ```
- `400 Bad Request`: Email is already taken.
  - Example:
    ```json
    {
      "message": "Email is already taken"
    }
    ```
- `500 Internal Server Error`: Error occurred during profile update.
  - Example:
    ```json
    {
      "message": "Error updating profile",
      "error": "Detailed error message here"
    }
    ```

## 5. Delete Account API

**Endpoint:** `/api/delete-account`

### Description

This endpoint allows users to delete their account permanently. The user must provide a valid token for authentication.

### Endpoint Details

- **URL**: `/api/delete-account`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <token>`

### Example Request

```json
DELETE /api/delete-account
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTY4MDAwMDAwMH0.Wk_v6WR6UPhZo5hxqWzKdrShImPXnQH7kj1-NkDbEQ4"
}
```

### Example Response

```json
{
  "message": "Account deleted successfully"
}
```

### Error Responses

- `403 Forbidden`: Token is missing.
  - Example:
    ```json
    {
      "message": "Token is required"
    }
    ```
- `401 Unauthorized`: Invalid or expired token.
  - Example:
    ```json
    {
      "message": "Invalid or expired token"
    }
    ```
- `404 Not Found`: User not found.
  - Example:
    ```json
    {
      "message": "User not found"
    }
    ```
- `500 Internal Server Error`: Error occurred during account deletion.
  - Example:
    ```json
    {
      "message": "Error deleting account",
      "error": "Detailed error message here"
    }
    ```

# Example Code for Interacting with All API Endpoints

## 1. GroqAPI

```javascript
async function fetchGroqAPI() {
  const response = await fetch('/groq', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: 'Apa itu kecemasan berlebih?',
      sessionId: '123e4567-e89b-12d3-a456-426614174000',
      language: 'id',
    }),
  });

  const data = await response.json();
  console.log(data);
}

fetchGroqAPI();
```

## 2. User Registration API

```javascript
async function registerUser() {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'user@example.com',
      phone_number: '08123456789',
      password: 'securepassword',
    }),
  });

  const data = await response.json();
  console.log(data);
}

registerUser();
```

## 3. User Login API

```javascript
async function loginUser() {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'securepassword',
    }),
  });

  const data = await response.json();
  console.log(data);
}

loginUser();
```

## 4. Update Profile API

```javascript
async function updateProfile(token) {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: 'newuser@example.com',
      phone_number: '08129876543',
      password: 'newsecurepassword',
    }),
  });

  const data = await response.json();
  console.log(data);
}

const token = 'your-jwt-token-here';
updateProfile(token);
```

## 5. Delete Account API

```javascript
async function deleteAccount(token) {
  const response = await fetch('/api/delete-account', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}

deleteAccount(token);
```
