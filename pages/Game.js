/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Die from '../Die';
import { nanoid } from 'nanoid';

function Game() {
    
    
    //Bonus Function1 //
        function threePairs(dice) {
  const encounteredDice = {};
  dice.forEach(die => {
    if (encounteredDice[die]) {
      encounteredDice[die]++;
    } else {
      encounteredDice[die] = 1;
    }
  });

  let numPairs = 0;
  for (const die in encounteredDice) {
    if (encounteredDice[die] === 2) {
      numPairs++;
    }
  }

  return numPairs === 3;
}

function bigMultiplier(dice) {
  const encounteredDice = {};
  dice.forEach((die) => {
    if (encounteredDice[die]) {
      encounteredDice[die]++;
    } else {
      encounteredDice[die] = 1;
    }
  });

  let currentScoreMultiplier = 1;
  let currentScoreToAdd = 0;

  for (const die in encounteredDice) {
    const count = encounteredDice[die];
    if (count === 3) {
      if (die === '1') {
        currentScoreToAdd += 1000;
      } else {
        currentScoreToAdd += parseInt(die, 10) * 100;
      }
    } else if (count === 4) {
      currentScoreMultiplier = 2;
      currentScoreToAdd += parseInt(die, 10) * 100 * currentScoreMultiplier;
    } else if (count === 5) {
      currentScoreMultiplier *= 2;
      currentScoreToAdd += parseInt(die, 10) * 100 * currentScoreMultiplier;
    } else if (count === 6) {
      currentScoreMultiplier *= 2;
      currentScoreToAdd += parseInt(die, 10) * 100 * currentScoreMultiplier;
    }
  }

  return currentScoreToAdd;
}
//Bonus Function 2//
function straightFlush(dice) {
  const encounteredDice = {};
  dice.forEach(die => {
    if (encounteredDice[die]) {
      encounteredDice[die]++;
    } else {
      encounteredDice[die] = 1;
    }
  })
  for (let i = 1; i <= 6; i++) {
    if (!encounteredDice[i]) {
      return false;
    }
  }

  return true;
}

//Bonus Function 3//
function isTriplet(heldDice) {
  const encounteredDice = {};
  heldDice.forEach(die => {
    if (encounteredDice[die.value]) {
      encounteredDice[die.value]++;
    } else {
      encounteredDice[die.value] = 1;
    }
  });

  for (const value in encounteredDice) {
    if (encounteredDice[value] >= 3) {
      return true;
    }
  }

  return false;
}

//BONUS FUNCTION 4

//
  const [dice, setDice] = useState([
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
    { id: nanoid(), value: 0, isHeld: false },
  ]);
  
  const diceValues = dice.map((die) => die.value);


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
  const [message, setMessage] = useState('')
  const [threeBigPairs, setThreeBigPairs] = useState(false)
  const [theStraightFlush, setTheStraightFlush] = useState(false)
  const [theTriplet, setTheTriplet] = useState(false)


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }
/////////////////////////////////////////////////////////////////////////////////////////////////

function bankPoints() {
  const heldDiceValues = dice.filter(die => die.isHeld).map(die => die.value);
    
    if (isTriplet(heldDiceValues)){
           const counts = {};
    heldDiceValues.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
    })
    for (const value in counts) {
    let scoreToAdd = 0;
    let messageToAdd = '';
    const count = counts[value]
   if (count >= 3) {
       setBusted(false)
  if (value === 1) {
    scoreToAdd += value * 1000 * (2 ** (count - 3));
  } else if (value === 2 || 3 || 4 || 5 || 6){
    scoreToAdd += value * 100 * (2 ** (count - 3));
    
  }
  messageToAdd = `Multiplier x${count}!`;
} 


setMessage(messageToAdd);
setTheTriplet(true);
setCurrentScore(currentScore + scoreToAdd)
    
    }


  
    }
    

    
   
   
   
   
   ///////////////////////////////////////////
   
   //////////////////////////////////////////// 
  if (straightFlush(heldDiceValues)) {
    setDice(oldDice => oldDice.map(die => (
      heldDiceValues.includes(die.value) ? {...die, value: 0} : die
    )));
    setTheStraightFlush(true);
    setCurrentScore(currentScore + 1000);
    setNewDiceBtnDisabled(false);
    return;
  }


    const bigScore = bigMultiplier(heldDiceValues);
if (bigScore > 0) {
    setDice(oldDice => oldDice.map(die => (
      heldDiceValues.includes(die.value) ? {...die, value: 0} : die
    )));
  setCurrentScore(currentScore + bigScore);
  setNewDiceBtnDisabled(false);
  
  /////////MAKE HELD DICE INVISIBLE
  return;
}
  if (threePairs(heldDiceValues)) {
    setDice(oldDice => oldDice.map(die => (
      heldDiceValues.includes(die.value) ? {...die, value: 0} : die
    )));
    setThreeBigPairs(true);
    setCurrentScore(currentScore + 500);
    setNewDiceBtnDisabled(false);
    return;
  } else {
    if (!busted) {
      setRollBtnDisabled(false);
    } else {
      setRollBtnDisabled(false);
      setRollBtnDisabled(true);
      setBankerinoBlock(true);
    }
    

    let ones = 0;
    let fives = 0;
    let newDice = [...dice];

    for (let i = 0; i < 6; i++) {
      if (newDice[i].isHeld && (newDice[i].value === 1 || newDice[i].value === 5)) {
        if (newDice[i].value === 1) {
          ones++;
        } else {
          fives++;
        }
        newDice[i].isHeld = false;
        newDice[i].value = 0;
      }
    }

    setDice(newDice);
    setCurrentScore((currentScore) + ones * 100 + fives * 50);
    
    if (ones === 0 && fives === 0) { 
      setBusted(true);
      setCurrentScore(0);
    } else {
      setBusted(false);
    }
    
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////
  
 


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const endTurn = () => {
        
        setBankedScore(currentScore+bankedScore)
        setCurrentScore(0)
        setThreeBigPairs(false)
        newSet()
       
        
    }
    const rollDice = () => {
  if (currentScore > 350) {
    setEndTurnBtnDisabled(false);
  } else {
    setEndTurnBtnDisabled(true);
  }
  setRollBtnDisabled(true);
  setThreeBigPairs(false)
  setTheTriplet(false)
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
      setMessage(<div><h1>YOU BUSTED!</h1></div>)
      return (
        message
      );
    }, 300);
  } else {
    setBusted(false);
  }
  setDice(newDice);
};
const resetGame = () => {
    setThreeBigPairs(false)
    setTheTriplet(false)
    setTheStraightFlush(false)
    setBankedScore(0)
    setCurrentScore(0)
    localStorage.clear()
    setBustCount(0)
    newSet()
}
  const newSet = () => {
      setThreeBigPairs(false)
      setTheStraightFlush(false)
      setRollBtnDisabled(true)
      setTheTriplet(false)
    
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
            <h1 className="gameh1">YOU BUSTED!</h1>
            : threeBigPairs ? 
            <h1 className="gameh1">Three Pairs! +500!</h1>
           : theStraightFlush ? 
           <h1 className = "gameh1">Straight Flush, +1000!</h1>
           :
            <h1 className="gameh1">BANKED: {currentScore}</h1>
            
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