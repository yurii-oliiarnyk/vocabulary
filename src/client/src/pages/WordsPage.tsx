import { useEffect, useState, useCallback } from "react";
import { IWord } from "~/types/words";
import { wordsApi } from "../api/words";
import { PageLayout } from "../layout/PageLayout";
import { CreateWord } from "../components/blocks/CreateWord";
import { API_AGENT_STATUS } from "../types/api";
import { WordsList } from "../components/blocks/WordsList";

export const WordsPage = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [status, setStatus] = useState<API_AGENT_STATUS>(API_AGENT_STATUS.IDLE);

  const getAllWords = useCallback(async () => {
    setStatus(API_AGENT_STATUS.SUCCESS);

    try {
      const { data } = await wordsApi.getAll();
      setWords(data);
      setStatus(API_AGENT_STATUS.SUCCESS);
    } catch (err) {
      setStatus(API_AGENT_STATUS.ERROR);
    }
  }, []);

  useEffect(() => {
    getAllWords();
  }, [getAllWords]);

  const removeItem = async (id: string) => {
    await wordsApi.delete(id);

    getAllWords();
  };

  const createItem = async (createdItem: Omit<IWord, "_id">) => {
    await wordsApi.create(createdItem);

    getAllWords();
  };

  const saveItem = async (newWord: IWord) => {
    setWords((words) => {
      return words.map((word) => {
        if (word._id === newWord._id) {
          return newWord;
        }

        return word;
      });
    });
    await wordsApi.update(newWord._id, newWord);
  };

  return (
    <PageLayout title="Wocabulary words">
      <CreateWord createItem={createItem} />
      <WordsList removeItem={removeItem} saveItem={saveItem} status={status} words={words} />
    </PageLayout>
  );
};
