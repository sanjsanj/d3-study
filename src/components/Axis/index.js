import React from "react";
import * as d3 from "d3";
import { useD3 } from "d3blackbox";

export default function Axis({ scale, data, x, y }) {
  const ref = useD3(anchor => {
    const axis = d3
      .axisLeft()
      .tickFormat(d => `${d3.format(".2s")(d)}`)
      .scale(scale)
      .ticks(data.length);

    d3.select(anchor).call(axis);
  });

  return <g transform={`translate(${x}, ${y})`} ref={ref} />;
}
