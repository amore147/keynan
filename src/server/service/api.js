const API_BASE = "/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export async function fetchDecks() {
  const res = await fetch(`${API_BASE}/decks`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch the decks");

  return res.json();
}

export async function fetchDeckById(deckId) {
  const res = await fetch(`${API_BASE}/decks/${deckId}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch deck");

  return res.json();
}
    
export async function createDeck(deckData) {
  const res = await fetch(`${API_BASE}/decks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(deckData),
  });

  if (!res.ok) throw new Error("Failed to create a deck");

  return res.json();
}

export async function updateDeck(deckId, deckData) {
  const res = await fetch(`${API_BASE}/decks/${deckId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(deckData),
  });

  if (!res.ok) throw new Error("Failed to update the deck");

  return res.json();
}

export async function deleteDeck(deckId) {
  const res = await fetch(`${API_BASE}/decks/${deckId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Unable to delete the deck");

  return res.json();
}

export async function fetchCards(deckId) {
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Unable to fetch the cards");

  return res.json();
}

export async function AddCard(deckId, cardData) {
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  });

  if (!res.ok) throw new Error("Failed to add card");

  return res.json();
}

export async function updateCard(deckId, cardId, cardData) {
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(cardData),
  });

  if (!res.ok) throw new Error("Unable to update the card");

  return res.json();
}

export async function deleteCard(deckId, cardId) {
  const res = await fetch(`${API_BASE}/decks/${deckId}/cards/${cardId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Unable to delete the card");

  return res.json();
}
