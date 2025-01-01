
# MentaEase API Documentation For Email Authentications

## Contents

1. [User Registration](#1-user-registration-api)
2. [Login](#2-user-login-api)
3. [Profile](#3-user-login-api)
4. [Update](#4-update-profile-api)
5. [Delete](#5-delete-account-api)
6. [Logout API](#6-logout-api)

## 1. User Registration API

**Endpoint:** `/email/registration`

### Description

This endpoint allows users to register by providing an email and password. The system ensures that the email is unique.

### Endpoint Details

- **URL**: `/email/registration`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `email` (string): The user's email address.
  - `password` (string): The user's password.

### Example Request

```json
POST /email/registration
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

## 2. User Login API

**Endpoint:** `/email/login`

### Description

This endpoint allows users to log in by providing an email and password. If the credentials are valid, the user is authenticated, and a profile along with an access token is returned.

### Endpoint Details

- **URL**: `/email/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body** (JSON):
  - `email` (string): The user's email address.
  - `password` (string): The user's password.

### Example Request

```json
POST /email/login
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

## 3. Get Profile Data

**Endpoint:** `/email/profile`

### Description

This endpoint allows authenticated users to fetch their profile data, including their email, display name, and phone number, after providing a valid authentication token.

### Endpoint Details

- **URL**: `/email/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: Bearer token (JWT token for authentication)
- **Query Parameters**: None
- **Body**: None

### Example Request

```http
GET /email/profile
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

## 4. Update Profile API

**Endpoint:** `/email/Edit-Account`

### Description

This endpoint allows users to update their account information, such as email, password, phone, or display name. Changes must be performed one at a time.

### Endpoint Details

- **URL**: `/email/Edit-Account`
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
POST /email/Edit-Account
{
  "email": "newuser@example.com"
}
```

#### Update Password

```json
POST /email/Edit-Account
{
  "oldPassword": "currentpassword",
  "newPassword": "newsecurepassword"
}
```

#### Update Phone

```json
POST /email/Edit-Account
{
  "phone": "08129876543"
}
```

#### Update Display Name

```json
POST /email/Edit-Account
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

## 5. Delete Account API

**Endpoint:** `/email/Delete-Account`

### Description
This endpoint allows users to permanently delete their account from the system. It requires a valid authentication token and leverages the Supabase admin API for user deletion.

### Endpoint Details

- **URL**: `/email/Delete-Account`
- **Method**: `DELETE`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <token>`

### Example Request

```json
DELETE /email/Delete-Account
```

### Example Response

#### Success (200 OK)

```json
{
  "message": "Akun berhasil dihapus."
}
```

### Error Responses

- `400 Bad Request`: Error occurred while attempting to delete the account.
  - Example:
    ```json
    {
      "error": "Gagal menghapus akun pengguna."
    }
    ```
- `403 Forbidden`: No token provided in the request.
  - Example:
    ```json
    {
      "error": "Token is required"
    }
    ```
- `401 Unauthorized`: Invalid or expired token.
  - Example:
    ```json
    {
      "error": "Invalid or expired token"
    }
    ```
- `500 Internal Server Error`: Server encountered an error while processing the request.
  - Example:
    ```json
    {
      "error": "Terjadi kesalahan server."
    }
    ```

### Note

- The token must be provided in the `Authorization` header and formatted as `Bearer <token>`.
- Account deletion is permanent and cannot be undone. Ensure users are fully informed before initiating this action.

## 6. Logout API

**Endpoint:** `/email/Logout`

### Description
This endpoint allows users to log out of the application by invalidating their authentication token. It requires a valid authentication token, which will be used to sign out the user from their current session in Supabase.

### Endpoint Details

- **URL**: `/email/Logout`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <token>`

### Example Request

```json
POST /email/logout
```

### Example Response

#### Success (200 OK)

```json
{
  "message": "Logout berhasil"
}
```

### Error Responses

- `400 Bad Request`: Error occurred while attempting to log out the user.
  - Example:
    ```json
    {
        "error": "Gagal logout pengguna"
    }
    ```
- `403 Forbidden`: No token provided in the request.
  - Example:
    ```json
    {
      "error": "Token is required"
    }
    ```
- `401 Unauthorized`: Invalid or expired token.
  - Example:
    ```json
    {
      "error": "Invalid or expired token"
    }
    ```
- `500 Internal Server Error`: Server encountered an error while processing the request.
  - Example:
    ```json
    {
      "error": "Terjadi kesalahan server."
    }
    ```

### Note

- The token must be provided in the `Authorization` header and formatted as `Bearer <token>`.
- Upon successful logout, the user session in Supabase will be invalidated, and the authentication token will no longer be valid.

# Example Code

## 1. User Registration API

```javascript
async function registerUser() {
  const response = await fetch("/email/register", {
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

## 2. User Login API

```javascript
async function loginUser() {
  const response = await fetch("/email/login", {
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

## 3. Get Profile API

```javascript
async function getProfile(token) {
  const response = await fetch("/email/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}

getProfile("your-token-here");
```

## 4. Update Profile API

#### Update Email

```javascript
async function updateEmail(token) {
  const response = await fetch("/email/Edit-Account", {
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
  const response = await fetch("/email/Edit-Account", {
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
  const response = await fetch("/email/Edit-Account", {
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
  const response = await fetch("/email/Edit-Account", {
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

#### Delete Account

```javascript
async function deleteAccount(token) {
  const response = await fetch("/email/Delete-Account", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}

deleteAccount("your-token-here");
```
## 6. Logout Account API

#### Logout Account

```javascript
async function logout(token) {
  const response = await fetch("/email/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
}

logout("your-token-here");
```