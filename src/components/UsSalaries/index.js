import React, { Component } from "react";
import * as d3 from "d3";
import _ from "lodash";

import Preloader from "./preloader";
import { loadAllData } from "./dataHandling";

import CountyMap from "../CountyMap";
import Histogram from "../Histogram";
import MedianLine from "../MedianLine";
import { Title, Description } from "../Meta";

class App extends Component {
  state = {
    filteredBy: {
      jobTitle: "*",
      USstate: "*",
      year: "*",
    },
    salariesFilter: () => true,
    medianIncomes: [],
    techSalaries: [],
    countyNames: [],
  };

  componentDidMount() {
    loadAllData(data => this.setState(data));
  }

  countyValue(county, techSalariesMap) {
    const medianHousehold = this.state.medianIncomes[county.id],
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

  updateDataFilter = (filter, filteredBy) => {
    this.setState({
      salariesFilter: filter,
      filteredBy: filteredBy,
    });
  };

  render() {
    const {
      USstateNames,
      techSalaries,
      countyNames,
      usTopoJson,
      filteredBy,
    } = this.state;

    if (techSalaries.length < 1) {
      return <Preloader />;
    }

    const filteredSalaries = techSalaries.filter(this.state.salariesFilter);
    const filteredSalariesMap = _.groupBy(filteredSalaries, "countyID");
    const countyValues = countyNames
      .map(county => this.countyValue(county, filteredSalariesMap))
      .filter(d => !_.isNull(d));

    let zoom = null;
    let medianHousehold = this.state.medianIncomesByUSState["US"][0]
      .medianIncome;

    if (filteredBy.USstate !== "*") {
      zoom = this.state.filteredBy.USstate;
      medianHousehold = d3.mean(
        this.state.medianIncomesByUSState[zoom],
        d => d.medianIncome
      );
    }

    return (
      <div className="App container">
        <Title data={filteredSalaries} filteredBy={filteredBy} />

        <Description
          medianIncomesByCounty={this.state.medianIncomesByCounty}
          data={filteredSalaries}
          filteredBy={filteredBy}
          allData={techSalaries}
        />

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

          <rect
            style={{ fill: "white" }}
            height="500"
            width="600"
            x="500"
            y="0"
          />

          <Histogram
            value={d => d.base_salary}
            data={filteredSalaries}
            bottomMargin={5}
            axisMargin={83}
            height={500}
            width={500}
            bins={10}
            x={500}
            y={10}
          />

          <MedianLine
            value={d => d.base_salary}
            median={medianHousehold}
            data={filteredSalaries}
            bottomMargin={5}
            height={500}
            width={600}
            x={500}
            y={10}
          />
        </svg>
      </div>
    );
  }
}

export default App;
