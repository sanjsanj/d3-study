import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import * as d3 from "d3";
import d3blackbox, { useD3 } from "d3blackbox";

const BottomAxis = ({ scale, x, y }) => {
  const ref = useD3(anchor => {
    // scale.domain(scale.domain().filter((_, i) => i % 5 === 0));

    const axis = d3
      .axisBottom()
      .scale(scale)
      .tickFormat(d => `${d}`);

    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

export default function ResponsiveChart({ data, width, height }) {
  const ref = React.createRef();

  const xScale = d3
    .scalePoint()
    .domain(data.map(d => d.year))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.share)])
    .range([height, 0]);

  const line = d3
    .line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.share))
    .curve(d3.curveMonotoneX);

  // React.useEffect(() => {}, []);

  return (
    <g>
      <path d={line(data)} fill="none" stroke="#333" />

      <BottomAxis scale={xScale} x={0} y={height - 50} />
    </g>
  );
}

ResponsiveChart.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
};
