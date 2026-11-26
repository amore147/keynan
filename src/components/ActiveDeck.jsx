import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { activeDeckAtom, cardsAtom } from "../store/keynanAtom";
import { fetchCards } from "../server/service/api";

const ActiveDeck = () => {
  const [activeDeck, setActiveDeck] = useRecoilState(activeDeckAtom);
  const [cards, setCards] = useRecoilState(cardsAtom);
  const totCards = Array.isArray(cards) ? cards.length : 0;z

  useEffect(() => {
    async function fetchAllCards() {
      try {
        let response;
        if (activeDeck) {
          response = await fetchCards(activeDeck);
          setCards(Array.isArray(response?.data) ? response.data : []);
        } else return;
      } catch (err) {
        console.log("Failed to fetch cards", err);
      }
    }
    fetchAllCards();
  }, [setCards]);

  return(
    <div>

    </div>
  )
};

export default ActiveDeck;
