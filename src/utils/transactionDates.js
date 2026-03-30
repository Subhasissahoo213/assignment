const pad = (value) => String(value).padStart(2, "0");

export const formatDateToDDMMYYYY = (date) => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatInputDateToDDMMYYYY = (inputValue) => {
  if (!inputValue) return "";
  const [year, month, day] = inputValue.split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year}`;
};

export const getTodayRange = () => {
  const today = new Date();
  const formatted = formatDateToDDMMYYYY(today);

  return {
    startDate: formatted,
    endDate: formatted,
  };
};

export const getLastMonthsRange = (monthsBack) => {
  const today = new Date();
  const endDate = new Date(today);
  const startDate = new Date(today);

  startDate.setMonth(startDate.getMonth() - Number(monthsBack));
  startDate.setDate(1);

  return {
    startDate: formatDateToDDMMYYYY(startDate),
    endDate: formatDateToDDMMYYYY(endDate),
  };
};

export const isFutureDate = (dateValue) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkDate = new Date(dateValue);
  checkDate.setHours(0, 0, 0, 0);

  return checkDate > today;
};

export const isStartAfterEnd = (startDateValue, endDateValue) => {
  return new Date(startDateValue) > new Date(endDateValue);
};

export const formatDisplayDateTime = (value) => {
  if (!value) return "-";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const date = formatDateToDDMMYYYY(parsed);
  const time = parsed.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${date}, ${time}`;
};