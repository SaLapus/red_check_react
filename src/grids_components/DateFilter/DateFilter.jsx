import React from "react";

import Context from "../../Context";

class DateFilter extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.filterOptions = [
      {
        name: "Неделя",
        timeRange: (curDate) => {
          const range = new Date(0);
          range.setHours(24 * 7);

          return new Date(curDate - range);
        },
      },
      {
        name: "Две недели",
        timeRange: (curDate) => {
          const range = new Date(0);
          range.setHours(24 * 7 * 2);

          return new Date(curDate - range);
        },
      },
      {
        name: "Месяц",
        timeRange: (curDate) => {
          const range = new Date(curDate);
          range.setMonth(range.getMonth() - 1);

          return range;
        },
      },
      {
        name: "Два месяца",
        timeRange: (curDate) => {
          const range = new Date(curDate);
          range.setMonth(range.getMonth() - 2);

          return range;
        },
      },
      {
        name: "Полгода",
        timeRange: (curDate) => {
          const range = new Date(curDate);
          range.setMonth(range.getMonth() - 6);

          return range;
        },
      },
      {
        name: "Год",
        timeRange: (curDate) => {
          const range = new Date(curDate);
          range.setFullYear(range.getFullYear() - 1);

          return range;
        },
      },
      {
        name: "Два года",
        timeRange: (curDate) => {
          const range = new Date(curDate);
          range.setFullYear(range.getFullYear() - 2);

          return range;
        },
      },
      { name: "Все время" },
    ];

    this.onOptionChange = this.onOptionChange.bind(this);
  }

  isFilterActive() {
    return true;
  }

  doesFilterPass(params) {
    const colName = this.props.column.colId;

    if (this.filterOptions.length - 1 === parseInt(this.context.filters.date.option, 10))
      return true;

    const range = this.filterOptions[this.context.filters.date.option].timeRange(
      new Date()
    );
    const time = params.data[colName].replace(
      /(\d{2}).(\d{2}).(\d{4})/,
      (_, p1, p2, p3) => {
        return `${p2}/${p1}/${p3}`;
      }
    );
    const rowDate = new Date(time);

    return rowDate > range;
  }

  componentDidMount() {
    this.props.filterChangedCallback();
  }

  onOptionChange(event) {
    const option = parseInt(event.target.value, 10);
    this.context.filters.date.option = option;
    this.props.filterChangedCallback();

    this.forceUpdate();
  }

  render() {
    return (
      <div className="dateFilterDiv">
        <input
          type="range"
          className="dateFilterInput"
          min="0"
          value={this.context.filters.date.option}
          max={this.filterOptions.length - 1}
          step="1"
          onInput={this.onOptionChange}
        />
        <label className="dateFilterLabel">
          {this.filterOptions[this.context.filters.date.option].name}
        </label>
      </div>
    );
  }
}

export default DateFilter;
