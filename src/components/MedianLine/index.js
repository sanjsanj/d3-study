import React from "react";
import * as d3 from "d3";

const MedianLine = ({
  bottomMargin,
  height,
  median,
  value,
  width,
  data,
  x,
  y,
}) => {
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, value)])
    .range([height - y - bottomMargin, 0]);
  const line = d3.line()([[0, 5], [width, 5]]);

  const medianValue = median || d3.median(data, value);

  const translate = `translate(${x}, ${yScale(medianValue)})`;
  const medianLabel = `Median Household: $${yScale.tickFormat()(median)}`;

  return (
    <g className="mean" transform={translate}>
      <text
        style={{ background: "purple" }}
        textAnchor="end"
        x={width - 5}
        y="0"
      >
        {medianLabel}
      </text>
      <path d={line} />
    </g>
  );
};

export default MedianLine;
