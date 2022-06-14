import express from "express";
import { getWords, createWord, deleteWord } from "./routes/api/words";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/words", getWords);
app.post("/api/words", createWord);
app.delete("/api/words/:id", deleteWord);

app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));
