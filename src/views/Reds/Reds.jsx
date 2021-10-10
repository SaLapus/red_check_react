import "./Reds.sass";

import React from "react";

import RedsTable from "./RedsTable/RedsTable";

// Reds.defaultProps = {
//   reds:
// };

class Reds extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="Workspace">
        {this.props.infoBar}
        <div id="Reds">
          <RedsTable
            reds={this.props.data}
            // comments={this.props.comments.reds}
            go={this.props.go}
          />
        </div>
      </div>
    );
  }
}

export default Reds;
