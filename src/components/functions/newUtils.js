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