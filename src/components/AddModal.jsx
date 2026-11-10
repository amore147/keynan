import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { addModalAtom, dataAtom } from "../store/keynanAtom";

const AddModal = ({ onClose }) => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useRecoilState(dataAtom);
  const setShowModal = useSetRecoilState(addModalAtom);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") setShowModal(false);
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [setShowModal]);

  function handleClick() {
    if (!front.trim() || !back.trim()) return;

    setData((prev) => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          question: front,
          answer: back,
          description: desc.trim() ? desc.trim() : null,
        },
      ],
    }));

    setFront("");
    setBack("");
    setDesc("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4 transition-opacity duration-300">
      <div className="w-full max-w-md rounded-2xl bg-[#24211F] p-8 text-black">
        <h2 className="mb-2 text-2xl font-bold  text-[#FFF3E8]">
          Add New Card
        </h2>
        <div className="flex flex-col mt-2">
          <h4 className="text-[#F1D7B8]">Front</h4>
          <input
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Enter your question..."
            className="text-[#FFF3E8] mt-1 mb-3 w-full h-12 px-3 py-2 rounded-lg bg-[#302B28] placeholder-[#A99B90] border border-[#51443A] focus:bg-[#51443A] focus:outline-none transtion-all duration-300"
          />

          <h4 className="text-[#F1D7B8]">Back</h4>
          <input
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Enter your answer"
            className="text-[#FFF3E8] mt-1 mb-3 w-full h-12 px-3 py-2 rounded-lg bg-[#302B28] placeholder-[#A99B90] border border-[#51443A] focus:bg-[#51443A] focus:outline-none transtion-all duration-300"
          />

          <h4 className="text-[#F1D7B8]">Description</h4>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter the description (Optional)"
            className="text-[#FFF3E8] mt-1 mb-3 w-full h-12 px-3 py-2 rounded-lg bg-[#302B28] placeholder-[#A99B90] border border-[#51443A] focus:bg-[#51443A] focus:outline-none transtion-all duration-300"
          />
        </div>

        <div className="w-full flex justify-between">
          <div className="mt-6 flex w-full gap-3">
            <button
              className="flex-1 rounded-lg bg-[#FF7139] px-6 py-3 font-semibold text-[#211710] transition-colors duration-200 hover:bg-[#E85D2A]  active:scale-[0.98]"
              onClick={handleClick}
            >
              + Add Card
            </button>

            <button
              className="flex-1 rounded-lg bg-[#393330] px-6 py-3 font-medium text-[#F1D7B8] transition-colors duration-200 hover:bg-[#51443A] active:scale-[0.98]"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
