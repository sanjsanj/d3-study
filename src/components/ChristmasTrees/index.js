import React from "react";
import * as d3 from "d3";

import BarChart from "./BarChart";

export default function ChristmasTrees() {
  const [data, setData] = React.useState(null);
  const [view, setView] = React.useState("fake_trees");

  const switchView = () =>
    setView(view === "fake_trees" ? "real_trees" : "fake_trees");

  React.useEffect(() => {
    (async () => {
      const data = await d3.tsv(
        "/data/christmas_trees.tsv",
        ({ year, real_trees, fake_trees }) => ({
          real_trees: Number(real_trees),
          fake_trees: Number(fake_trees),
          year: Number(year),
        })
      );

      setData(data);
    })();
  }, []);

  return (
    data && (
      <svg width={800} height={1200} onClick={switchView}>
        <text
          style={{ fontSize: 25, fontWeight: "bold" }}
          textAnchor="center"
          x={50}
          y={50}
        >
          The USA buys {d3.mean(data, d => d[view]).toFixed(1)} million{" "}
          {(view === "fake_trees" ? "real_trees" : "fake_trees").replace(
            "_",
            " "
          )}{" "}
          per year on average
        </text>

        <BarChart data={data} view={view} y={0} />
      </svg>
    )
  );
}
