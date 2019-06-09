import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { v4 } from "uuid";

import Candy from "./Candy";

export default function CandyJar({ x, y, height, delay, type }) {
  return d3
    .range(height / 12)
    .map(i => (
      <Candy
        delay={delay + i * Math.random() * 100}
        y={y - i * 12}
        type={type}
        key={v4()}
        x={x}
      />
    ));
}

CandyJar.propTypes = {
  height: PropTypes.number,
  delay: PropTypes.number,
  type: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
};
