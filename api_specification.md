# API Specification

## Base URL
All API requests should be prefixed with the base URL (e.g., `/api/v1` or just `/`).

## Authentication

### Login
- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "login": "string",
    "password": "string" // min 6 chars
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "id": "string",
      "login": "string",
      "fullName": "string",
      "role": "string"
    }
  }
  ```

### Register
- **Endpoint**: `POST /auth/register`
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "login": "string",
    "password": "string", // min 6 chars
    "role": "worker" | "student"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "id": "string",
      "login": "string",
      "fullName": "string",
      "role": "string"
    }
  }
  ```

### Get Current User Profile
- **Endpoint**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`
  ```json
  {
    "id": "string",
    "login": "string",
    "fullName": "string",
    "role": "string"
  }
  ```

---

## Dormitories

### Get All Dormitories
- **Endpoint**: `GET /dormitories`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "address": "string",
      "roomCount": 0, // optional
      "occupancyRate": 0 // optional
    }
  ]
  ```

### Get Dormitory by ID
- **Endpoint**: `GET /dormitories/:id`
- **Response**: `200 OK`
  ```json
  {
    "id": "string",
    "name": "string",
    "address": "string"
  }
  ```

### Create Dormitory
- **Endpoint**: `POST /dormitories`
- **Request Body**:
  ```json
  {
    "name": "string",
    "address": "string"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": "string",
    "name": "string",
    "address": "string"
  }
  ```

### Update Dormitory
- **Endpoint**: `PUT /dormitories/:id`
- **Request Body**:
  ```json
  {
    "name": "string",
    "address": "string"
  }
  ```
- **Response**: `200 OK` (Returns updated object)

### Delete Dormitory
- **Endpoint**: `DELETE /dormitories/:id`
- **Response**: `204 No Content`

---

## Students

### Get All Students
- **Endpoint**: `GET /students`
- **Query Parameters**:
  - `fullName`: string (optional, for filtering)
- **Response**: `200 OK`
  ```json
  [
    {
      "id": "string",
      "fullName": "string",
      "dateOfBirth": "YYYY-MM-DD",
      "course": 1 // number
    }
  ]
  ```

### Get Student by ID
- **Endpoint**: `GET /students/:id`
- **Response**: `200 OK`
  ```json
  {
    "id": "string",
    "fullName": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "course": 1
  }
  ```

### Create Student
- **Endpoint**: `POST /students`
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "course": 1
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": "string",
    "fullName": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "course": 1
  }
  ```

### Update Student
- **Endpoint**: `PUT /students/:id`
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "course": 1
  }
  ```
- **Response**: `200 OK`

### Delete Student
- **Endpoint**: `DELETE /students/:id`
- **Response**: `204 No Content`

---

## Residents
(Students with assigned rooms)

### Get All Residents
- **Endpoint**: `GET /residents`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": "string",
      "fullName": "string",
      "dormitoryName": "string",
      "roomNumber": "string"
    }
  ]
  ```

---

## Workers

### Get All Workers
- **Endpoint**: `GET /workers`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": "string",
      "fullName": "string",
      "login": "string",
      "role": "worker"
    }
  ]
  ```

### Create Worker
- **Endpoint**: `POST /workers`
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "login": "string",
    "password": "string"
  }
  ```
- **Response**: `201 Created`

---

## Search

### Global Search
- **Endpoint**: `GET /search`
- **Query Parameters**: `q` (string)
- **Response**: `200 OK`
  ```json
  {
    "students": [],
    "dormitories": []
  }
  ```

---

## Reports

### Occupancy Report
- **Endpoint**: `GET /reports/occupancy`
- **Response**: `200 OK`
  ```json
  [
    {
      "dormitoryId": "string",
      "dormitoryName": "string",
      "capacity": 100,
      "occupied": 80,
      "occupancyRate": 80
    }
  ]
  ```
