import React from "react";
import PropTypes from "prop-types";

class Return extends React.Component {
  render() {
    return (
      <button id="returnToPrev" onClick={this.props.go}>
        Вернуться
      </button>
    );
  }
}

Return.propTypes = {
  go: PropTypes.func.isRequired,
};

export default Return;
