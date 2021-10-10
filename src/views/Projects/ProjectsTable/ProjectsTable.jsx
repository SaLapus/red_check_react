import React from "react";
import PropTypes from "prop-types";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import { DateComparator, DateFilter } from "../../../grids_components";

class ProjectsTable extends React.Component {
  constructor(props) {
    super(props);

    this.getRowData = this.getRowData.bind(this);
  }

  getRowData() {
    const rows = [];

    if (!this.props.projects) return rows;

    for (const [project_name, data] of this.props.projects.entries()) {
      rows.push({
        project_name,
        editors: data.lastUpdate.editors,
        translators: data.lastUpdate.translators,
        lastUpdate: data.lastUpdate.date.toLocaleString(),
        comment: this.props.comments?.get(project_name) ?? "",
      });
    }

    return rows;
  }

  render() {
    return (
      <div className="ag-theme-alpine" id="ProjectsTable">
        <AgGridReact
          rowData={this.getRowData()}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          // onRowDoubleClicked={(params) => {
          //   const red = params.data.nickname;
          //   this.props.go("person", { nickname: red });
          // }}
          frameworkComponents={{
            dateFilter: DateFilter,
          }}
        >
          <AgGridColumn
            headerName="Проект"
            field="project_name"
            checkboxSelection={true}
            filter="agTextColumnFilter"
            flex={3}
          />
          <AgGridColumn
            headerName="Редакторы"
            field="editors"
            filter="agTextColumnFilter"
            flex={2}
          />
          <AgGridColumn
            headerName="Переводчики"
            field="translators"
            filter="agTextColumnFilter"
            flex={2}
          />
          <AgGridColumn
            headerName="Время последнего обновления"
            field="lastUpdate"
            filter="dateFilter"
            sort="desc"
            comparator={DateComparator}
            flex={2}
          />
          <AgGridColumn
            headerName="Комментарий"
            field="comment"
            filter={false}
            sort={false}
            flex={4}
          />
        </AgGridReact>
      </div>
    );
  }
}

ProjectsTable.propTypes = {
  projects: PropTypes.instanceOf(Map).isRequired,
  go: PropTypes.func.isRequired,
};

export default ProjectsTable;
