const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getFormattedDate = (date) => {
  return (
    String(date.getDate()).padStart(2, "0") +
    "-" +
    monthNames[date.getMonth()] +
    "-" +
    date.getFullYear()
  );
};
