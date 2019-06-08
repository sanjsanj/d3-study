import React from "react";
import * as d3 from "d3";
import { v4 } from "uuid";

function TreeBar({ count, x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {d3.range(count).map((i, ix) => (
        <text key={v4()} x={0} y={-i * 12} style={{ fontSize: 20 }}>
          🎄
        </text>
      ))}

      <text
        y={-(count + 1) * 12 - 5}
        style={{ fontSize: 9 }}
        textAnchor="center"
        x={0}
      >
        {count}
      </text>
    </g>
  );
}

export default function BarChart({ view, data, y }) {
  const xScale = React.useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map(d => d.year))
        .range([0, 800]),
    [data]
  );

  return (
    <g transform={`translate(0, ${y})`}>
      {data.map(d => (
        <React.Fragment key={v4()}>
          <TreeBar x={xScale(d.year)} count={Number(d[view])} y={480} />

          <text
            style={{ strike: "black", fontSize: 12 }}
            textAnchor="center"
            x={xScale(d.year)}
            y={500}
          >
            {d.year}
          </text>
        </React.Fragment>
      ))}
    </g>
  );
}
