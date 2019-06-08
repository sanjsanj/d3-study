import React from "react";
import * as d3 from "d3";
import Transition from "react-transition-group/Transition";

const ExitColor = "brown";
const UpdateColor = "#333";
const EnterColor = "green";

class Letter extends React.Component {
  defaultState = {
    x: this.props.index * 32,
    fillOpacity: 1e-6,
    color: EnterColor,
    y: -60,
  };
  state = this.defaultState;
  letterRef = React.createRef();

  onEnter = () => {
    let node = d3.select(this.letterRef.current);

    node
      .transition()
      .duration(750)
      .ease(d3.easeCubicInOut)
      .attr("y", 0)
      .style("fill-opacity", 1)
      .on("end", () => {
        this.setState({
          color: UpdateColor,
          fillOpacity: 1,
          y: 0,
        });
      });
  };

  onExit = () => {
    let node = d3.select(this.letterRef.current);

    node
      .style("fill", ExitColor)
      .transition(this.transition)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .on("end", () => this.setState(this.defaultState));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.in !== this.props.in && this.props.in) {
      // A new enter transition has begun
      this.setState({
        x: this.props.index * 32,
      });
    } else if (prevProps.index !== this.props.index) {
      // Letter is moving to a new location
      let node = d3.select(this.letterRef.current);
      let targetX = this.props.index * 32;

      node
        .style("fill", UpdateColor)
        .transition()
        .duration(750)
        .ease(d3.easeCubicInOut)
        .attr("x", targetX)
        .on("end", () =>
          this.setState({
            color: UpdateColor,
            x: targetX,
          })
        );
    }
  }

  render() {
    const { x, y, fillOpacity, color } = this.state;
    const { letter } = this.props;

    return (
      <Transition
        onEnter={this.onEnter}
        unmountOnExit={false}
        onExit={this.onExit}
        in={this.props.in}
        timeout={750}
      >
        <text
          style={{
            font: "bold 48px monospace",
            fillOpacity: fillOpacity,
            fill: color,
          }}
          ref={this.letterRef}
          dy=".35em"
          x={x}
          y={y}
        >
          {letter}
        </text>
      </Transition>
    );
  }
}

export default Letter;
