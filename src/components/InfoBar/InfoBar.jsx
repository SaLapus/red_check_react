import "./InfoBar.sass";

import React from "react";

class InfoBar extends React.Component {
  render() {
    return (
      <React.Profiler id="InfoBarProfiler" onRender={console.log}>
        <div id="InfoBar">{this.props.children}</div>
      </React.Profiler>
    );
  }
}

export default InfoBar;
