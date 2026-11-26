import React from "react";
import { useRecoilValue } from "recoil";
import { dataAtom } from "../store/keynanAtom";

const BrowseModal = ({ onClose }) => {
  
    const data = useRecoilValue(dataAtom);

    return (
        <div>
            {data && data.map()}
        </div>
    )
};

export default BrowseModal;
