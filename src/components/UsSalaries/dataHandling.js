import * as d3 from "d3";
import _ from "lodash";

const cleanIncome = d => ({
  countyName: d["Name"],
  USstate: d["State"],
  medianIncome: Number(d["Median Household Income"]),
  lowerBound: Number(d["90% CI Lower Bound"]),
  upperBound: Number(d["90% CI Upper Bound"]),
});

const dateParse = d3.timeParse("%m/%d/%Y");

const cleanSalary = d => {
  if (!d["base salary"] || Number(d["base salary"]) > 300000) {
    return null;
  }

  return {
    submit_date: dateParse(d["submit date"]),
    start_date: dateParse(d["start date"]),
    base_salary: Number(d["base salary"]),
    clean_job_title: d["job title"],
    case_status: d["case status"],
    job_title: d["job title"],
    countyID: d["countyID"],
    employer: d.employer,
    USstate: d["state"],
    county: d["county"],
    city: d["city"],
  };
};

const cleanUSStateName = d => ({
  id: Number(d.id),
  code: d.code,
  name: d.name,
});

const cleanCounty = d => ({
  id: Number(d.id),
  name: d.name,
});

export const loadAllData = (callback = _.noop) => {
  Promise.all([
    d3.json("data/us.json"),
    d3.csv("data/us-county-names-normalized.csv", cleanCounty),
    d3.csv("data/county-median-incomes.csv", cleanIncome),
    d3.csv("data/h1bs-2012-2016-shortened.csv", cleanSalary),
    d3.tsv("data/us-state-names.tsv", cleanUSStateName),
  ]).then(([us, countyNames, medianIncomes, techSalaries, USstateNames]) => {
    let medianIncomesMap = {};

    medianIncomes
      .filter(d => _.find(countyNames, { name: d["countyName"] }))
      .forEach(d => {
        d["countyID"] = _.find(countyNames, { name: d["countyName"] }).id;
        medianIncomesMap[d.countyID] = d;
      });

    techSalaries = techSalaries.filter(d => !_.isNull(d));

    callback({
      medianIncomesByCounty: _.groupBy(medianIncomes, "countyName"),
      medianIncomesByUSState: _.groupBy(medianIncomes, "USstate"),
      medianIncomes: medianIncomesMap,
      techSalaries: techSalaries,
      USstateNames: USstateNames,
      countyNames: countyNames,
      usTopoJson: us,
    });
  });
};
