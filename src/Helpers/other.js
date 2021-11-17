export function helper_dateToString(_date) {
  if (_date instanceof Date) {
    let hour = _date.getHours().toString();
    let min = _date.getMinutes().toString();
    let month = _date.getMonth();
    let day = _date.getDate().toString();
    let year = _date.getFullYear();
    year = year.toString().substr(-2);
    month = (month + 1).toString();

    if (hour.length === 1) hour = "0" + hour;
    if (min.length === 1) min = "0" + min;
    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    return hour + ":" + min + " " + month + "/" + day + "/" + year;
  }

  return "";
}
