/* eslint-disable react/prop-types */
export default function QuizElement(props) {
  
  function selectAnswer(e, data) {
    props.setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [data.id]: { 
        answer: (()=> { 
          let prevArr = prevAnswers[data.id]?.answer 
          let answers = prevArr ? [...prevArr] : []
          if (e.target.checked) {
            answers.push(e.target.value)
          } else {
            answers = answers.filter(ans => ans !== e.target.value)
          }
          return answers
        })(),
        correctAnswers: (()=> { 
          let answers = []
          for (const key in data.correct_answers) {
            if ((/true/).test(data.correct_answers[key])) answers.push(key.slice(0, 8))
          }
          return answers
        })()},
      })
      )
  }

  function styles(key, inputId) {
    // dont show styles if not checking results
    if (!props.checkingResults) return

    const isValidAnswer = (/true/).test(data.correct_answers[`${key}_correct`])
    const isSelectedAnswer = document.getElementById(inputId).checked

    if (isSelectedAnswer && isValidAnswer) {
      return {
        // if option correct and selected - green
        color: "green",
        fontWeight: "bold"
      } 
    } else if (isValidAnswer) {
      return {
        // if option correct and not selected - yellow
        color: "yellow",
        fontWeight: "bold"
      }
    } else if (isSelectedAnswer) {
      return {
        // if option correct and not selected - yellow
        color: "red",
        fontWeight: "bold"
      }
    }
  }

  const data = props.data;
  const answers = Object.keys(data.answers).filter(key => data.answers[key]).map((key, index) => (
    <div className="item-answer" key={`${data.id}-${index}`}>
      <input id={`${data.id}-${index}`} type="checkbox" className="item-answer" name={`question-${data.id}`} value={key} onChange={e=> selectAnswer(e, data)} disabled={props.checkingResults} />
      <label htmlFor={`${data.id}-${index}`} style={styles(key, `${data.id}-${index}`)}>{data.answers[key]} </label>
    </div>
  ))
  return (
    <div className="item" >
      <h2 className="item-question">{ data.question }</h2>
      <div className="item-answers">
        {answers}
      </div>
    </div>
  )
}