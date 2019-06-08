import React from "react";
import * as d3 from "d3";

import Axis from "../Axis";
import HistogramBar from "./HistogramBar";

function makeBar({ bar, N, yScale, widthScale, axisMargin }) {
  let percent = (bar.length / N) * 100;

  let props = {
    height: yScale(bar.x0) - yScale(bar.x1),
    key: "histogram-bar-" + bar.x0,
    width: widthScale(bar.length),
    y: yScale(bar.x1),
    x: axisMargin,
    percent,
  };

  return <HistogramBar {...props} />;
}

function useHistogram({
  bottomMargin,
  axisMargin,
  height,
  value,
  width,
  bins,
  data,
  y,
}) {
  const bars = React.useMemo(
    () =>
      d3
        .histogram()
        .thresholds(bins)
        .value(value)(data),
    [bins, value, data]
  );

  const widthScale = React.useMemo(() => {
    const counts = bars.map(d => d.length);
    return d3
      .scaleLinear()
      .domain([d3.min(counts), d3.max(counts)])
      .range([0, width - axisMargin]);
  }, [width, axisMargin, bars]);

  const yScale = React.useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(bars, d => d.x1)])
        .range([height - y - bottomMargin, 0]),
    [height, y, bottomMargin, bars]
  );

  return { bars, widthScale, yScale };
}

export default function Histogram({
  bottomMargin,
  axisMargin,
  height,
  value,
  width,
  data,
  bins,
  x,
  y,
}) {
  const { bars, widthScale, yScale } = useHistogram({
    bottomMargin,
    axisMargin,
    height,
    value,
    width,
    bins,
    data,
    y,
  });

  const N = data.length;

  return (
    <g className="histogram" transform={`translate(${x}, ${y})`}>
      <g className="bars">
        {bars.map(bar => makeBar({ bar, N, yScale, widthScale, axisMargin }))}
      </g>

      <Axis x={axisMargin - 3} y={0} data={bars} scale={yScale} />
    </g>
  );
}
