import { IWord } from "~/types/words";

type WordsListProps = {
  words: IWord[];
};

export const WordsList = ({ words }: WordsListProps) => {
  return (
    <div>
      {words.map((word, index) => {
        return (
          <div key={word._id}>
            <p>{index + 1}</p>
            <p>{word.value}</p>
            <p>{word.translations}</p>
          </div>
        );
      })}
    </div>
  );
};
