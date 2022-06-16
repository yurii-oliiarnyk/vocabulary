import { EntityListResponse } from "./entity";

export interface IWord {
  _id: string;
  translations: string;
  value: string;
}

export type WordsListResponse = EntityListResponse<IWord>;
