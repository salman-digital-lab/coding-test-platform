# Coding Test Platform

A monolith webapp for administering JavaScript coding tests with token-based access.

## Quick Start

1. **Setup PostgreSQL**

   ```bash
   createdb coding_test
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Install & Run**

   ```bash
   npm install
   npm start
   ```

4. **Open** http://localhost:3000

## Pages

| URL      | Description                                  |
| -------- | -------------------------------------------- |
| `/`      | Homepage - Token input                       |
| `/test`  | Test page (requires valid token)             |
| `/admin` | Admin panel - Generate tokens & view results |

## API Endpoints

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | `/api/admin/tokens`          | Generate token for email |
| GET    | `/api/validate-token/:token` | Validate token           |
| POST   | `/api/submit-score`          | Submit test score        |
| GET    | `/api/admin/results`         | Get all results          |

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: Vanilla HTML/CSS/JS
# coding-test-platform
