import React from "react";

export default function blackBox(D3render) {
  return function Blackbox(props) {
    const anchor = React.createRef();

    React.useEffect(() => {
      D3render(anchor);
    }, [anchor, props]);

    return <g transform={`translate(${props.x}, ${props.y})`} ref={anchor} />;
  };
}
