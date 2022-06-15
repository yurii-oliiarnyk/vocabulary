import { Request, Response } from "express";
import mongoose from "mongoose";
import { EntityListResponse } from "../../types/entity";
import { IWord } from "../../types/words";
import { Word } from "../../models/word";

export const getWords = async (
  req: Request<any, any, EntityListResponse<IWord>, any, { limit?: number; page?: number }>,
  res: Response<any>
) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const wordsCount = await Word.count();
    const words = await Word.find()
      .skip((page - 1) * limit)
      .limit(limit);

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
};

export const getWord = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const word = await Word.findById(req.params.id);

    res.send({ data: word });
  } catch (e) {
    res.status(404).send({ message: "Can't find entity with id: " + req.params.id });
  }
};

export const createWord = async (
  req: Request<any, any, any, Omit<IWord, "_id">>,
  res: Response<any, IWord>
) => {
  try {
    const word = new Word({
      _id: new mongoose.Types.ObjectId(),
      translations: req.body.translations,
      value: req.body.value,
    });

    await word.save();

    res.send(word);
  } catch (e) {
    res.status(400).send({ message: "Error saving word." });
  }
};

export const deleteWord = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await Word.findByIdAndDelete(req.params.id);
    res.send(true);
  } catch (e) {
    res.status(400).send({ message: "Can't delete entity with id: " + req.params.id });
  }
};
