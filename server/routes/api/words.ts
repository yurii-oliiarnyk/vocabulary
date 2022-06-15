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
  req: Request<any, any, Omit<IWord, "_id">>,
  res: Response<any, IWord>
) => {
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
};

export const deleteWord = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const word = await Word.findByIdAndRemove(req.params.id);

    if (!word) {
      res.status(400).send({ message: "Word with id: " + req.params.id + " already deleted." });
    }

    res.send({ success: true, message: "Word deleted." });
  } catch (e) {
    res.status(400).send({ message: "Can't delete entity with id: " + req.params.id });
  }
};

export const updateWord = async (
  req: Request<{ id: string }, any, IWord, any>,
  res: Response<any, IWord>
) => {
  try {
    const word = await Word.findByIdAndUpdate(req.params.id, req.body).exec();

    if (!word) {
      res.status(400).send({ message: "Word with id: " + req.params.id + " doesn't exist." });
    }

    res.send(word);
  } catch (e) {
    res.status(400).send({ message: "Error updateing word." });
  }
};
