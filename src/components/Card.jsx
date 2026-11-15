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
      <div className="w-[92%] max-w-2xl mx-auto mt-12 sm:mt-16">
        <div className="flex justify-between text-sm sm:text-base text-[#858585] font-medium mb-4">
          <span>Flashcards</span>
          <span className="text-[#F5F5F5]">
            {count}{" "}
            <span className="text-[#666666]">of {data.cards.length}</span>
          </span>
        </div>

        <div className="w-full h-1.5 bg-[#292929] rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-[#F5F5F5] rounded-full transition-all duration-300"
            style={{
              width: `${(count / data.cards.length) * 100}%`,
            }}
          />
        </div>

        <div
          onClick={handleFlip}
          className="relative w-full max-w-2xl h-64 sm:h-80 rounded-[24px] bg-[#0B0B0B] border border-[#292929] transition-all duration-300 hover:border-[#444444] cursor-pointer"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div
            className={`absolute inset-0 flex h-full items-center justify-center text-center rounded-[24px] px-6 sm:px-12 ${
              finished ? "invisible opacity-0" : "visible opacity-100"
            }`}
          >
            {!finished && !isFlipped && currentCard && (
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#666666] mb-7">
                  Question {count}
                </span>
                <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5] leading-relaxed">
                  {currentCard.question}
                </h2>
                <p className="absolute bottom-6 text-xs text-[#666666]">
                  Click anywhere to reveal answer
                </p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-4 rounded-[24px]">
            {finished && (
              <>
                <span className="text-xs uppercase tracking-[0.2em] text-[#888888]">
                  Session completed
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F5F5F5]">
                  {calc}%
                </h2>
                <h4 className="text-sm text-[#888888]">Your recall accuracy</h4>
                <div className="flex gap-6 text-sm text-[#858585]">
                  <span>
                    Mastered: <span className="text-white">{mastered}</span>
                  </span>
                  <span>
                    Review: <span className="text-white">{review}</span>
                  </span>
                </div>
                <button
                  className="bg-[#F5F5F5] hover:bg-[#D4D4D8] text-black px-7 py-3 rounded-full text-sm font-medium transition-colors duration-200"
                  onClick={handleReset}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
          <div
            className={`absolute inset-0 flex h-full items-center justify-center text-center rounded-[24px] px-6 sm:px-12 ${
              isFlipped ? "visible opacity-100" : "invisible opacity-0"
            } ${finished ? "invisible opacity-0" : "visible opacity-100"}`}
            style={{ transform: "rotateY(180deg)" }}
          >
            {!finished && isFlipped && currentCard && (
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-[0.2em] text-[#666666] mb-7">
                  Answer
                </span>
                <h2 className="text-xl sm:text-3xl font-semibold text-[#F5F5F5] leading-relaxed">
                  {currentCard.answer}
                </h2>
                <h3 className="text-sm sm:text-base text-[#888888] mt-5 leading-relaxed">
                  {currentCard.description}
                </h3>
              </div>
            )}
          </div>
        </div>

        {!finished && (
          <div className="flex flex-col mt-7">
            <p className="text-center text-xs text-[#666666] mb-4">
              How well did you remember?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="border border-[#333333] bg-[#111111] hover:bg-[#222222] text-[#AAAAAA] hover:text-white px-5 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
                onClick={handleIncorrect}
              >
                Still Learning
              </button>
              <button
                className="bg-[#F5F5F5] hover:bg-[#D4D4D8] text-black px-5 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
                onClick={handleCorrect}
              >
                Got It
              </button>
            </div>

            <button
              className="text-[#666666] hover:text-white mt-5 text-xs transition-colors duration-200"
              onClick={handleReset}
            >
              Reset session
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
