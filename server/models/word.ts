import mongoose, { Schema } from "mongoose";
import { IWord } from "../types/words";

const wordSchema = new Schema<IWord>(
  {
    _id: mongoose.SchemaTypes.ObjectId,
    translations: String,
    value: String,
  },
  {
    timestamps: true,
  }
);

export const Word = mongoose.model<IWord>("Word", wordSchema);
