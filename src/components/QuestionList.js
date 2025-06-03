import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion}) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    }).then(() => onDeleteQuestion(id));
  }

  function handleChangeCorrectAnswer(id, newIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex: parseInt(newIndex) })
    })
      .then(res => res.json())
      .then(updatedQuestion => onUpdateQuestion(updatedQuestion));
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questions.map(question => (
          <li key={question.id}>
            <strong>{question.prompt}</strong>
            <ul>
              {question.answers.map((answer, idx) => (
                <li key={idx}>
                  {answer} {idx === question.correctIndex && '(✔️ correct)'}
                </li>
              ))}
            </ul>
            <label>
              Change Correct Answer:
              <select
                value={question.correctIndex}
                onChange={e =>
                  handleChangeCorrectAnswer(question.id, e.target.value)
                }
              >
                {question.answers.map((_, idx) => (
                  <option key={idx} value={idx}>
                    {idx}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
