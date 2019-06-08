import React from "react";

const Histogram = ({ percent, height, width, x, y }) => {
  let translate = `translate(${x}, ${y})`,
    label = percent.toFixed(0) + "%";

  if (percent < 1) {
    label = percent.toFixed(2) + "%";
  }

  if (width < 20) {
    label = label.replace("%", "");
  }

  if (width < 10) {
    label = "";
  }

  return (
    <g transform={translate} className="bar">
      <rect transform="translate(0,1)" height={height - 2} width={width} />
      <text textAnchor="end" y={height / 2 + 3} x={width - 5}>
        {label}
      </text>
    </g>
  );
};

export default Histogram;
