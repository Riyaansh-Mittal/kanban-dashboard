import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  transform: rotate(-90deg); // Rotate to start the progress from the top
`;

const Spinner = ({ percentage }) => {
  const radius = 20; 
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - percentage) / 100) * circumference;

  return (
    <Svg width="50" height="50">
      <circle
        cx="25"
        cy="25"
        r={radius}
        strokeWidth="5"
        fill="transparent"
        stroke="#ddd"
      />
      <circle
        cx="25"
        cy="25"
        r={radius}
        strokeWidth="5"
        fill="transparent"
        stroke="red"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Spinner;
