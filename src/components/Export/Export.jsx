import React from "react";
import PropTypes from "prop-types";

class Export extends React.Component {
  constructor(props) {
    super(props);

    this.onExport = this.onExport.bind(this);
  }
  onExport() {}

  render() {
    return <button id="exportCSV">Сохранить</button>;
  }
}

Export.propTypes = {
  api: PropTypes.object,
};

export default Export;
