import express from "express";
import {
  addDeck,
  deleteDeck,
  fetchDeck,
  fetchDecks,
  updateDeck,
} from "../controllers/deck.controller.js";
import { validateDeck } from "../middlewares/validate.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("DECK ROUTER HIT:", req.method, req.originalUrl);
  next();
});

router.post("/", addDeck);
router.get("/", fetchDecks);
router.get("/:id", validateDeck, fetchDeck);
router.put("/:id", validateDeck, updateDeck);
router.delete("/:id", validateDeck, deleteDeck);

export default router;
