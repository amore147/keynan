import React from 'react'
import { useRecoilState } from 'recoil'
import { activeDeckAtom } from '../store/keynanAtom'

const ActiveDeck = () => {
  
  const [activeDeck , setActiveDeck] = useRecoilState(activeDeckAtom);



}

export default ActiveDeck