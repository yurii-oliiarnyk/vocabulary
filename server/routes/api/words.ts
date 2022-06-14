import { Request, Response } from "express";
import { Entity, EntityListResponse } from "../../types/entity";
import { Word } from "../../types/words";

const wordStorage: Entity<Word>[] = [];

export const getWords = (
  req: Request<any, any, EntityListResponse<Entity<Word>>, any, { limit?: number; page?: number }>,
  res: Response<EntityListResponse<Entity<Word>>>
) => {
  const { limit = 10, page = 1 } = req.query;
  const words = [...wordStorage].splice((page - 1) * limit, page * limit);

  res.send({
    limit,
    page,
    total: wordStorage.length,
    totalPages: Math.ceil(wordStorage.length / limit),
    data: words,
  });
};

export const createWord = (
  req: Request<any, any, any, Word>,
  res: Response<any, Entity<Word>>
): void => {
  const word = req.body;

  if (word.translations && word.translations.length > 0 && word.value && word.value.length > 0) {
    const createdWord: Entity<Word> = {
      ...word,
      id: Math.random().toString(),
    };

    wordStorage.push(createdWord);

    res.send(createdWord);
  }

  res.status(400).send({ error: "Bad request" });
};

export const deleteWord = (req: Request<{ id: string }>, res: Response) => {
  const entityId = req.params.id;
  const removedEntityIndex = wordStorage.findIndex((word) => word.id === entityId);

  if (removedEntityIndex !== -1) {
    wordStorage.splice(removedEntityIndex, 1);

    res.send({ success: true });
  }

  res.status(403).send({ error: "Entity with id " + entityId + " does not exist." });
};
