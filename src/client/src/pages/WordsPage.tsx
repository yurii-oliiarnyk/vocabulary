import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Loader } from "../components/shared/Loader";
import { IWord, WordsListResponse } from "~/types/words";
import { WordsList } from "../components/blocks/WordsList";

const BASE_URL = "http://localhost:4000";

export const WordsPage = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllWords = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { data },
      } = await axios.get<WordsListResponse>(`${BASE_URL}/api/words`);
      setWords(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllWords();
  }, [getAllWords]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <WordsList words={words} />
    </div>
  );
};
