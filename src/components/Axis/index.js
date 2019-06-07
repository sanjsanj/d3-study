import * as d3 from "d3";

import BlackBox from "../../helpers/blackBox";

const Axis = BlackBox(function D3render(anchor) {
  const scale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 200]);

  const axis = d3.axisBottom(scale);

  d3.select(anchor.current).call(axis);
});

export default Axis;
