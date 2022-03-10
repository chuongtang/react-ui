import React from 'react';
import '../App.css'

 const BGsvg = () => {
  return (
    <div>
      <svg viewBox="0 0 100 100">
    <path className="flight" d="M 0 100 C 35 92 49 76 50 50" />
    <path
      className="trail"
      d="M 50 50 C 41 23 26 23 1 41"
      style={{stroke: "yellowgreen"}}
    />
    <path
      className="trail"
      d="M 50 50 C 30 43 14 51 0 100"
      style={{stroke: "turquoise"}}
    />
    <path
      className="trail"
      d="M 50 50 C 84 46 96 63 100 85"
      style={{stroke: "goldenrod"}}
    />
    <path
      className="trail"
      d="M 50 50 C 71 31 95 43 100 63"
      style={{stroke: "mediumorchid"}}
    />
    <path
      className="trail"
      d="M 50 50 C 61 -6 76 3 73 100"
      style={{stroke: "firebrick"}}
    />
    <circle className="explosion" cx="50" cy="50" r="20" />
  </svg>
  </div>
  )
}
export default BGsvg