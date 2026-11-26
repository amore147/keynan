export const addCard = async (req, res) => {
  try {
    const { front, back } = req.body;

    if (!front || !back || !front.trim() || !back.trim())
      return res
        .status(400)
        .json({ message: "Both front and back is required for the card" });

    const deck = req.deck;

    deck.cards.push({ front: front.trim(), back: back.trim() });

    await deck.save();

    return res.status(201).json({ message: "Added Successfully", data: deck });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCards = async (req, res) => {
  try {
    const deck = req.deck;

    return res.status(200).json({
      message: "Fetched all cards successfully",
      totalCards: deck.cards.length,
      cards: deck.cards,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deck = req.deck;
    const { front, back } = req.body;

    const card = deck.cards.id(id);

    if (!card) return res.status(404).json({ message: "Card not found" });

    if (front !== undefined) card.front = front.trim();

    if (back !== undefined) card.back = back.trim();

    await deck.save();

    return res
      .status(200)
      .json({ message: "Updated successfully", data: card });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deck = req.deck;

    const card = deck.cards.id(id);

    if (!card) return res.status(404).json({ message: "card not found" });

    card.deleteOne();
    await deck.save();

    return res.status(200).json({ message: "Successfuly deleted Card" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
