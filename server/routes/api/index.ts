import express from "express";
import words from "./words";

const router = express.Router();

router.use("/words", words);

export default router;
