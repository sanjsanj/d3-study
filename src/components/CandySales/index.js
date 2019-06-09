import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { v4 } from "uuid";

import CandyJar from "./CandyJar";
import { BottomAxis, LeftAxis } from "./Axis";

const margin = { top: 100, right: 30, bottom: 25, left: 100 };
const height = 500 + margin.top + margin.bottom;
const width = 600 + margin.left + margin.right;

export default function CandySales({ x = 0, y = 0 }) {
  const [data, setData] = React.useState([]);

  const xScale = d3
    .scalePoint()
    .domain(data.map(d => d.week))
    .range([0, width - margin.left - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([250, d3.max(data, d => d.sales)])
    .range([height - margin.top - margin.bottom, 0]);

  React.useEffect(() => {
    (async () => {
      const data = await d3.tsv("/data/candy.tsv", ({ week, sales }) => ({
        sales: Number(sales),
        week: Number(week),
      }));

      setData(data);
    })();
  }, []);

  return (
    <svg width={width} height={height} x={margin.left} y={margin.top} id="svg">
      {data && (
        <g transform={`translate(${x},${y})`}>
          {data.map(d => (
            <CandyJar
              delay={d.week * Math.random() * 100}
              height={height - yScale(d.sales)}
              x={xScale(d.week)}
              type={`😎`}
              key={v4()}
              y={height}
            />
          ))}

          <BottomAxis
            scale={xScale}
            x={margin.left}
            y={height - margin.bottom}
          />
          <LeftAxis scale={yScale} x={margin.left} y={margin.top} />
        </g>
      )}
    </svg>
  );
}

CandySales.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};
