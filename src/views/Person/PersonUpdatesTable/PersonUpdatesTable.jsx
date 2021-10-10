import React from "react";
import PropTypes from "prop-types";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import { DateComparator, DateFilter } from "../../../grids_components";

class PersonUpdatesTable extends React.Component {
  constructor(props) {
    super(props);

    this.getRowData = this.getRowData.bind(this);
  }
  getRowData() {
    return this.props.chapters.map((ch) => {
      return {
        chapter_name: ch.name,
        chapter_date: ch.date.toLocaleString(),
      };
    });
  }

  render() {
    return (
      <div className="ag-theme-alpine" id="PersonUpdatesTable">
        <AgGridReact
          rowData={this.getRowData()}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          frameworkComponents={{
            dateFilter: DateFilter,
          }}
        >
          <AgGridColumn headerName={this.props.volumeName}>
            <AgGridColumn
              headerName="Название"
              field="chapter_name"
              filter="agTextColumnFilter"
              flex={1}
            />

            <AgGridColumn
              headerName="Дата релиза"
              field="chapter_date"
              filter="dateFilter"
              sort="desc"
              comparator={DateComparator}
              flex={1}
            />
          </AgGridColumn>
        </AgGridReact>
      </div>
    );
  }
}

PersonUpdatesTable.propTypes = {
  volumeName: PropTypes.string,
  chapters: PropTypes.array.isRequired,
};

export default PersonUpdatesTable;
