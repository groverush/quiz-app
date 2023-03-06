import React, { useState, useEffect } from "react"
import { decode } from "html-entities"
const API_URI = `https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple`
import RadioInputs from "../components/RadioInputs"
import "../styles/question.css"
const addInfo = (array) => {
  const quizArray = array.map((question, index) => ({
    ...question,
    id: index,
    options: question.incorrect_answers
  }))
  quizArray.forEach((question) => {
    question.options.splice(
      Math.floor(Math.random() * question.options.length),
      0,
      question.correct_answer
    )
  })
  return quizArray
}

const Question = () => {
  const [quiz, setQuiz] = useState([])
  const [selectAnswer, setSelectAnswer] = useState(
    Array(quiz.length).fill(null)
  )
  const [score, setScore] = useState()
  const [showAnswers, setShowAnswers] = useState(false)
  function getDataApi() {
    fetch(API_URI)
      .then((res) => res.json())
      .then((data) => setQuiz(addInfo(data.results)))
  }

  function checkAnswers(userAnswer, correctAnswer, i) {
    const newSelection = selectAnswer.slice()
    if (userAnswer === correctAnswer) {
      newSelection[i] = true
    } else {
      newSelection[i] = false
    }
    setSelectAnswer(newSelection)
  }

  function handleSubmit(event, array) {
    event.preventDefault()
    const correctAnswers = array.filter((correct) => correct)
    setScore(correctAnswers.length)
    setShowAnswers(true)
  }

  function playAgain() {
    setSelectAnswer([])
    setQuiz([])
    setScore(null)
    setShowAnswers(false)
    getDataApi()
  }
  useEffect(() => {
    getDataApi()
  }, [])
  return (
    <div className="question-page">
      <form
        className="question-form"
        onSubmit={(event) => {
          handleSubmit(event, selectAnswer)
        }}
      >
        {quiz.map((question) => (
          <fieldset key={question.id} className="question-field">
            <legend className="question-legend">
              {decode(question.question)}
            </legend>

            <div className="answers">
              <RadioInputs
                checkAnswers={checkAnswers}
                question={question}
                showAnswers={showAnswers}
              />
            </div>
          </fieldset>
        ))}
        {score || score === 0 ? (
          <div className="quiz-score">
            <p>{`You scored ${score}/${quiz.length} correct answers`}</p>
            <button
              type="button"
              onClick={playAgain}
              className="play-again-btn"
            >
              Play again
            </button>
          </div>
        ) : (
          <button type="submit" className="check-answers-btn">
            Check answers
          </button>
        )}
      </form>
    </div>
  )
}

export default Question
