import React from 'react';

const ScrollTable = (props) => {
  return (
    <div className="scrollTable">
      {props.children}
    </div>
  )
}

export default ScrollTable;