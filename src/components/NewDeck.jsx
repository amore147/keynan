import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { newDeckAtom } from "../store/keynanAtom";
import { useEscape } from "../hooks/useEscape";
import { createDeck } from "../server/service/api";

const NewDeck = () => {
  const [showNewDeck, setShowNewDeck] = useRecoilState(newDeckAtom);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEscape(() => setShowNewDeck(false));

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const removeCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);

    const updatedErrors = { ...errors };
    delete updatedErrors[index];
    setErrors(updatedErrors);
  };

  const handleUpdateCard = (field, value, index) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);

    if (errors[index]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[index];
      setErrors(updatedErrors);
    }
  };

  const handleAddDeck = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!title.trim()) {
      setErrorMessage("Please enter a deck title");
      return;
    }

    cards.forEach((card, index) => {
      if (!card.question.trim()) {
        newErrors[index] = {
          field: "question",
          value: "Add a question to save this card",
        };
      }
      if (!card.answer.trim()) {
        newErrors[index] = {
          field: "answer",
          value: "Add a answer to save this card",
        };
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrorMessage("");

    try {
      const deckData = { title, description, cards };
      await createDeck(deckData);
      setShowNewDeck(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-3 sm:p-4 transition-opacity duration-300"
      onClick={() => setShowNewDeck(false)}
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl bg-[#0A0A0A] p-4 sm:p-8 border border-[#222222]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold tracking-tight sm:text-2xl text-[#F5F5F5]">
            keynan.
          </h3>
          <button
            type="button"
            className="outline-none py-2 px-3 sm:p-4 text-xs sm:text-sm text-[#858585] hover:text-white cursor-pointer"
            onClick={() => setShowNewDeck(false)}
          >
            Cancel
          </button>
        </div>
        <div className="flex flex-col text-left mt-4 sm:mt-6">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            New Deck
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1.5 sm:mt-2">
            Name it, add a few cards, and start practicing.
          </p>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm text-left">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAddDeck}>
          <div className="flex flex-col text-left mt-5 sm:mt-6 gap-4 sm:gap-5">
            <div className="flex flex-col">
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-medium">
                Title
              </p>
              <input
                className="bg-[#080808] border border-[#303030] rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 mt-1.5 sm:mt-2 text-sm sm:text-base text-[#F5F5F5] placeholder-[#555] outline-none focus:border-[#525252]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. JavaScript Basics"
              />
            </div>

            <div className="flex flex-col">
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-medium">
                Description · optional
              </p>
              <textarea
                className="w-full h-24 sm:h-32 resize-none overflow-hidden bg-[#080808] border border-[#303030] rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 mt-1.5 sm:mt-2 text-sm sm:text-base text-[#F5F5F5] placeholder-[#555] outline-none focus:border-[#525252]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this deck about?"
              />
            </div>
          </div>

          <div className="text-left">
            <div className="flex items-center justify-between mt-4 sm:mt-5 mb-2">
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-medium">
                Cards
              </p>
              {cards.length > 0 && (
                <span className="text-xs text-[#737373]">
                  {cards.length} {cards.length === 1 ? "card" : "cards"}
                </span>
              )}
            </div>

            {cards.length === 0 ? (
              <div className="w-full border border-[#383838] rounded-lg py-8 sm:py-12 px-4">
                <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 mx-auto text-center">
                  <h3 className="text-base sm:text-lg tracking-tight text-[#F5F5F5] font-semibold">
                    No Cards yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-medium">
                    Each card has a question and an answer.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddCard}
                    className="border border-[#383838] px-4 py-2 sm:px-5 rounded-3xl mt-2 text-[#F5F5F5] text-xs sm:text-sm hover:border-[#555] transition-colors cursor-pointer"
                  >
                    Add a card
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="w-full border border-[#383838] rounded-lg p-4 sm:p-5 bg-[#080808]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#737373] tracking-wider">
                        Card {index + 1}
                      </span>
                      {cards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCard(index)}
                          className="text-xs font-medium text-[#737373] hover:text-red-400 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row mt-3 gap-3">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-[#A1A1AA] font-medium">
                          Question
                        </p>
                        <input
                          className={`w-full bg-[#080808] rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 mt-1.5 sm:mt-2 text-sm sm:text-base text-[#F5F5F5] placeholder-[#555] outline-none transition-colors ${
                            errors[index]?.field === "question"
                              ? "border border-red-500 focus:border-red-500"
                              : "border border-[#303030] focus:border-[#525252]"
                          }`}
                          value={card.question}
                          onChange={(e) =>
                            handleUpdateCard("question", e.target.value, index)
                          }
                        />
                        {errors[index]?.field === "question" && (
                          <p className="text-xs text-red-500 mt-1.5">
                            {errors[index]?.value}
                          </p>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-[#A1A1AA] font-medium">
                          Answer
                        </p>
                        <input
                          className={`w-full bg-[#080808] rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 mt-1.5 sm:mt-2 text-sm sm:text-base text-[#F5F5F5] placeholder-[#555] outline-none transition-colors ${
                            errors[index]?.field === "answer"
                              ? "border border-red-500 focus:border-red-500"
                              : "border border-[#303030] focus:border-[#525252]"
                          }`}
                          placeholder="Answer here..."
                          value={card.answer}
                          onChange={(e) =>
                            handleUpdateCard("answer", e.target.value, index)
                          }
                        />
                        {errors[index]?.field === "answer" && (
                          <p className="text-xs text-red-500 mt-1.5">
                            {errors[index]?.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCard}
                  className="w-full border border-dashed border-[#383838] py-2.5 sm:py-3 rounded-xl text-[#A1A1AA] text-xs sm:text-sm hover:text-white hover:border-[#555] transition-colors cursor-pointer"
                >
                  + Add card
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-4 mt-5 sm:mt-6">
            <button
              type="button"
              className="w-full sm:w-auto border border-[#383838] px-5 py-2.5 sm:py-2 rounded-3xl text-[#F5F5F5] text-xs sm:text-sm hover:border-[#555] transition-colors cursor-pointer"
              onClick={() => setShowNewDeck(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto border border-[#383838] px-5 py-2.5 sm:py-2 rounded-3xl bg-[#F5F5F5] text-black text-xs sm:text-sm hover:border-[#555] transition-colors cursor-pointer"
            >
              Create a deck
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDeck;
