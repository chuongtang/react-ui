import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import '../App.css';

const TypeTexts = () => {

  return (
    <h3>  
      <span className="btn btn-lg">
        <Typewriter
          loop
          cursor
          cursorStyle='🖋'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
          words={['...Blockchain follower', 'n... Avid learner', '...Web3 explorer']}  
        />
      </span>
    </h3>
  )
};
export default TypeTexts