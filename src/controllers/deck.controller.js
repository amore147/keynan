import express from "express";
import Deck from "../server/models/Deck.js";

const app = express();

app.use(express.json());

export const addDeck = async (req, res) => {
  try {
    const { title, description = "" } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const deck = await Deck.create({
      title: title.trim(),
      description: description,
      cards: [],
    });

    res.status(201).json(deck);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchDecks = async (req, res) => {
  try {
    const decks = await Deck.find({});

    return res.status(200).json({
      message: "Decks fetched Successfull",
      count: decks.length,
      data: decks,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const fetchDeck = async (req, res) => {
  try {
    const id = req.id;
    if (!id)
      return res.status(404).json({
        message: "Deck not found",
      });

    const deck = await Deck.findById(id);

    if (!deck)
      return res.status(404).json({
        message: "Deck not found",
      });

    return res.status(200).json({
      message: `Successfully fetched ${id}`,
      data: deck,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateDeck = async (req, res) => {
  try {
    const id = req.id;
    const { title, description } = req.body;

    if (title !== undefined && !title.trim())
      return res.status(400).json({ message: "Title is required" });

    const deck = await Deck.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true },
    );

    if (!deck) return res.status(404).json({ message: "Deck not found" });

    return res.status(200).json({
      message: `Successfully updated Deck`,
      updatedDeck: deck,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteDeck = async (req, res) => {
  try {
    const id = req.id;

    const deleteDeck = await Deck.findByIdAndDelete(id);

    if (!deleteDeck) return res.status(404).json({ message: "Deck not found" });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
