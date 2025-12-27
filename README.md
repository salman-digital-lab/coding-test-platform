# Coding Test Platform

A monolith webapp for administering JavaScript coding tests with email-based access.

## Quick Start

1. **Setup PostgreSQL**

   ```bash
   createdb coding_test
   ```

2. **Configure environment**

   ```bash
   export DATABASE_URL="postgresql://username:password@localhost:5432/coding_test"
   ```

3. **Install & Run**

   ```bash
   npm install
   npm start
   ```

4. **Open** http://localhost:3000

## Pages

| URL      | Description                                       |
| -------- | ------------------------------------------------- |
| `/`      | Homepage - Email input to start the test          |
| `/test`  | Test page - LeetCode-style JavaScript coding test |
| `/admin` | Admin panel - View results & export to CSV        |

## Features

### Homepage
- Users enter their email address to begin the coding assessment
- Email is stored in session storage for tracking

### Test Page
- LeetCode-style split-panel interface
- Monaco Editor for writing JavaScript code
- Client-side test evaluation
- Multiple coding problems with difficulty levels
- Real-time test case feedback
- Score submission on completion

### Admin Panel
- Password-protected access
- View all submitted test results
- Export results to CSV
- Refresh to see latest submissions

## API Endpoints

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/api/submit-score`   | Submit test score           |
| GET    | `/api/admin/results`  | Get all results             |
| GET    | `/api/admin/export-csv` | Export results as CSV file |

## Tech Stack

- **Backend**: Node.js, Express (ES Modules)
- **Database**: PostgreSQL
- **Frontend**: Vanilla HTML/CSS/JS
- **Code Editor**: Monaco Editor (CDN)

## Database Schema

```sql
CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
├── server.js          # Express server & API routes
├── db.js              # PostgreSQL database module
├── package.json       # Dependencies & scripts
├── public/
│   ├── index.html     # Homepage
│   ├── test.html      # Test page with Monaco Editor
│   ├── admin.html     # Admin panel
│   ├── css/
│   │   └── style.css  # Global styles
│   └── js/
│       ├── home.js    # Homepage logic
│       ├── test.js    # Test page logic & questions
│       └── admin.js   # Admin panel logic
└── README.md
```

## Environment Variables

| Variable       | Description                          | Example                                           |
| -------------- | ------------------------------------ | ------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string         | `postgresql://user:pass@localhost:5432/coding_test` |
| `PORT`         | Server port (optional, default 3000) | `3000`                                            |
