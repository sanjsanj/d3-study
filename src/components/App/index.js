import React from "react";

import Axis from "../Axis";
import { barChartData } from "../../data/barChart";

function App() {
  console.log(barChartData);
  return (
    <svg width="800" height="400" id="svg">
      <Axis x={20} y={50} />
    </svg>
  );
}

export default App;
