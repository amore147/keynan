import Deck from "../server/models/Deck.js";
import mongoose from "mongoose";

export async function validateDeck(req, res, next) {
  try {
    const deckId = req.params.deckId || req.params.id;

    if (deckId) {
      if (!mongoose.Types.ObjectId.isValid(deckId))
        return res.status(400).json({ message: "Invalid Deck ID format" });

      const deck = await Deck.findById(deckId);
      if (!deck) return res.status(404).json({ message: "Deck not found" });

      req.deck = deck;
      req.id = deckId;
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function validateCard(req, res, next) {
  try {
    const { id } = req.params;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ message: "Invalid object id type" });

      const deck = req.deck;

      if (!deck) return res.status(404).json({ message: "Decck not found" });

      const card = deck.cards.id(id);

      if (!card) return res.status(400).json({ message: "Card not found" });

      req.card = card;
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
