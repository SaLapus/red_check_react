import React from "react";
import PropTypes from "prop-types";
import { AgGridReact, AgGridColumn } from "ag-grid-react";

import { DateComparator, DateFilter } from "../../../grids_components";

class PersonTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volumeName: undefined,
      chapters: undefined,
    };

    this.getRowData = this.getRowData.bind(this);
  }

  getRowData() {
    return this.props.data.activities.map((activity) => {
      return {
        volume_name: activity.volumeName,
        update_id: activity.volumeID,
        activity_type: activity.activityType,
        translators: activity.translators.map((tr) => tr.nickname).join(", "),
        update_date: activity.chapters
          .map((ch) => ch.date)
          .reduce((acc, cur) => (acc > cur ? acc : cur))
          .toLocaleString(),
      };
    });
  }

  render() {
    return (
      <div className="ag-theme-alpine" id="PersonTable">
        <AgGridReact
          rowData={this.getRowData()}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          onRowClicked={(event) => {
            const volumeId = event.data.update_id;

            const activity = this.props.data.activities.find(
              (act) => act.volumeID === volumeId
            );

            this.props.setVolumeName(activity.volumeName, activity.chapters);
          }}
          onRowDoubleClicked={(params) => {
            const update_id = params.data.update_id;

            let url = "";

            for (const activity of this.props.data.activities) {
              for (const chapter of activity.chapters) {
                if (chapter.volumeID === update_id) {
                  url = activity.url;
                }
              }
            }

            window.open(`https://${url}`, "_blank").focus();
          }}
          frameworkComponents={{
            dateFilter: DateFilter,
          }}
        >
          <AgGridColumn
            headerName="Название тома"
            field="volume_name"
            checkboxSelection={true}
            filter="agTextColumnFilter"
            flex={3}
          />
          <AgGridColumn headerName="ID" field="update_id" flex={1} />
          <AgGridColumn headerName="Роль" field="activity_type" flex={2} />
          <AgGridColumn
            headerName="Переводчики"
            field="translators"
            filter="agTextColumnFilter"
            comparator={DateComparator}
            flex={2}
          />
          <AgGridColumn
            headerName="Дата релиза"
            field="update_date"
            filter="dateFilter"
            sort="desc"
            flex={3}
          />
        </AgGridReact>
      </div>
    );
  }
}

PersonTable.propsTypes = {
  data: PropTypes.shape({
    activities: PropTypes.array.isRequired,
  }).isRequired,
  setVolumeName: PropTypes.func,
};

export default PersonTable;
