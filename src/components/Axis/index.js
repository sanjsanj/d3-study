import * as d3 from "d3";

import BlackBox from "../../helpers/blackBox";

const Axis = BlackBox(function D3render() {
  const axis = d3
    .axisLeft()
    .tickFormat(d => `${d3.format(".2s")(d)}`)
    .scale(this.props.scale)
    .ticks(this.props.data.length);

  d3.select(this.anchorRef.current).call(axis);
});

export default Axis;
