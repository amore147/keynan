import React from "react";
import {
  addModalAtom,
  browseModalAtom,
  cardStatsAtom,
  dataAtom,
} from "../store/keynanAtom";
import { useRecoilValue, useRecoilState } from "recoil";
import AddModal from "./AddModal";
import Home from "./Home";

const Navbar = () => {
  const data = useRecoilValue(dataAtom);
  const [count, setCount] = useRecoilState(cardStatsAtom("count"));
  const [mastered, setMastered] = useRecoilState(cardStatsAtom("mastered"));
  const [review, setReview] = useRecoilState(cardStatsAtom("review"));
  const [showModal, setShowModal] = useRecoilState(addModalAtom);
  const [browseModal, setbrowseModal] = useRecoilState(browseModalAtom);

  const total = data.cards.length;

  return (
    <nav>
      <div className="flex items-center justify-center gap-3">
        <button
          className="bg-[#FF7139] px-5 py-2 text-[#151515] cursor-pointer rounded-lg transition-colors duration-200 hover:bg-[#FF895B]"
          onClick={() => setShowModal(true)}
        >
          Add
        </button>
        <button
          className="rounded-lg border border-[#45403B] bg-[#292725] px-5 py-2 text-[#F1D7B8] transition-all duration-200 hover:border-[#FF7139] hover:bg-[#332A25] cursor-pointer focus:outline-none"
          onClick={() => {
            console.log("Browse button clicked! Setting modal to true.");
            setbrowseModal(true);
          }}
        >
          Browse
        </button>
        <button className="bg-[#FF7139] px-5 py-2 text-[#151515] cursor-pointer rounded-lg transition-colors duration-200 hover:bg-[#FF895B]">
          Stats
        </button>
      </div>
      <div className="mx-auto w-125 max-w-full flex items-center justify-between px-5 py-3 text-[#F1D7B8] mt-6 bg-[#151515] border border-[#45403B] rounded-lg ">
        <p className="z">
          Card {count}/{total}
        </p>
        <p className="whitespace-nowrap">Mastered: {mastered}</p>
        <p className="whitespace-nowrap">Review Needed: {review}</p>
      </div>

      {showModal && <AddModal onClose={() => setShowModal(false)} />}
      {browseModal && <Home onClose={() => setbrowseModal(false)} />}
    </nav>
  );
};

export default Navbar;