import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center; // Align the spinner and text vertically
`;

const Svg = styled.svg`
  transform: rotate(-15deg); // Rotate to start the first segment at the top
  margin-right: 3px; // Adds space between the spinner and the text
`;

const Spinner = ({ value }) => {
  const size = 20; // SVG size
  const strokeWidth = 1.5;
  const totalSegments = 12;
  const activeSegments = Math.floor(value);
  const fraction = value - activeSegments;

  // Color thresholds
  const getColor = (value) => {
    if (value <= 3) return "yellow";
    if (value <= 5.5) return "orange";
    if (value <= 8) return "red";
    return "darkred";
  };

  // Function to calculate line positions for circle segments
  const calculatePosition = (index, total) => {
    const angle = (2 * Math.PI) / total; // Angle per segment
    const cx = size / 2;
    const cy = size / 2;
    const innerRadius = size / 2 - 4; // Inner radius of the circle where strips start
    const outerRadius = size / 2 - 2; // Outer radius of the circle where strips end
    const x1 = cx + innerRadius * Math.sin(angle * index);
    const y1 = cy - innerRadius * Math.cos(angle * index);
    const x2 = cx + outerRadius * Math.sin(angle * index);
    const y2 = cy - outerRadius * Math.cos(angle * index);

    return { x1, y1, x2, y2 };
  };

  return (
    <Container>
      <Svg width={size} height={size}>
        {Array.from({ length: totalSegments }, (_, i) => {
          const { x1, y1, x2, y2 } = calculatePosition(i, totalSegments);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i < activeSegments || (i === activeSegments && fraction > 0) ? getColor(value) : "#ddd"}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          );
        })}
      </Svg>
      <span style={{ fontSize: '16px', fontWeight: '600'}}>{value.toFixed(1)}</span>
    </Container>
  );
};

export default Spinner;
