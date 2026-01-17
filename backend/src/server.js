import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"; // ADD THIS
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001



// middleware
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json()); // This middleware allows JSON bodies to be parsed from req.body
app.use(rateLimiter)


app.use("/api/notes", notesRoutes);
app.use("/api/ai", aiRoutes); // ADD this

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("server started on PORT:", PORT);
    })
})



