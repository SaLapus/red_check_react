import React from "react";
import PropTypes from "prop-types";

class TableTypeSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.current = 0;

    this.buttons = [
      {
        text: "К проектам",
        nextViewID: "projects",
      },
      {
        text: "К редакторам",
        nextViewID: "reds",
      },
    ];

    switch (props.currentID) {
      case "reds":
        this.current = 0;
        break;
      case "projects":
        this.current = 1;
        break;
      default:
        console.log(props.currentID);
      // throw new Error("Invalid View");
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.go(this.buttons[this.current].nextViewID);
  }

  render() {
    return (
      <button id="TableTypeSwitch" onClick={this.handleClick}>
        {this.buttons[this.current].text}
      </button>
    );
  }
}

TableTypeSwitch.propTypes = {
  currentID: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default TableTypeSwitch;
