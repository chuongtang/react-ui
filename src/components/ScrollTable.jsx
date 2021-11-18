import React from 'react';

const ScrollTable = (props) => {
  return (
    <div style={{ overflowY: 'scroll', border: '3px solid black', height: '300px' }}>
      {props.children}
    </div>
  )
}

export default ScrollTable;