const mongoose = require('mongoose');

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); 
    }
};

module.exports = connectToDB;
