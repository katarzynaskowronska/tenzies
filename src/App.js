import React from 'react';
import './App.css';
import Die from './components/Die.js'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

function App() {

  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  }, [dice])

  function allNewDice(){
    const diceArray = []
    for(let i = 0; i < 10; i++){
      diceArray[i] = {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      }
    }
    return diceArray
  }

  const diceElements = dice.map(die => (
    <Die 
      value={die.value} 
      isHeld={die.isHeld} 
      key={die.id}
      holdDice={() => holdDice(die.id)}  
    />))

  function roll(){
    if(tenzies){
      setDice(allNewDice())
      setTenzies(false)
    }
    else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          {...die, value: Math.ceil(Math.random() * 6)}
      }))
    }
  }

  function holdDice(id){
    setDice(prevDie => prevDie.map(prevDice => {
      return prevDice.id === id
        ? { ...prevDice, isHeld: !prevDice.isHeld }
        : prevDice
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice--container'>
        {diceElements}
      </div>
      <button className='roll--button' onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
