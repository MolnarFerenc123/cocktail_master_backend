# CocktailMaster Backend

This project is a REST API backend for a cocktail application. It provides endpoints for managing cocktails, searching by name or ingredients, listing available ingredients, and handling user registration/login.

## Features

- Fetch all cocktails
- Get detailed information about a specific cocktail
- List ingredients
- Search cocktails by name and ingredient filters
- User authentication with JWT
- MySQL database integration via Sequelize

## Main Technologies

- **Node.js** with **Express** for the API server
- **Sequelize** for ORM/database access
- **MySQL** for data storage
- **JSON Web Tokens (JWT)** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment configuration
- **CORS** for cross-origin requests
- **Fuse.js** for fuzzy search

## Project Structure

- `server.js` — starts the Express server and connects to the database
- `src/presentation/routes` — API routes
- `src/presentation/controllers` — request handlers
- `src/domain/usecases` — business logic
- `src/data` — repositories, models, and database setup

## Prerequisites

- Node.js (recommended LTS version)
- npm
- A running MySQL database

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root and configure values such as:

```env
PORT=3001
DB_HOST=your_database_host
DB_PORT=3306
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
DB_DIALECT=mysql
JWT_SECRET=your_secret_key
```

> `JWT_SECRET` is required for authentication to work correctly.

## Running the Project

Start the development server with:

```bash
npm run dev
```

The server will run on the port defined in your `.env` file (default: `3001`).

## API Endpoints

### Authentication

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — log in and receive a JWT token

### Cocktails

- `GET /api/cocktails` — get all cocktails
- `GET /api/cocktails/:id` — get one cocktail by id
- `GET /api/cocktails/ingredients` — get all ingredients
- `GET /api/cocktails/search` — search cocktails by query parameters

## Example Search Query

```http
GET /api/cocktails/search?name=margarita&virgin=true&ingredients=1,2,3
```

## Frontend Repository

The frontend for this project is available at:

https://github.com/MolnarFerenc123/cocktail_master_frontend

## Notes

- The application uses a clean separation between presentation, domain, and data layers.
- The backend expects the database schema to already exist or be created externally before running the app.
