import React from "react";
import * as d3 from "d3";
import _ from "lodash";

import "./styles.css";

import Axis from "../Axis";
import BarChart from "../BarChart";
import UsSalaries from "../UsSalaries";
import Alphabet from "../Alphabet";

function App() {
  return (
    <>
      {/* <svg width="600" height="400" id="svg">
        <Axis x={20} y={50} />

        <BarChart x={20} y={50} />
      </svg> */}

      <UsSalaries />

      {/* <svg width="100%" height="600">
        <Alphabet x={32} y={300} />
      </svg> */}
    </>
  );
}

export default App;
