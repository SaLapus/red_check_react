import "./Person.sass";

import React from "react";
import PropTypes from "prop-types";

import PersonTable from "./PersonTable/PersonTable";
import PersonUpdatesTable from "./PersonUpdatesTable/PersonUpdatesTable";

// Reds.defaultProps = {
//   reds:
// };

class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volumeName: undefined,
      chapters: [],
    };

    this.setUpdateInfo = this.setUpdateInfo.bind(this);
  }

  setUpdateInfo(volumeName, chapters) {
    this.setState({ volumeName, chapters });
  }

  render() {
    return (
      <div id="Workspace">
        {this.props.infoBar}
        <div id="Person">
          <PersonTable data={this.props.data} setVolumeName={this.setUpdateInfo} />
          {this.state.volumeName && <PersonUpdatesTable {...this.state} />}
        </div>
      </div>
    );
  }
}

Person.propsTypes = {
  infoBar: PropTypes.element.isRequired,
  data: PropTypes.any,
  go: PropTypes.func,
};

export default Person;
