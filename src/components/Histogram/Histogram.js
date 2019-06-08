import React from "react";
import * as d3 from "d3";

import Axis from "../Axis";
import HistogramBar from "./HistogramBar";

export default class Histogram extends React.Component {
  state = {
    widthScale: d3.scaleLinear(),
    histogram: d3.histogram(),
    yScale: d3.scaleLinear(),
  };

  static getDerivedStateFromProps(props, state) {
    let { histogram, widthScale, yScale } = state;

    histogram.thresholds(props.bins).value(props.value);

    const bars = histogram(props.data),
      counts = bars.map(d => d.length);

    widthScale
      .domain([d3.min(counts), d3.max(counts)])
      .range([0, props.width - props.axisMargin]);

    yScale
      .domain([0, d3.max(bars, d => d.x1)])
      .range([props.height - props.y - props.bottomMargin, 0]);

    return {
      ...state,
      widthScale,
      histogram,
      yScale,
    };
  }

  makeBar = bar => {
    const { yScale, widthScale } = this.state;

    let percent = (bar.length / this.props.data.length) * 100;

    let props = {
      height: yScale(bar.x0) - yScale(bar.x1),
      key: "histogram-bar-" + bar.x0,
      width: widthScale(bar.length),
      x: this.props.axisMargin,
      y: yScale(bar.x1),
      percent: percent,
    };

    return <HistogramBar {...props} />;
  };

  render() {
    const { histogram, yScale } = this.state,
      { x, y, data, axisMargin } = this.props;

    const bars = histogram(data);

    return (
      <g className="histogram" transform={`translate(${x}, ${y})`}>
        <g className="bars">{bars.map(this.makeBar)}</g>

        <Axis x={axisMargin - 3} y={0} data={bars} scale={yScale} />
      </g>
    );
  }
}
