import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import api from "./routes/api";
import mongoose from "mongoose";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net`,
  {
    w: "majority",
    retryWrites: true,
  }
);

/** Enable cors */
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));
