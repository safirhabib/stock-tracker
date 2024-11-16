# stock-tracker
Basic Stock Tracker and Analyzer to track stock prices, calculate price changes, visualize trends, and analyze data.
Overview

This is a stock tracking application that allows users to view stock data for different companies. It fetches stock prices and displays them on an interactive chart, using APIs for real-time stock data.
Prerequisites

Before running the project, ensure you have the following installed on your system:
Node.js: The JavaScript runtime needed for the backend and frontend.
npm: Node package manager (installed with Node.js) for managing dependencies.
git: Version control system for managing your code.
Install Node.js and npm
On macOS or Linux:
Download and install Node.js, which includes npm.
You can also install it via Homebrew with the following command:
brew install node
On Windows:
Download and install Node.js.
Ensure npm is installed by running:
npm --version
Setup and Installation

Follow the steps below to set up and run the project.
1. Clone the Repository
Clone the repository to your local machine:
git clone <repository-url>
cd <repository-folder>
2. Install Dependencies
Frontend
Navigate to the client folder and install the frontend dependencies:
cd client
npm install
Backend
In the root project folder, install the backend dependencies:
cd ..
npm install
3. Setup Environment Variables
Create a .env file in the root directory of your project (the same level as server.js) and add the following environment variables:
PORT=5000
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
Replace your_alpha_vantage_api_key with your actual API key from Alpha Vantage.
4. Using Nodemon for Development
For better development experience, use nodemon, which will automatically restart the server when file changes are detected.
To use nodemon:
Install nodemon globally:
npm install -g nodemon
Run the server with nodemon:
nodemon server.js
This will run the backend with automatic reloading. Every time you make changes to the server code, nodemon will restart the server automatically.
5. Running the Project
Backend
In the root directory, run the backend server:
node server.js
or, using nodemon for automatic reloading:
nodemon server.js
Frontend
To start the React frontend, go to the client folder and run:
npm start
This will open the app in your default browser (usually at http://localhost:3000).
6. Running Both Backend and Frontend
If you want to run both the backend and frontend simultaneously, you can either:
Use separate terminals:
One terminal for the backend (node server.js or nodemon server.js).
Another terminal for the frontend (npm start in the client folder).
Use concurrently (optional):
Install concurrently to run both the frontend and backend in one terminal.
npm install concurrently --save-dev
Update your package.json in the root directory to add a start script for both:
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "client": "npm start --prefix client",
  "server": "nodemon server.js"
}
Now, you can run both the backend and frontend with:
npm start
7. Troubleshooting
If the server doesn't start, check if the required environment variables are correctly set in your .env file.
Ensure that you have the correct API key from Alpha Vantage in the .env file.
If you're running into CORS issues, ensure that you're setting up CORS correctly on the server side.
This guide will help users set up the project, install dependencies, and get everything running. It also explains how to use nodemon for development and how to manage environment variables.
Feel free to adapt it further based on your project's specific requirements!
