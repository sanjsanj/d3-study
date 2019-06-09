import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";

const BottomAxis = ({ scale, x, y }) => {
  const ref = useD3(anchor => {
    const axis = d3
      .axisBottom()
      .scale(scale)
      .tickFormat(d => `${d}`);

    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

const LeftAxis = ({ scale, x, y }) => {
  const ref = useD3(anchor => {
    const axis = d3
      .axisLeft()
      .scale(scale)
      .tickFormat(d => `${d}%`);

    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

export default function ResponsiveChart({ data, width, height }) {
  const margin = { left: 40, bottom: 40 };

  const xScale = d3
    .scalePoint()
    .domain(data.map(d => d.year))
    .range([margin.left, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.share)])
    .range([height, 0]);

  const line = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.share))
    .curve(d3.curveMonotoneX);

  return (
    <>
      <g>
        <path d={line(data)} fill="none" stroke="#333" />
      </g>

      <BottomAxis scale={xScale} x={0} y={height - margin.bottom} />
      <LeftAxis scale={yScale} x={margin.left} y={-margin.bottom} />
    </>
  );
}

ResponsiveChart.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
};
