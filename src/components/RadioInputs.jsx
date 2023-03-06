import React from "react"
import { decode } from "html-entities"
const RadioInputs = ({ question, showAnswers, checkAnswers }) => {
  const disabled = showAnswers ? true : false
  return (
    <>
      {question.options.map((answer, index) => (
        <label className={`answer-label`} key={index}>
          <input
            className={`${
              showAnswers && answer === question.correct_answer
                ? "correct"
                : showAnswers &&
                  !(answer === question.correct_answer) &&
                  "wrong"
            } ${showAnswers && "disabled"}`}
            type="radio"
            id={`${question.id}${answer}`}
            name={question.id}
            value={answer}
            onChange={(e) => {
              checkAnswers(e.target.value, question.correct_answer, question.id)
            }}
            required
            disabled={disabled}
          />
          {answer}
        </label>
      ))}
    </>
  )
}

export default RadioInputs
