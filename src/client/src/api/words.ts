import { WordsListResponse, IWord } from "~/types/words";
import { axiosInstance } from "./axios";

export const wordsApi = {
  /**
   * Get all words
   * @returns {Promise<WordsListResponse>}
   */
  async getAll(): Promise<WordsListResponse> {
    const response = await axiosInstance.get<WordsListResponse>("/api/words");
    return response.data;
  },
  async create(body: Omit<IWord, "_id">): Promise<IWord> {
    const response = await axiosInstance.post("/api/words", body);
    return response.data;
  },
  async update(id: string, body: IWord): Promise<any> {
    const response = await axiosInstance.put(`/api/words/${id}`, body);
    return response.data;
  },
  async delete(id: string): Promise<any> {
    const response = await axiosInstance.delete(`/api/words/${id}`);
    return response.data;
  },
};
