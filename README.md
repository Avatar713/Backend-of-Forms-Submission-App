# Backend-of-Forms-Submission-App
The code for the backend of the Forms Submission App given as a task.

**Backend Server Description**

This backend server is an Express app built with TypeScript, designed to handle form submissions for a web application. It utilizes a JSON file (`db.json`) for storing submissions locally.

**Frontend API Calls**

The frontend interacts with the backend using the following API endpoints:

- **`/ping` (GET):** Verifies server health by always returning `True`.
- **`/submit` (POST):** Saves a new form submission with the following parameters:
    - `name` (string): User's name
    - `email` (string): User's email address
    - `phone` (string): User's phone number (optional)
    - `github_link` (string): User's GitHub link (optional)
    - `stopwatch_time` (number): Time recorded using a stopwatch (optional)

- **`/read` (GET):** Retrieves a specific form submission using the `index` query parameter (0-indexed):
    - `?index=1`: Retrieves the second (index 1) submission

**JSON Database Structure (db.json)**

The `db.json` file stores an array of objects, with each object representing a submitted form:

```json
[
  {
    "id": 1,              // Unique identifier (auto-incrementing)
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",  // Optional
    "github_link": "https://github.com/johndoe", // Optional
    "stopwatch_time": 123.45, // Optional
    "timestamp": "2024-06-21T15:52:00.000Z" // Submission timestamp
  },
  // ... more submissions
]
```

**Backend Server Implementation (Express + TypeScript)**

**Project Setup**

1. Create a project directory: `mkdir backend`
2. Initialize npm: `cd backend && npm init -y`
3. Install dependencies: `npm install express typescript @types/express @types/node`

**Code Structure**

- `src/`: TypeScript source code resides here
    - `index.ts`: Main server entry point
    - `routes/`: Route handler files (optional)
    - `models/`: Data models (optional, for improved type safety)
- `db.json`: JSON file for database storage
