const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

connectDB(); // connect to MongoDB database
const app = express();

// allow cross-origin requests to reach the Expres.js server
// Configure CORS for Docker environment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://frontend:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// allow JSON data in request body to be parsed
app.use(express.json());
// allow URL-encoded data in request body to be parsed
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
// configure the Express.js application to run at port 8080
// since you will be running this application on your computer (localhost),
// the backend server will be running at http://localhost:8080
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// when a GET request is made to http://localhost:8080/,
// the response will be { message: 'Hello World' } in JSON format
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// use the address router to handle requests
// at http://localhost:8080/api/addresses
app.use('/api/addresses', require('./routes/addressRoutes'));

// export Express.js application to be used elsewhere
module.exports = app;