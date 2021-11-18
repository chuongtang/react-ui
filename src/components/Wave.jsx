import React from 'react';

const Wave = (props) => {
  const { address, time, message } = props;

  return (

    <div className="wavecard" >
    
      <div>
        <p>Address: {address}</p>
        <p>Time: {time}</p>
        <p>Message: {message}</p>
      </div>
    </div>

  );
}

export default Wave;