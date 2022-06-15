import express from "express";
import mongoose from "mongoose";
import { getWords, getWord, createWord, deleteWord } from "./routes/api/words";

const app = express();

const MONGODB_USERNAME = "root";
const MONGODB_PASSWORD = "1406";

mongoose.connect(
  `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.znpih.mongodb.net/?retryWrites=true&w=majority`,
  {
    autoCreate: true,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/words", getWords);
app.get("/api/words/:id", getWord);
app.post("/api/words", createWord);
app.delete("/api/words/:id", deleteWord);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));
