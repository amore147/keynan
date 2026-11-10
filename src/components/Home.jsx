import React, { useEffect } from "react";
import { fetchDecks } from "../server/service/api";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  decksAtom,
  checkfetchDeckAtom,
  browseModalAtom,
  activeDeckAtom,
} from "../store/keynanAtom";
import { getRelativeTimeString } from "../helper/relativeTime";

const Home = () => {
  const [decks, setDecks] = useRecoilState(decksAtom);
  const [browseModal, setbrowseModal] = useRecoilState(browseModalAtom);
  const setCheckFetch = useSetRecoilState(checkfetchDeckAtom);
  const setActiveDeck = useSetRecoilState(activeDeckAtom);
  const totDecks = Array.isArray(decks) ? decks.length : 0;

  useEffect(() => {
    async function loadDecks() {
      try {
        const response = await fetchDecks();
        setDecks(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch the decks", err);
      }
    }

    loadDecks();
  }, [setDecks]);

  useEffect(() => {
    function handleDown(e) {
      if (e.key === "Escape") setbrowseModal(false);
    }

    window.addEventListener("keydown", handleDown);

    return () => {
      window.removeEventListener("keydown", handleDown);
    };
  }, [setbrowseModal]);

  function fetchDeck(deckId) {
    setbrowseModal(false);
    setCheckFetch(false);
    setActiveDeck(deckId);
  }

  if (!browseModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 transition-opacity duration-300"
      onClick={() => setbrowseModal(false)}
    >
      <div
        className="w-full max-w-3xl max-h-[85h] overflow-y-auto rounded-2xl bg-[#171717] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#FFF3E8]">keynan.</h2>
          <p className="font-poppins text-[#A99B90]">TOTAL DECKS: {totDecks}</p>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {decks?.length > 0 ? (
            decks.map((deck) => {
              const deckId = deck._id || deck.id;
              const totCard = deck.cards ? deck.cards.length : 0;

              return (
                <div
                  key={deckId}
                  className="w-full rounded-xl bg-[#24211F] p-5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-[#FFF3E8] text-xl font-poppins font-bold mt-2">
                    {deck.title}
                  </h2>
                  <p className="text-[#F1D7B8] text-md font-poppins font-light mt-2">
                    {deck.description || "No description provided"}
                  </p>

                  <div className="flex justify-between items-center text-[#A99B90] text-md font-poppins font-light mt-1">
                    <p>
                      Total Cards: {totCard} · Updated{" "}
                      {getRelativeTimeString(deck.updatedAt)}
                    </p>
                    <button
                      onClick={() => fetchDeck(deckId)}
                      className="cursor-pointer "
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="w-full max-w-md rounded-2xl flex items-center justify-center text-xl font-bold bg-[#171717] p-8 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <p>No decks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
