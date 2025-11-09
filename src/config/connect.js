import mongoose from "mongoose";

export const connectDB = async (uri) => {

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            ssl: true,
            tlsAllowInvalidCertificates: true,
        })

        console.log("DB Connected")
    } catch (error) {
        console.error("Database connection error", error)
        process.exit(1);
    }
}