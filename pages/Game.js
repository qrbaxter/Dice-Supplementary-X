/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Die from '../Die';
import { nanoid } from 'nanoid';

function Game() {

  const [dice, setDice] = useState([
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
  ]);

  const [bankedScore, setBankedScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [diceSet, setDiceSet] = useState(false);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [newDiceBtnDisabled, setNewDiceBtnDisabled] = useState(false);
  const [rollBtnDisabled, setRollBtnDisabled] = useState(false)
  const [busted, setBusted] = useState(false);
  const [bankerinoBlock, setBankerinoBlock] = useState(false)
  const [endTurnBtnDisabled, setEndTurnBtnDisabled] = useState(true)
  const [bustCount, setBustCount]=useState(0)
  const [endGame, setEndGame]=useState(false)


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }
    
  const bankPoints = () => {
  if (!busted) {
    setRollBtnDisabled(false);
  } else {
    setRollBtnDisabled(false);
    setRollBtnDisabled(true);
    setBankerinoBlock(true)
  }

  let ones = 0;
  let twos = 0;
  let threes = 0;
  let fours = 0;
  let fives = 0;
  let sixes = 0;
  let bonus = 0;
  let newDice = [...dice];
 
  for (let i = 0; i < 6; i++) {
    if (newDice[i].isHeld && (newDice[i].value === 1 || newDice[i].value === 5)) {
      if (newDice[i].value === 1) {
        ones++;
      } else {
        fives++;
      }
      newDice[i].isHeld = false;
      newDice[i].value = 0
    } 
  }
 
  setDice(newDice);
  setCurrentScore(parseInt(currentScore) + ones * 100 + fives * 50);
  if (ones === 0 && fives === 0) {
   
      setBusted(true);
      setCurrentScore(0);
   
  } else {
    setBusted(false);
  }
};
    
    const endTurn = () => {
        
        setBankedScore(currentScore+bankedScore)
        setCurrentScore(0)
        newSet()
       
        
    }
    const rollDice = () => {
  if (currentScore > 350) {
    setEndTurnBtnDisabled(false);
  } else {
    setEndTurnBtnDisabled(true);
  }
  setRollBtnDisabled(true);
  let newDice;
  if (currentScore > 0) {
    newDice = dice.map((die) => {
      return die.value !==0
        ? { ...die, value: Math.floor(Math.random() * 6) + 1, isHeld: die.isHeld=false} 
        : { ...die };
    });
  } else {
    newDice = !dice.map((die) => {
      return die.value !==0
        ? { ...die, value: Math.floor(Math.random() * 6) + 1 }
        : { ...die };
    });
  }

  const onesAndFives = newDice.filter((die) => die.value === 1 || die.value === 5);
  if (onesAndFives.length === 0) {
    setTimeout(() => {
      setBusted(true);
      setRollBtnDisabled(true);
      setCurrentScore(0);
      return (
        <div>
          <h1 className="gameh1">YOU BUSTED!</h1>
        </div>
      );
    }, 300);
  } else {
    setBusted(false);
  }
  setDice(newDice);
};
const resetGame = () => {
    setBankedScore(0)
    setCurrentScore(0)
    localStorage.clear()
    setBustCount(0)
    newSet()
}
  const newSet = () => {
      
      setRollBtnDisabled(true);
    
    setNewDiceBtnDisabled(true);
    setBankerinoBlock(false)
  const newDice = [];
    for (let i = 0; i < 6; i++) {
      newDice.push({ id: nanoid(), value: Math.floor(Math.random() * 6) + 1, isHeld: false });
    }
    setDice(newDice)
    setDiceSet(true)
    setBusted(false);
  };

  useEffect(() => {
    if (busted) {
      localStorage.setItem('bankedScore', bankedScore);
      setRollBtnDisabled(true)
      setNewDiceBtnDisabled(false)
      setBankerinoBlock(true)
      setEndTurnBtnDisabled(true)
      setBustCount(bustCount+1)
    }
  }, [busted]);
  
  useEffect(()=>{
      if(currentScore < 350){
          setEndTurnBtnDisabled(true)
      }else {
          setEndTurnBtnDisabled(false)
      }
  }, [currentScore])

  return (
    <div>
        <div className="topSection">
            <div>
            <p className="bankedText">Score: {bankedScore}</p>
            <p className="bustedText">Busts: {bustCount}</p>
            </div>
            
            <div>
            {busted ?
            <>
            <h1 className="gameh1">YOU BUSTED!</h1>
            </> :
            <>
            <h1 className="gameh1">BANKED: {currentScore}</h1>
            </>
        }
            </div>
            
            <div>
            <button className="endTurnBtn" onClick={endTurn} disabled={endTurnBtnDisabled}>End Turn</button>
            <button className="resetBtn" onClick={resetGame}>Reset Game</button>
            </div>
            
        </div>
      
<div>
      <div className="dice-container">
        {busted ? null :
          dice.map((die) => (
            die.value !== 0 && // Add this line to only render dice that haven't been banked
            <Die
              key={die.id}
              id={die.id}
              value={die.value}
              isHeld={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />
          ))}
      </div>
      <div className="buttons1">
  {diceSet && (
    <button className="rollBtn" onClick={rollDice} disabled={rollBtnDisabled}>
      Roll Dice
    </button>
  )}
  <button className="newDiceBtn" onClick={newSet} disabled={newDiceBtnDisabled}>
    New Dice
  </button>
  <button className="bankBtn" onClick={bankPoints} disabled={bankerinoBlock}>
    Bank Points
  </button>
</div>
      </div>
     </div>
  );
}

export default Game;


