import React, { useEffect, useState } from "react";
import { dataAtom, cardStatsAtom } from "../store/keynanAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const Card = () => {
  const data = useRecoilValue(dataAtom);
  const [isFlipped, setisFlipped] = useState(false);
  const [count, setCount] = useRecoilState(cardStatsAtom("count"));
  const [mastered, setMastered] = useRecoilState(cardStatsAtom("mastered"));
  const [review, setReview] = useRecoilState(cardStatsAtom("review"));
  const [finished, setFinished] = useState(false);

  function handleFlip() {
    if (finished) setisFlipped(false);
    else setisFlipped((prev) => !prev);
  }

  function handleCorrect() {
    if (finished || count > data.cards.length) return;

    setMastered((prev) => prev + 1);
    setisFlipped(false);

    if (count === data.cards.length) setFinished(true);
    else setCount((prev) => prev + 1);
  }

  function handleIncorrect() {
    if (finished || count > data.cards.length) return;

    setReview((prev) => prev + 1);
    setisFlipped(false);

    if (count === data.cards.length) setFinished(true);
    else setCount((prev) => prev + 1);
  }

  function handleReset() {
    setisFlipped(false);
    setCount(1);
    setReview(0);
    setMastered(0);
    setFinished(false);
  }

  function handleNext() {
    setCount((prev) => Math.min(prev + 1, data.cards.length));
  }

  const currentCard = data.cards[count - 1];
  const total = mastered + review;
  const calc =
    mastered + review === 0 ? 0 : Math.round((mastered / total) * 100);

  return (
    <>
      <div
        onClick={handleFlip}
        className="relative w-full max-w-125 h-55 rounded-xl bg-[#292725] border border-[#45403B] mt-4 transition-all duration-200  hover:border-[#FF7139]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* QUESTIONS HERE */}
        <div
          className={`absolute inset-0 flex h-full items-center justify-center text-center rounded-xl ${finished ? "invisible opacity-0" : "visible opacity-100"}`}
        >
          {!finished && !isFlipped && currentCard && (
            <h2 className="text-xl font-bold text-[#F1D7B8]">
              {currentCard.question}
            </h2>
          )}
        </div>

        {/* TRY AGAIN HERE */}
        <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-3 rounded-xl">
          {finished && (
            <>
              <h2 className="text-xl font-bold text-[#F1D7B8]">
                Deck Completed
              </h2>
              <h4 className="text-sm text-[#D7B9A5]">Score: {calc}%</h4>
              <button
                className="bg-[#C76543] hover:bg-[#E07838] text-[#FFF1E8] px-5 py-3 rounded-xl transition-colors duration-200"
                onClick={handleReset}
              >
                Try Again
              </button>
            </>
          )}
        </div>

        {/* ANSWER HERE */}
        <div
          className={`absolute inset-0 flex h-full items-center justify-center text-center rounded-xl ${isFlipped ? "visible opacity-100" : "invisible opacity-0"} ${finished ? "invisible opacity-0" : "visible opacity-100"}`}
          style={{ transform: "rotateY(180deg)" }}
        >
          {!finished && isFlipped && currentCard && (
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-[#FF895B]">
                {currentCard.answer}
              </h2>
              <h3 className="text-sm text-[#D7B9A5]">
                {currentCard.description}
              </h3>
            </div>
          )}
        </div>
      </div>

      {!finished && (
        <div className="flex flex-col">
          <div className="flex gap-3 mt-6">
            <button
              className="w-48 bg-[#A94F30] hover:bg-[#C76543] text-[#FFF1E8] px-5 py-3 rounded-xl"
              onClick={handleIncorrect}
            >
              Still Learning
            </button>
            <button
              className="w-48 bg-[#356B4B] hover:bg-[#44875E] text-[#F0F7F1] px-5 py-3 rounded-xl"
              onClick={handleCorrect}
            >
              Got It
            </button>
          </div>

          <button
            className="bg-[#45403B] hover:bg-[#5A5149] text-[#F1D7B8] mt-3 rounded-xl px-6 py-3"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
