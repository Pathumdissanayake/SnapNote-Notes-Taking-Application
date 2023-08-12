# SnapNote-Notes-Taking-Application
SnapNote is a MERN (MongoDB, Express, React, Node.js) stack web application for managing notes.

## Setup Instructions

Follow these steps to set up and run the SnapNote application on your local machine:

Step 1: Download and Extract Repository
Download the SnapNote repository as a ZIP file from GitHub.
Extract the downloaded ZIP file to your preferred directory.

Step 2: Frontend Setup
Open a terminal.
Navigate to the extracted repository directory.
Navigate to the frontend directory: cd frontend/snapnote.
Install frontend dependencies: npm install.
Start the frontend server: npm start.
The frontend should now be running at http://localhost:3000.

Step 3: Backend Setup
Open another terminal window.
Navigate to the extracted repository directory.
Navigate to the backend directory: cd backend.
Install backend dependencies: npm install.
Start the backend server: npm run dev.
The backend should now be running at http://localhost:5000.

Step 4: User Authentication
Open a web browser and navigate to http://localhost:3000.
If you are a registered user, log in using your username (email) and password.
If you are a new user, click on the "Register" button and provide the required details to register.
Ensure the registration email is unique and hasn't been used before.

Step 5: Explore and Manage Notes
After logging in, you will be directed to the home page displaying existing notes.
Click on a note to view its content and title.
Inside a note, you can choose to edit or delete it.
To create a new note, click the plus icon on the page to open the create form.
Create a new note with the desired content and title.

Additional Notes : 
This application uses the MERN stack (MongoDB, Express, React, Node.js) for its functionality.
User authentication is required to access and manage notes.
Make sure to have Node.js and MongoDB installed on your machine before running the application.

## Disclaimer and Troubleshooting

**Important:** If you encounter an conflict plugin error similar to the one below while setting up the application:

Please follow these steps:

1. Open the `package.json` file located in the `frontend/snapnote` directory.
2. After opening the file, simply press `Ctrl + S` (or `Cmd + S` on macOS) to save it.

This should resolve the conflicting plugin issue.
