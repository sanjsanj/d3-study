import React from "react";
import * as d3 from "d3";
import _ from "lodash";

import Preloader from "./preloader";
import { loadAllData } from "./dataHandling";

import CountyMap from "../CountyMap";

export default function UsSalaries() {
  const [techSalaries, setTechSalaries] = React.useState([]);
  const [usTopoJson, setUsTopoJson] = React.useState([]);
  const [countyNames, setCountyNames] = React.useState([]);
  const [USstateNames, setUSstateNames] = React.useState([]);
  const [medianIncomes, setMedianIncomes] = React.useState([]);

  React.useEffect(() => {
    loadAllData(data => {
      setMedianIncomes(data.medianIncomes);
      setUSstateNames(data.USstateNames);
      setTechSalaries(data.techSalaries);
      setCountyNames(data.countyNames);
      setUsTopoJson(data.usTopoJson);
    });
  }, []);

  if (!techSalaries.length) return <Preloader />;

  function countyValue(county, techSalariesMap) {
    const medianHousehold = medianIncomes[county.id],
      salaries = techSalariesMap[county.name];

    if (!medianHousehold || !salaries) {
      return null;
    }

    const median = d3.median(salaries, d => d.base_salary);

    return {
      countyID: county.id,
      value: median - medianHousehold.medianIncome,
    };
  }

  const filteredSalaries = techSalaries;
  const filteredSalariesMap = _.groupBy(filteredSalaries, "countyID");
  const countyValues = countyNames
    .map(county => countyValue(county, filteredSalariesMap))
    .filter(d => !_.isNull(d));

  let zoom = null;

  return (
    <div className="App container">
      <svg width="1100" height="500">
        <CountyMap
          USstateNames={USstateNames}
          usTopoJson={usTopoJson}
          values={countyValues}
          height={500}
          width={500}
          zoom={zoom}
          x={0}
          y={0}
        />
      </svg>
    </div>
  );
}
