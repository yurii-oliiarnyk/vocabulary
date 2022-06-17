import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { EntityListResponse } from "~/types/entity";
import { IWord } from "~/types/words";
import { Word } from "../../models/word";

const router = express.Router();

router.get(
  "/",
  async (
    req: Request<any, any, EntityListResponse<IWord>, any, { limit?: number; page?: number }>,
    res: Response<any>
  ) => {
    try {
      const { limit = 10, page = 1 } = req.query;

      const wordsCount = await Word.count();
      const words = await Word.find({}, {}, { sort: { id: 1 }, limit, skip: (page - 1) * limit });

      res.send({
        data: words,
        limit,
        page,
        count: wordsCount,
        totalPages: Math.ceil(wordsCount / limit),
      });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      res.status(400).send({ message: "Word with id: " + req.params.id + " doesn't exist." });
    } else {
      res.send({ data: word });
    }
  } catch (e) {
    res.status(404).send({ message: "Can't find entity with id: " + req.params.id });
  }
});

router.post("/", async (req: Request<any, any, Omit<IWord, "_id">>, res: Response<any, IWord>) => {
  try {
    const word = new Word({
      _id: new mongoose.Types.ObjectId(),
      value: req.body.value,
      translations: req.body.translations,
    });

    const createWord = await word.save();

    res.send(createWord);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const word = await Word.findByIdAndRemove(req.params.id);

    if (!word) {
      res.status(400).send({ message: "Word with id: " + req.params.id + " already deleted." });
    } else {
      res.send({ success: true, message: "Word deleted." });
    }
  } catch (e) {
    res.status(400).send({ message: "Can't delete entity with id: " + req.params.id });
  }
});

router.put(
  "/:id",
  async (req: Request<{ id: string }, any, IWord, any>, res: Response<any, IWord>) => {
    try {
      const word = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();

      if (!word) {
        res.status(400).send({ message: "Word with id: " + req.params.id + " doesn't exist." });
      } else {
        res.send(word);
      }
    } catch (e) {
      res.status(400).send({ message: "Error updateing word." });
    }
  }
);

export default router;
