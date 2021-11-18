import React from 'react';

const Wave = (props) => {
  const { address, time, message, id } = props;
  // const { name, email, id } = props;
  return (

    <div className="wavecard" >
      <h1>{id}</h1>
      <div key={id}>
        <p>Address: {address}</p>
        <p>Time: {time}</p>
        <p>Message: {message}</p>
      </div>
    </div>

  );
}

export default Wave;