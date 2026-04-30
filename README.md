# Full Stack MERN Todo Application

A modern, responsive, and secure Todo application built using the MERN stack (MongoDB, Express, React, Node.js). This project is designed as a high-quality demo for college projects or portfolio showcases.

## Features

-   **Premium UI/UX**: Modern SaaS-style design with Glassmorphism, smooth transitions, and vibrant color palettes.
-   **Authentication**: Full user registration and login system using JWT (JSON Web Tokens) and Bcrypt for secure password hashing.
-   **Task Management**:
    -   Create, Edit, Delete, and Mark tasks as complete.
    -   **Priority Levels**: Low, Medium, High, Critical.
    -   **Categories**: Tag tasks (e.g., Work, Personal, Study).
    -   **Due Dates**: Track deadlines with visual overdue indicators.
-   **Dynamic Dashboard**:
    -   Real-time statistics (Total, Completed, Pending, Overdue tasks).
    -   Progress percentage visualization.
-   **Advanced Filtering**:
    -   Search tasks by title or description.
    -   Filter by Status (All, Pending, Completed).
    -   Filter by Priority and Category.
-   **Theme Support**: Full Dark and Light mode support with a toggle.
-   **Fully Responsive**: Works seamlessly on Mobile, Tablet, and Desktop.

## Tech Stack

-   **Frontend**: React.js, Vite, Bootstrap, React Icons, React Router.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Atlas or Local).
-   **Security**: JWT for Auth, Bcrypt for Hashing, CORS for cross-origin requests.

## Local Setup Instructions

### Prerequisites

-   Node.js installed on your machine.
-   MongoDB (either a local installation or a free cluster on MongoDB Atlas).

### 1. Clone or Download the Project

Extract the files to your desired directory.

### 2. Backend Configuration

1.  Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory (copy from `.env.example`):
    ```bash
    cp .env.example .env
    ```
4.  Open `.env` and fill in your details:
    -   `PORT=5000`
    -   `MONGO_URI`: Your MongoDB connection string.
    -   `JWT_SECRET`: Any random string for token signing (e.g., `mysecretkey123`).

### 3. Frontend Configuration

1.  Navigate to the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### 4. Running the Application

**Option A: Running Backend and Frontend separately**

1.  **Start Backend**:
    In the `backend` folder, run:
    ```bash
    npm run dev
    ```
    (The server will start on http://localhost:5000)

2.  **Start Frontend**:
    In the `frontend` folder, run:
    ```bash
    npm run dev
    ```
    (The app will start on http://localhost:5173 or similar)

**Option B: One-Command Start (If configured)**
-   Navigate to the root directory and run `npm start` (if a root package.json exists).

## Folder Structure

-   `/backend`: Node/Express API with Mongoose models and Auth controllers.
-   `/frontend`: React/Vite application with modular components and SaaS styling.

## Demo Credentials
Since it uses a database, you can simply **Register** a new account to see your personal dashboard. Each user sees only their own tasks.

---
*Built for educational and demonstration purposes.*
