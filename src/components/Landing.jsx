import React, { useState } from "react";
import { features } from "../helper/landingFeatures";
import Card from "./Card";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newDeckAtom } from "../store/keynanAtom";
import NewDeck from "./NewDeck";

const Landing = () => {
  const [progress, setProgress] = useState(3);
  const [showNewDeck, setShowNewDeck] = useRecoilState(newDeckAtom);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-[#F5F5F5] font-poppins overflow-x-hidden">
      <nav className="flex items-center justify-between px-4 py-5 sm:px-8 lg:px-12">
        <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
          keynan.
        </h2>
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            className="text-xs font-medium text-[#888888] transition-colors hover:text-white sm:text-base"
            onClick={() => setShowModal(true)}
          >
            Explore Decks
          </button>
          <button
            className="rounded-full bg-[#f5f5f5] px-3.5 py-2 text-xs font-medium text-black transition-colors hover:bg-[#D4D4D8] sm:px-6 sm:py-2.5 sm:text-base"
            onClick={() => setShowNewDeck(true)}
          >
            Create a Deck
          </button>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 text-center">
        <p className="text-xs sm:text-base font-medium mb-4 sm:mb-5 text-[#888888] tracking-wider uppercase">
          A better way to remember
        </p>
        <h1 className="text-4xl sm:text-7xl md:text-[80px] font-bold tracking-[-0.04em] leading-[1.1] sm:leading-[1.08]">
          Learn it once.
          <br />
          <span className="block mt-3 sm:mt-4 text-[#858589]">
            Actually <em>Remember it.</em>
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-[#888888] text-sm sm:text-xl max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2">
          Turn what you’re studying into flashcards, test yourself from memory,
          and see what’s sticking.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center mt-8 sm:mt-10 gap-3 sm:gap-6 px-6 max-w-xs sm:max-w-none mx-auto">
        <button className="w-full sm:w-auto rounded-full bg-[#f5f5f5] px-8 py-3.5 text-base sm:text-lg font-medium text-black transition-colors hover:bg-[#D4D4D8]">
          Create a Deck
        </button>
        <button className="w-full sm:w-auto rounded-full text-base sm:text-lg font-medium border border-[#333333] px-8 py-3.5 text-[#888888] transition-all hover:text-white">
          Explore Decks
        </button>
      </div>

      <Card />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-36 pb-20">
        <h2 className="text-3xl sm:text-6xl font-semibold tracking-[-0.055em] max-w-2xl leading-tight">
          Everything you need to learn <br />
          better.
        </h2>
        <p className="text-[#888888] text-sm sm:text-lg mt-3 sm:mt-4">
          Simple tools. Active recall. Real progress.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10 sm:mt-14">
          {features &&
            features.map((feature) => (
              <div
                key={feature.number}
                className="border-t border-[#242424] pt-5 sm:pt-6"
              >
                <p className="text-[#858585] text-xs sm:text-sm font-medium mb-2 sm:mb-3 tracking-widest">
                  {feature.number}
                </p>

                <h3 className="text-base sm:text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-[#858585] text-xs sm:text-base leading-relaxed mt-2 sm:mt-3">
                  {feature.description}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
        <div className="border border-[#252525] bg-[#0B0B0B] py-16 sm:py-20 px-5 text-center rounded-[20px]">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.055em]">
            Start with a deck
          </h2>
          <p className="text-[#888888] text-sm max-w-md mx-auto mt-3 leading-relaxed">
            Group what you're learning by subject, topic, or exam, all in one
            place.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-7 rounded-full bg-[#F5F5F5] text-black px-5 py-2.5 text-xs font-semibold hover:bg-[#D4D4D8] transition-colors"
          >
            Make your first deck
          </button>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 sm:mt-24 pb-8">
        <div className="border-t border-[#1D1D1D] pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="text-[11px] font-semibold text-[#F5F5F5]">
            keynan
          </span>
          <p className="text-[10px] text-[#858585]">
            Learn something. Keep it. Built for curious minds.
          </p>
        </div>
      </footer>

      {showNewDeck && <NewDeck />}
    </div>
  );
};

export default Landing;
