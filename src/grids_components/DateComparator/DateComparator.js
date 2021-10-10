function DateComparator(firstDate, secondDate) {
  const strToTime = (dateStr) => {
    return new Date(
      dateStr.replace(/(\d{2}).(\d{2}).(\d{4})/, (_, p1, p2, p3) => {
        return `${p2}/${p1}/${p3}`;
      })
    ).getTime();
  };

  return strToTime(firstDate) - strToTime(secondDate);
}

export default DateComparator;
