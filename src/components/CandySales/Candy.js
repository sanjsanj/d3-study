import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

function candyYTween(oldY, newY) {
  const interpolator = d3.interpolate(oldY, newY);
  return function() {
    return function(t) {
      return interpolator(d3.easeBounceOut(t));
    };
  };
}

export default function Candy({ delay, x: propX, y: propY, type }) {
  const ref = React.createRef();

  const [stateX, setStateX] = React.useState(Math.random() * 600);
  const [stateY, setStateY] = React.useState(Math.random() * -50);

  React.useEffect(() => {
    const node = d3.select(ref.current);

    node
      .transition()
      .duration(1500)
      .delay(delay)
      .ease(d3.easeLinear)
      .attrTween("y", candyYTween(stateY, propY))
      .attr("x", propX)
      .on("end", () => {
        setStateY(propY);
      });
  }, [delay, propX, propY, ref, stateY]);

  return (
    <text x={stateX} y={stateY} style={{ fontSize: 12 }} ref={ref}>
      {type}
    </text>
  );
}

Candy.propTypes = {
  delay: PropTypes.number,
  propX: PropTypes.number,
  propY: PropTypes.number,
  type: PropTypes.string,
};
