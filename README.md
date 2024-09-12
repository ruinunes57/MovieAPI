# **Movies API**

This project is a RESTful API built using TypeScript, NestJS and SQLite. The API allows users to manage movies and their associated genres (genders). Below, you'll find details on how to set up, run the application, and the available endpoints.

## **Table of Contents**
1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Implemented Features](#implemented-features)
4. [API Endpoints](#api-endpoints)
5. [Middleware](#middleware)
6. [Data Validation](#data-validation)
7. [Error Handling](#error-handling)

---

## **Installation**

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/movies-api.git
    ```

2. Navigate into the project directory:
    ```bash
    cd movies-api
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Make sure you have SQLite installed (if you plan to use it as the database).

---

## **Running the Application**

After installing the dependencies, you can run the application with the following commands:

- **Development mode**:
    ```bash
    npm run start
    ```
  This will start the application in development mode on `http://localhost:3000`.

- **Watch mode (auto-restart)**:
    ```bash
    npm run start:dev
    ```

- **Production mode**:
    ```bash
    npm run start:prod
    ```

The application will run on `http://localhost:3000`.

---

## **Implemented Features**

The API includes the following key functionalities:

1. **Movies Management**:
    - Create, retrieve, update, and delete movies.
    - Each movie can be associated with one or more genres.

2. **Genres (Genders) Management**:
    - Create, retrieve, update, and delete genres.
    - Genres can be associated with multiple movies.

3. **Pagination**:
    - Implemented pagination for movie listings.

4. **Data Validation**:
    - Validation of incoming requests using `class-validator`.
    - Validations for required fields, data types, and more.

5. **Error Handling**:
    - Global error handling for invalid requests, missing resources, and unexpected server issues.

---

## **API Endpoints**

### **Movies Endpoints**

1. **Create a Movie**  
   **POST** `/movies`
    - **Description**: Create a new movie.
    - **Request Body**:
      ```json
      {
        "title": "Movie Title",
        "description": "Description of the movie",
        "releaseDate": "YYYY-MM-DD",
        "genres": ["Action", "Drama"]
      }
      ```
    - **Response**: Returns the created movie object.

2. **Get All Movies (with pagination)**  
   **GET** `/movies`
    - **Description**: Retrieve all movies with optional pagination.
    - **Query Params**:
        - `page`: Page number (default is 1)
        - `limit`: Number of items per page (default is 10)
    - **Example**:
      ```bash
      curl "http://localhost:3000/movies?page=2&limit=5"
      ```
    - **Response**: Paginated list of movies.

3. **Search for a Movie**  
   **GET** `/movies/search`
    - **Description**: Search for movies by title or genre (you can only search by one at a time).
    - **Query Params**:
        - `title`: Movie title (optional)
        - `gender`: Movie genre (optional)
    - **Example**:
      ```bash
      curl "http://localhost:3000/movies/search?title=Inception"
      curl "http://localhost:3000/movies/search?gender=Action"
      ```
    - **Response**: List of movies matching the search criteria.

4. **Get a Movie by ID**  
   **GET** `/movies/:id`
    - **Description**: Retrieve a movie by its ID.
    - **Example**:
      ```bash
      curl "http://localhost:3000/movies/1"
      ```
    - **Response**: Returns the movie object.

5. **Update a Movie**  
   **PATCH** `/movies/:id`
    - **Description**: Update a movie by its ID.
    - **Request Body**: (Any field can be updated)
      ```json
      {
        "title": "Updated Movie Title",
        "description": "Updated Description",
        "releaseDate": "YYYY-MM-DD",
        "genres": ["Action", "Adventure"]
      }
      ```
    - **Example**:
      ```bash
      curl -X PATCH "http://localhost:3000/movies/1" -H "Content-Type: application/json" -d '{
        "title": "Updated Movie Title",
        "description": "Updated Description"
      }'
      ```
    - **Response**: Returns the updated movie object.

6. **Delete a Movie**  
   **DELETE** `/movies/:id`
    - **Description**: Delete a movie by its ID.
    - **Example**:
      ```bash
      curl -X DELETE "http://localhost:3000/movies/1"
      ```
    - **Response**: `204 No Content`

---

### **Genres (Genders) Endpoints**

1. **Create a Genre**  
   **POST** `/genders`
    - **Description**: Create a new genre (gender).
    - **Request Body**:
      ```json
      {
        "name": "Action"
      }
      ```
    - **Response**: Returns the created genre.

2. **Get All Genres**  
   **GET** `/genders`
    - **Description**: Retrieve all genres.
    - **Example**:
      ```bash
      curl "http://localhost:3000/genders"
      ```
    - **Response**: List of all genres.

3. **Get a Genre by ID**  
   **GET** `/genders/:id`
    - **Description**: Retrieve a genre by its ID.
    - **Example**:
      ```bash
      curl "http://localhost:3000/genders/1"
      ```
    - **Response**: Returns the genre object.

4. **Update a Genre**  
   **PATCH** `/genders/:id`
    - **Description**: Update a genre by its ID.
    - **Request Body**:
      ```json
      {
        "name": "Adventure"
      }
      ```
    - **Example**:
      ```bash
      curl -X PATCH "http://localhost:3000/genders/1" -H "Content-Type: application/json" -d '{
        "name": "Adventure"
      }'
      ```
    - **Response**: Returns the updated genre object.

5. **Delete a Genre**  
   **DELETE** `/genders/:id`
    - **Description**: Delete a genre by its ID.
    - **Example**:
      ```bash
      curl -X DELETE "http://localhost:3000/genders/1"
      ```
    - **Response**: `204 No Content`

---

## **Middleware**

This project uses a middleware for logging requests and their duration:

### **Logger Middleware**

- The logger middleware logs each HTTP request made to the API and the time taken to process it.
- It prints the HTTP method, URL, and the duration in milliseconds.

Example log:

### **How the Middleware is Applied**

The middleware is applied globally to all routes in the application:

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
        });
        next();
    }
}
```

---

## **Data Validation**

The API enforces data validation using the `class-validator` library. Below are some examples of validation rules:

1. **Movie Creation**:
    - **title**: Must be a non-empty string.
    - **description**: Must be a non-empty string.
    - **releaseDate**: Must be a valid date.
    - **genres**: Must be a non-empty array of strings.

2. **Genre (Gender) Creation**:
    - **name**: Must be a non-empty string.

If any validation rules are violated, the API will return a `400 Bad Request` response with a detailed error message.

---

## **Error Handling**

This API uses a global exception filter to handle errors consistently. Below are some common error responses:

1. **400 Bad Request**: Returned when the client sends invalid data (e.g., missing required fields, incorrect types).
   ```json
   {
     "statusCode": 400,
     "message": ["title must be a string", "releaseDate must be a valid date"],
     "error": "Bad Request"
   }
