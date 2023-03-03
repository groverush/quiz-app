import React from "react"
import Question from "./components/Question"
import Start from "./components/Start"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/style.css"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="quiz" element={<Question />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
