import { useState } from "react"
import QuizElement from "./QuizElement";
// import data from "./data"

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [questions, setQuestions] = useState([])
  const [settings, setSettings] = useState({difficulty: "easy", count: "5"})
  const [userAnswers, setUserAnswers] = useState({})
  const [checkingResults, setCheckingResults] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  function changeSettings(e) {
    setSettings(prevSettings => ({
      ...prevSettings,
      [e.target.id]: e.target.value
    }))
  }

  async function getQuestions() {
    const api = "sQJlspIzYMh9WFxLJTFAWnfr43FFS0CfaTG3ekm8";
    const questionsCount = settings.count;
    const difficulty = settings.difficulty
    const category = "Code"
    const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${api}&limit=${questionsCount}&category=${category}&difficulty=${difficulty}`)
    const questions = await response.json()
    if (!response.ok) {
      console.error("failed to fetch quiz data")
      return
    }
    setQuestions(questions)
    // setQuestions(data)
  }

  async function startQuiz() {
    await getQuestions();
    setIsPlaying(true)
  }

  function restartQuiz() {
    setIsPlaying(false)
    setUserAnswers({})
    setCheckingResults(false)
    setCorrectAnswersCount(0)
  }

  // tbd
  function checkResults(e) {
    e.preventDefault()
    if (!checkingResults) {
      setCheckingResults(true)
      setCorrectAnswersCount(()=> {
        let correct = 0;
        for (const key in userAnswers) {
          if (JSON.stringify([...userAnswers[key].answer].sort()) === JSON.stringify([...userAnswers[key].correctAnswers].sort())) correct++
        }
        return correct
      })
    } else {
      restartQuiz()
    }
  }

  const quizElements = questions.map(question => <QuizElement data={question} key={question.id} userAnswers={userAnswers} setUserAnswers={setUserAnswers} checkingResults={checkingResults} />)

  return (
    <>
      { isPlaying && <div className="quiz-container">
        <form>
          {quizElements}
          {checkingResults && <div className="results">
            <span>{correctAnswersCount}/{settings.count} </span>correct answers
          </div>}
          <button onClick={checkResults}>{checkingResults ? "Restart" : "Check results"}</button>
        </form>
      </div> }
      { !isPlaying && <div className="start-container">
        <h1>Quiz Time!</h1>
        <div className="options">
          <label htmlFor="difficulty">Difficulty:</label>
          <select name="difficulty" id="difficulty" onChange={changeSettings}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <label htmlFor="count">Count:</label>
          <select name="count" id="count" onChange={changeSettings}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <button onClick={startQuiz}>Start Quiz</button>
      </div> }
    </>
  )
}

export default App
