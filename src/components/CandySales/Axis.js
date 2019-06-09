import React from "react";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";

export const BottomAxis = ({ scale, x, y }) => {
  const ref = useD3(anchor => {
    scale.domain(scale.domain().filter((_, i) => i % 5 === 0));

    const axis = d3
      .axisBottom()
      .scale(scale)
      .tickFormat(d => `wk ${d}`);

    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};

export const LeftAxis = ({ scale, x, y }) => {
  const ref = useD3(anchor => {
    const axis = d3
      .axisLeft()
      .scale(scale)
      .tickFormat(d => `$${d} million`);

    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
};
