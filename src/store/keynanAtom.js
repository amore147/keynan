import { atom, atomFamily } from "recoil";
import { userData } from "../Data";

export const cardStatsAtom = atomFamily({
  key: "cardStatsAom",
  default: (type) => {
    const defaults = {
      count: 1,
      mastered: 0,
      review: 0,
    };

    return defaults[type];
  },
});

export const addModalAtom = atom({
  key: "addModalAtom",
  default: false,
});

export const browseModalAtom = atom({
  key: "browseModalAtom",
  default: false,
});

export const dataAtom = atom({
  key: "dataAtom",
  default: userData,
});

export const decksAtom = atom({
  key: "decksAtom",
  default: null,
});

export const checkfetchDeckAtom = atom({
  key: "checkfetchDeckAtom",
  default : false
})

export const activeDeckAtom = atom({
  key: "activeDeckAtom",
  default: null
})

