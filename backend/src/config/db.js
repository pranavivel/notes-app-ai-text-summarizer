import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED Successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB", error)
        process.exit(1) // 1 means Exit with failure 0 means Exit with success
    }
}