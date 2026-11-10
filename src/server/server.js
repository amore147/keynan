import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import DeckRouter from "../routes/deck.routes.js";
import CardRouter from "../routes/card.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/decks", DeckRouter);
app.use("/api/decks/:deckId/cards", CardRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("db connected");

    app.listen(process.env.PORT ? process.env.PORT : 5000, () => {
      console.log("backend running");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
