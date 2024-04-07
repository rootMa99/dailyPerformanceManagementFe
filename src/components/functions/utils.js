export const getMonthAndYear = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();
  return `${currentMonth}-${currentYear}`;
};
export const getStartAndEndMonth = (inputDate) => {
  const startOfMonth = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    1
  );
  const startOfMonthFormatted = startOfMonth.toISOString().slice(0, 10);
  const endOfMonth = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth() + 1,
    0
  );
  const endOfMonthFormatted = endOfMonth.toISOString().slice(0, 10);
  return { start: startOfMonthFormatted, end: endOfMonthFormatted };
};
export const getOnlyDay = (data) => {
  const rd = [];
  data.forEach((e) => {
    rd.push({
      day: +e.date.split("-")[2],
      data: e.deliveryModels,
    });
  });

  return rd.sort((a, b) => a.day - b.day);
};
export const filterBydataName = (data, dataName) => {
  const rd = [];
  data.forEach((e) => {
    rd.push({
      day: e.day,
      data: e.data.filter((f) => f.nameData === dataName),
    });
  });
  return rd;
};
export const colorDays = (data, dayC, date, rev) => {
  const today = new Date();
  const currentdate = new Date(date.getFullYear(), date.getMonth(), dayC);
  if (currentdate > today) {
    return {};
  }
  const index = data.findIndex((f) => f.day === dayC);

  if (
    index === -1 ||
    (data[index].data[0].real === 0 && data[index].data[0].target === 0)
  ) {
    return { backgroundColor: "#0720d9" };
  } else {
    if (data[index].data[0].real >= data[index].data[0].target) {
      if (rev === undefined) {
        return { backgroundColor: "#006B63" };
      } else {
        return { backgroundColor: "#CF3335" };
      }
    } else {
      if (rev !== undefined) {
        return { backgroundColor: "#006B63" };
      } else {
        return { backgroundColor: "#CF3335" };
      }
    }
  }
};

export const getParetp = (data) => {
  const rp = [];

  data.forEach((e) => {
    if (e.data[0].paretoModels !== null) {
      rp.push(...e.data[0].paretoModels);
    }
  });
  return rp;
};

export const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCurrentMonthDates = () => {
  const currentDate = new Date();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const formattedFirstDay = formatDate(firstDayOfMonth);
  const formattedLastDay = formatDate(lastDayOfMonth);

  return {
    start: formattedFirstDay,
    end: formattedLastDay,
  };
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
