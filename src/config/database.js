const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

let isConnected = false // track the connection

module.exports.connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if (isConnected) {
        console.log("MongoDB is already connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Calculator",
        })

        isConnected = true

        console.log("MongoDB connected")
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}