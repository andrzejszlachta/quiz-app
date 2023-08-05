import { useState } from "react"

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <>
      { isPlaying && <div className="quiz-container">
        quiz here
      </div> }
      { !isPlaying && <div className="start-container">
        <h1>Quiz Time!</h1>
        <button onClick={()=> setIsPlaying(true)}>Start Quiz</button>
      </div> }
    </>
  )
}

export default App
