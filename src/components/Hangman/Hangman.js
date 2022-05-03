import { useState } from 'react';
import { randomWord } from '../../service/words';
import './Hangman.css';
import img0 from '../../images/0.jpg';
import img1 from '../../images/1.jpg';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import img4 from '../../images/4.jpg';
import img5 from '../../images/5.jpg';
import img6 from '../../images/6.jpg';

export default function Hangman() {
  const [nWrong, setNWrong] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(randomWord);

  const maxWrong = 6;
  const images = [img0, img1, img2, img3, img4, img5, img6];

  const guessedWord = () => {
    return answer.split('').map(ltr => (guessed.has(ltr) ? ltr : '_'));
  };

  const handleGuess = e => {
    const ltr = e.target.value;

    setGuessed(s => new Set([...s, ltr]));
    setNWrong(s => {
      return s + (answer.includes(ltr) ? 0 : 1);
    });
  };

  const generateButtons = () => {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button value={ltr} onClick={handleGuess} disabled={guessed.has(ltr)} key={ltr}>
        {ltr}
      </button>
    ));
  };

  const restartGame = () => {
    setAnswer(randomWord);
    setNWrong(0);
    setGuessed(new Set());
  };

  const guessedInclude = () => {
    for (const ltr of answer) {
      if (!guessed.has(ltr)) return false;
    }

    return true;
  };

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      <div className="Hangman-wrapper">
        <img src={images[nWrong]} alt={`${nWrong}/${maxWrong} mistakes`} />
        <button className="Hangman-restart" onClick={restartGame}>
          Restart
        </button>
      </div>
      {guessedInclude() ? <p>Good job! You won with {nWrong} mistakes</p> : <p>Wrong guesses: {nWrong}</p>}

      {nWrong < maxWrong ? (
        <>
          <p className="Hangman-word">{guessedWord()}</p>
          <p className="Hangman-btns">{generateButtons()}</p>
        </>
      ) : (
        <>
          <p>You lose</p>
          <p className="Hangman-word">{answer}</p>
        </>
      )}
    </div>
  );
}
