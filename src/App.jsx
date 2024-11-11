import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import Welcome from './components/Welcome';
import Card from './components/Card';
import questions from './data/questions.json';

const App = () => {
  const [active, setActive] = useState(false);
  const [submittedRatings, setSubmittedRatings] = useState({});
  const [submittedTexts, setSubmittedTexts] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const [surveyId, setSurveyId] = useState(null); 

  const handleRatingSubmit = (questionId, rating) => {
    setSubmittedRatings((prevRatings) => ({
      ...prevRatings,
      [questionId]: rating,
    }));
  };

  const handleTextSubmit = (questionId, text) => {
    setSubmittedTexts((prevTexts) => ({
      ...prevTexts,
      [questionId]: text,
    }));
  };

  const handleSurveySubmit = () => {
    setIsSubmitted(true);
    setCountdown(3);
    console.log('Survey ratings:', submittedRatings);
    console.log('Survey text responses:', submittedTexts);
    const surveyData = {
      ratings: submittedRatings,
      texts: submittedTexts,
    };
    localStorage.setItem(surveyId, JSON.stringify(surveyData));
  };

  const handleStartSurvey = () => {
    const newSurveyId = uuidv4();
    setSurveyId(newSurveyId);
    localStorage.setItem('surveyId', newSurveyId);
    setActive(true);
    setSubmittedRatings({});
    setSubmittedTexts({});
    setIsSubmitted(false);
    setCountdown(3);
  };

  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setIsSubmitted(false);
        setActive(false);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isSubmitted]);

  return (
    <>
      {active ? (
        isSubmitted ? (
          <div className='container text-center'>
            <h1 className='text-primary'>Thank you for completing the survey!</h1>
            <p>Returning to home screen in {countdown} seconds...</p>
          </div>
        ) : (
          <Card
            questions={questions}
            submittedRatings={submittedRatings}
            submittedTexts={submittedTexts}
            handleRatingSubmit={handleRatingSubmit}
            handleTextSubmit={handleTextSubmit}
            handleSurveySubmit={handleSurveySubmit}
          />
        )
      ) : (
        <Welcome start={active} setStart={handleStartSurvey} />
      )}
    </>
  );
};

export default App;
