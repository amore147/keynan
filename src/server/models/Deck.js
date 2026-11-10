import mongoose, { mongo } from "mongoose";

const cardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },

  answer: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
    default: null,
  },
});

const deckSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,
    cards: {
      type: [cardSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Deck", deckSchema);
