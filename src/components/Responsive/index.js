import React from "react";
import * as d3 from "d3";

import ResponsiveChart from "./ResponsiveChart";

export default function Responsive() {
  const svgRef = React.createRef();

  const [data, setData] = React.useState(undefined);
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const data = await d3.csv("/data/movies_market_share.csv", obj => ({
        year: Number(obj.Year),
        share: Number(obj["Market share"]),
      }));

      setData(data);
    })();
  }, []);

  React.useEffect(() => {
    function measureSVG() {
      if (!svgRef.current) return;

      const { height, width } = svgRef.current.getBoundingClientRect();

      setHeight(height);
      setWidth(width);
    }

    measureSVG();
    window.addEventListener("resize", measureSVG);

    return () => window.removeEventListener("resize", measureSVG);
  }, [svgRef]);

  return (
    <>
      <h1>% of market share for PG movies (by revenue)</h1>

      <svg width="100%" height={400} ref={svgRef}>
        {data && <ResponsiveChart data={data} width={width} height={height} />}
      </svg>
    </>
  );
}
