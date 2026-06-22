// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useState, type MouseEvent } from 'react'
import { fetchQuestions } from './API';
import { Difficulty } from './API';
import type { QuestionState } from './API';
import './App.css';
import { QuestionCard } from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {

  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM))
  console.log(questions);

  const startTrivia = async () => {
    console.log('start');
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!gameOver) {
      //User Answers
      const answer = e.currentTarget.value;

      //Check Answers against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1);
      }
      //save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };;

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }
  return (
    <>
      <GlobalStyle />
      {/* <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
         </div>
      </section> */}

      {/* <div className="app"> */}
      <Wrapper>
        <h1>React Quiz App</h1>
        {
          gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>Start</button>
          ) : null
        }

        {!gameOver ? <p className="score">Score : {score}</p> : null}
        {loading && <p>Loading Questions...</p>}


        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
        ) : null
        }

        {/* </div> */}
      </Wrapper>
    </>
  )
}

export default App
