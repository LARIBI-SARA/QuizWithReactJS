import React from 'react';
import Quiz from './Quiz';
import {jsQuizz} from './constants' 
function App() {
  console.log(jsQuizz.questions)
  return (
    <div>
      <Quiz questions={jsQuizz.questions}/> 
      {/*passing the array of questions*/}
    </div>
  );
}

export default App;