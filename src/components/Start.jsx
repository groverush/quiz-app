import React from "react"
import { Link } from "react-router-dom"
function Start() {
  return (
    <div className="start-page">
      <h1 className="title-start">Quizzical</h1>
      <p>This quizz is about mithology</p>
      <Link to={"/quiz"} className="link-start">
        Start quiz
      </Link>
    </div>
  )
}

export default Start
