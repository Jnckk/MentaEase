
# MentaEase API Documentation

This documentation provides a detailed guide to use the MentaEase API. This guide explains how to test the endpoints using **Postman** and integrate them into your applications, either web or mobile.
## Base URL

The base URL for the API is:

```
https://mentaease-api.vercel.app
```
## Contents

1. [GroqAPI](?tab=readme-ov-file#1-groqapi)
2. [User Registration](?tab=readme-ov-file#2-user-registration-api)
3. [Login](?tab=readme-ov-file#3-user-login-api)
4. [Profile](?tab=readme-ov-file#4-get-profile-data)
5. [Update](?tab=readme-ov-file#5-update-profile-api)
6. [Delete](?tab=readme-ov-file#6-delete-account-api)
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

**Endpoint:** `/api/registration`

### Description

This endpoint allows users to register by providing an email and password. The system ensures that the email is unique.

### Endpoint Details

- **URL**: `/api/registration`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `email` (string): The user's email address.
  - `password` (string): The user's password.

### Example Request

```json
POST /api/registration
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Example Response

```json
{
  "message": "Registrasi berhasil",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com"
  }
}
```

### Error Responses

- `400 Bad Request`: Missing required fields (`email` or `password`).
  - Example:
    ```json
    {
      "error": "Email dan password wajib diisi"
    }
    ```
- `400 Bad Request`: Email is already registered.
  - Example:
    ```json
    {
      "error": "Email already registered"
    }
    ```
- `500 Internal Server Error`: Error occurred during registration.
  - Example:
    ```json
    {
      "error": "Terjadi kesalahan server"
    }
    ```

## 3. User Login API

**Endpoint:** `/api/login`

### Description

This endpoint allows users to log in by providing an email and password. If the credentials are valid, the user is authenticated, and a profile along with an access token is returned.

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
  "message": "Login berhasil",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com"
  },
  "profile": {
    "email": "user@example.com",
    "display_name": "User Name",
    "phone": "08123456789"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE2ODAwMDAwMDB9.Wk_v6WR6UPhZo5hxqWzKdrShImPXnQH7kj1-NkDbEQ4"
}
```

### Error Responses

- `400 Bad Request`: Missing required fields (`email` or `password`).
  - Example:
    ```json
    {
      "error": "Email dan password wajib diisi"
    }
    ```
- `400 Bad Request`: Invalid credentials or profile retrieval error.
  - Example:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```
    ```json
    {
      "error": "Error fetching user profile"
    }
    ```
- `500 Internal Server Error`: Error occurred during login.
  - Example:
    ```json
    {
      "error": "Terjadi kesalahan server"
    }
    ```

## 4. Get Profile Data

**Endpoint:** `/api/profile`

### Description

This endpoint allows authenticated users to fetch their profile data, including their email, display name, and phone number, after providing a valid authentication token.

### Endpoint Details

- **URL**: `/api/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: Bearer token (JWT token for authentication)
- **Query Parameters**: None
- **Body**: None

### Example Request

```http
GET /api/profile
```

### Example Response

```json
{
  "message": "Data profil berhasil diambil",
  "profile": {
    "email": "user@example.com",
    "display_name": "User Name",
    "phone": "08123456789"
  }
}

```

### Error Responses

- `400 Bad Request`: Missing or invalid user ID.
  - Example:
    ```json
    {
    "error": "User ID tidak ditemukan"
    }
    ```
- `400 Bad Request`: Error fetching profile data from the database.
  - Example:
    ```json
    {
    "error": "Error message from Supabase"
    }
    ```
- `500 Internal Server Error`: An unexpected error occurred during the server operation.
    ```json
    {
    "error": "Terjadi kesalahan server"
    }
    ```

## 5. Update Profile API

**Endpoint:** `/api/Edit-Account`

### Description

This endpoint allows users to update their account information, such as email, password, phone, or display name. Changes must be performed one at a time.

### Endpoint Details

- **URL**: `/api/Edit-Account`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization`: `Bearer <token>`
- **Body** (JSON):
  - `email` (string, optional): The new email address (cannot be updated with password simultaneously).
  - `oldPassword` (string, optional): The current password (required when updating password).
  - `newPassword` (string, optional): The new password.
  - `phone` (string, optional): The new phone number.
  - `displayName` (string, optional): The new display name.

### Example Request

#### Update Email

```json
POST /api/Edit-Account
{
  "email": "newuser@example.com"
}
```

#### Update Password

```json
POST /api/Edit-Account
{
  "oldPassword": "currentpassword",
  "newPassword": "newsecurepassword"
}
```

#### Update Phone

```json
POST /api/Edit-Account
{
  "phone": "08129876543"
}
```

#### Update Display Name

```json
POST /api/Edit-Account
{
  "displayName": "New User Name"
}
```

### Example Responses

#### Success (200 OK)

- Email Update:
  ```json
  {
    "message": "Email berhasil diperbarui. Periksa email baru Anda untuk tautan konfirmasi."
  }
  ```
- Password Update:
  ```json
  {
    "message": "Password berhasil diperbarui."
  }
  ```
- Phone Update:
  ```json
  {
    "message": "Phone berhasil diperbarui di profil."
  }
  ```
- Display Name Update:
  ```json
  {
    "message": "Display name berhasil diperbarui di profil."
  }
  ```

### Error Responses

- `400 Bad Request`: No valid fields provided for update.
  - Example:
    ```json
    {
      "error": "Harus ada perubahan pada email, password, phone, atau display_name"
    }
    ```
- `400 Bad Request`: Email and password cannot be updated simultaneously.
  - Example:
    ```json
    {
      "error": "Email dan password tidak dapat diperbarui secara bersamaan. Harap lakukan satu per satu."
    }
    ```
- `400 Bad Request`: Incorrect old password.
  - Example:
    ```json
    {
      "error": "Password lama salah."
    }
    ```
- `400 Bad Request`: User profile not found.
  - Example:
    ```json
    {
      "error": "Profil pengguna tidak ditemukan."
    }
    ```
- `500 Internal Server Error`: Error occurred during account update.
  - Example:
    ```json
    {
      "error": "Terjadi kesalahan server"
    }
    ```

### Note
- Each change (email, password, phone, or display name) must be performed individually. Testing multiple changes simultaneously is not supported.

## 6. Delete Account API

**Endpoint:** `/api/delete-account`

### COMING SOON GUYS
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
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user@example.com",
      password: "securepassword",
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
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user@example.com",
      password: "securepassword",
    }),
  });

  const data = await response.json();
  console.log(data);
}

loginUser();
```

## 4. Update Profile API

#### Update Email

```javascript
async function updateEmail(token) {
  const response = await fetch("/api/Edit-Account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: "newuser@example.com",
    }),
  });

  const data = await response.json();
  console.log(data);
}

updateEmail("your-token-here");
```

#### Update Password

```javascript
async function updatePassword(token) {
  const response = await fetch("/api/Edit-Account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      oldPassword: "currentpassword",
      newPassword: "newsecurepassword",
    }),
  });

  const data = await response.json();
  console.log(data);
}

updatePassword("your-token-here");
```

#### Update Phone

```javascript
async function updatePhone(token) {
  const response = await fetch("/api/Edit-Account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      phone: "08129876543",
    }),
  });

  const data = await response.json();
  console.log(data);
}

updatePhone("your-token-here");
```

#### Update Display Name

```javascript
async function updateDisplayName(token) {
  const response = await fetch("/api/Edit-Account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      displayName: "New User Name",
    }),
  });

  const data = await response.json();
  console.log(data);
}

updateDisplayName("your-token-here");
```


## 5. Delete Account API

### COMING SOON GUYS