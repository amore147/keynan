import express from "express";
import {
  addCard,
  deleteCard,
  getCards,
  updateCard,
} from "../controllers/card.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, addCard);

router.get("/", verifyToken, getCards);

router.put("/:id", updateCard);

router.delete("/:id", deleteCard);

export default router;
