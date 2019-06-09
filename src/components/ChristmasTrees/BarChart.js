import React from "react";
import * as d3 from "d3";
import { v4 } from "uuid";
import { TransitionGroup, Transition } from "react-transition-group";

function TreeBar({ count, x, y }) {
  const [inProp, setInProp] = React.useState(false);
  const treeRef = React.createRef();

  const t = d3.transition().duration(750);

  function onEnter() {
    let node = d3.select(treeRef.current);

    return (
      node
        .transition(t)
        // .duration(750)
        .ease(d3.easeCubicInOut)
        // .attr("y", 0)
        .style("fill-opacity", 1)
    );
    // .on("end", () => {
    //   this.setState({
    //     fillOpacity: 1,
    //     y: 0,
    //   });
    // });
  }

  function onExit() {
    let node = d3.select(treeRef.current);

    return node.remove();
    // .transition(t)
    // .transition(this.transition)
    // .attr("y", 60)
    // .style("fill-opacity", 0)
    // .on("end", () => this.setState(this.defaultState))
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <Transition
        unmountOnExit={false}
        onEnter={onEnter}
        onExit={onExit}
        timeout={750}
        in={inProp}
      >
        <>
          {d3.range(count).map(i => (
            // eslint-disable-next-line jsx-a11y/accessible-emoji
            <text key={v4()} x={0} y={-i * 11} style={{ fontSize: 20 }}>
              🎄
            </text>
          ))}

          <text
            y={-(count + 1) * 11 - 5}
            style={{ fontSize: 9 }}
            textAnchor="center"
            x={0}
          >
            {count}
          </text>
        </>
      </Transition>
    </g>
  );
}

export default function BarChart({ view, data, y }) {
  const xScale = React.useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map(d => d.year))
        .range([0, 800]),
    [data]
  );

  return (
    <g transform={`translate(0, ${y})`}>
      <TransitionGroup enter={true} exit={true} component="g">
        {data.map(d => (
          <React.Fragment key={v4()}>
            <TreeBar x={xScale(d.year)} count={Number(d[view])} y={480} />

            <text
              style={{ strike: "black", fontSize: 12 }}
              textAnchor="center"
              x={xScale(d.year)}
              y={500}
            >
              {d.year}
            </text>
          </React.Fragment>
        ))}
      </TransitionGroup>
    </g>
  );
}
