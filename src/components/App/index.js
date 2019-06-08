import React from "react";
import * as d3 from "d3";
import _ from "lodash";

import "./styles.css";

import Axis from "../Axis";
import BarChart from "../BarChart";
import UsSalaries from "../UsSalaries";

function App() {
  return (
    <>
      {/* <svg width="600" height="400" id="svg">
        <Axis x={20} y={50} />

        <BarChart x={20} y={50} />
      </svg> */}

      <UsSalaries />
    </>
  );
}

export default App;
