import mongoose, { Schema } from "mongoose";
import { IWord } from "../types/words";

const wordSchema = new Schema<IWord>(
  {
    _id: mongoose.SchemaTypes.ObjectId,
    translations: {
      type: String,
      required: true,
      minlength: 1,
    },
    value: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Word = mongoose.model<IWord>("Word", wordSchema);
