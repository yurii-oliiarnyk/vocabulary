import express from "express";
import wordsRouter from "./words";

const router = express.Router();

router.use("/words", wordsRouter);

export default router;
