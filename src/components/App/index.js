import React from "react";

import Axis from "../Axis";
import BarChart from "../BarChart";

function App() {
  return (
    <svg width="600" height="400" id="svg">
      {/* <Axis x={20} y={50} /> */}

      <BarChart x={20} y={100} />
    </svg>
  );
}

export default App;
