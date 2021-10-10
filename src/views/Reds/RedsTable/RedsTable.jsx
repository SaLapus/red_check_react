import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import { DateComparator, DateFilter } from "../../../grids_components";

class RedsTable extends React.Component {
  constructor(props) {
    super(props);

    this.getRowData = this.getRowData.bind(this);
  }

  getRowData() {
    const rows = [];

    if (!this.props.reds) return rows;

    for (const [nickname, data] of this.props.reds.entries()) {
      rows.push({
        nickname,
        activityType: data.lastUpdate.activityType,
        lastUpdate: data.lastUpdate.date.toLocaleString(),
        lastActivity: data.lastUpdate.name,
        comment: this.props.comments?.get(nickname) ?? "",
      });
    }

    return rows;
  }

  render() {
    return (
      <div className="ag-theme-alpine" id="RedsTable">
        <AgGridReact
          rowData={this.getRowData()}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          onRowDoubleClicked={(params) => {
            const red = params.data.nickname;
            this.props.go("person", { nickname: red });
          }}
          frameworkComponents={{
            dateFilter: DateFilter,
          }}
        >
          <AgGridColumn
            headerName="Никнейм"
            field="nickname"
            checkboxSelection={true}
            filter="agTextColumnFilter"
            flex={2}
          />
          <AgGridColumn
            headerName="Роль"
            field="activityType"
            filter="agTextColumnFilter"
            flex={1}
          />
          <AgGridColumn
            headerName="Последнее обновление"
            field="lastActivity"
            filter="agTextColumnFilter"
            flex={3}
          />
          <AgGridColumn
            headerName="Время последнего обновления"
            field="lastUpdate"
            filter="dateFilter"
            sort="desc"
            comparator={DateComparator}
            flex={3}
          />
          <AgGridColumn
            headerName="Комментарий"
            field="comment"
            filter={false}
            sort={false}
            flex={3}
          />
        </AgGridReact>
      </div>
    );
  }
}

export default RedsTable;
