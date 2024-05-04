import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  transform: rotate(-90deg); // Rotate to start the progress from the top
`;

const Spinner = ({ percentage }) => {
  const radius = 20; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = ((100 - percentage) / 100) * circumference; // Calculate the offset based on percentage

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
        strokeLinecap="round" // Round the stroke caps for a nicer appearance
      />
    </Svg>
  );
};

export default Spinner;
