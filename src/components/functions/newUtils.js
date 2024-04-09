export const separateDataByName = (d) => {
  const rd = [];

  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        name: e.name,
        data: [
          {
            date: e.ddate,
            data: {
              apm: e.apm,
              date: e.ddate,
              real: e.real,
              target: e.target,
              type: e.type,
            },
          },
        ],
      });
    } else {
      const index = rd.findIndex((f) => f.name === e.name);
      if (index > -1) {
        rd[index].data.push({
          date: e.ddate,
          data: {
            apm: e.apm,
            date: e.ddate,
            real: e.real,
            target: e.target,
            type: e.type,
          },
        });
      } else {
        rd.push({
          name: e.name,
          data: [
            {
              date: e.ddate,
              data: {
                apm: e.apm,
                date: e.ddate,
                real: e.real,
                target: e.target,
                type: e.type,
              },
            },
          ],
        });
      }
    }
  });
  return rd;
};

export const getlabelandvalue = (data) => {
  const retData = [];
  if (data.length > 0) {
    data.map((m) =>
      retData.push({
        value: m,
        label: m,
      })
    );
  }
  return retData;
};
export const newgetlabelandvalue = (data) => {
  const retData = [];
  if (data.length > 0) {
    data.map((m) =>
      retData.push({
        label: m.alias,
        value: m.kpiName,
      })
    );
  }
  return retData;
};

export const getDaysInMonth = (dateString) => {
  const [year, month] = dateString.split("-").map(Number);
  return new Date(year, month, 0).getDate();
};

export const formatDayDate = (i, d) => {
  const splitedData = d.split("-");
  const ind = +i < 10 ? `0${i}` : i;
  return `${splitedData[0]}-${splitedData[1]}-${ind}`;
};

export const getDateOfTomorrow = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const currentDate = new Date(year, month - 1, day);

  currentDate.setDate(currentDate.getDate() + 1);

  const tomorrowYear = currentDate.getFullYear();
  const tomorrowMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const tomorrowDay = String(currentDate.getDate()).padStart(2, "0");

  const tomorrowDateString = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

  return tomorrowDateString;
};
