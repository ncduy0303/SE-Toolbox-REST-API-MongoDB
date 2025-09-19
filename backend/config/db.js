const mongoose = require('mongoose');

// function to start up and connect to MongoDB database
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB database connected: ${con.connection.host}`); // log the connection host
    } catch (error) {
        console.error('Error connecting to MongoDB database', error);
        process.exit(1); // exit process with failure
    }
};

// export the connectDB function to be used elsewhere
module.exports = connectDB;