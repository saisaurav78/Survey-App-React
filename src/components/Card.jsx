import React, { useState } from 'react';

const Card = ({
  questions,
  submittedRatings,
  submittedTexts,
  handleRatingSubmit,
  handleTextSubmit,
  handleSurveySubmit,
}) => {
  const [count, setCount] = useState(1);

  const question = questions[count - 1];
  const selectedRating = submittedRatings[question.id] || null;
  const textResponse = submittedTexts[question.id] || '';

  const ratingButtons = [];
  for (let i = 1; i <= question.scale; i++) {
    ratingButtons.push(
      <button
        className={`btn mx-1 ${selectedRating === i ? 'btn-success' : 'btn-outline-success'}`}
        onClick={() => handleRatingSubmit(question.id, i)}
        key={i}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <div className='card p-4 text-primary d-flex flex-column align-items-center w-100 w-md-50'>
        <h1 className='mb-4 text-center'>Customer Survey</h1>
        <h5 className='mb-3'>Question: {question.id}</h5>
        <h2 className='text-center mb-4'>{question.text}</h2>

        {question.type === 'text' ? (
          <div className='w-100 text-center'>
            <input
              type='text'
              className='form-control w-75 mb-3 m-auto'
              placeholder='Your answer'
              value={textResponse}
              onChange={(e) => handleTextSubmit(question.id, e.target.value)}
            />
          </div>
        ) : (
          <div className='d-flex justify-content-center mb-4 flex-wrap'>{ratingButtons}</div>
        )}

        <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
          <button
            disabled={count === 1}
            onClick={() => setCount((prev) => prev - 1)}
            className='btn btn-primary mb-2 mb-md-0'
          >
            Previous
          </button>
          {count === questions.length ? (
            <button onClick={handleSurveySubmit} className='btn btn-danger'>
              Submit Survey
            </button>
          ) : (
            <button onClick={() => setCount((prev) => prev + 1)} className='btn btn-danger'>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
