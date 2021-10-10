import "./Projects.sass";

import React from "react";
import PropTypes from "prop-types";

import ProjectsTable from "./ProjectsTable/ProjectsTable";

class Projects extends React.Component {
  render() {
    return (
      <div id="Workspace">
        {this.props.infoBar}
        <div id="Projects">
          <ProjectsTable
            projects={this.props.data}
            // comments={this.props.comments}
            go={this.props.go}
          />
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.instanceOf(Map).isRequired,
  go: PropTypes.func.isRequired,
};

export default Projects;
