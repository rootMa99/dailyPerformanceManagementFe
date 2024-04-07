export const separateDataByName = (d) => {
  const rd = [];

  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        name: e.name,
        data: [
          {
            apm: e.apm,
            ddate: e.ddate,
            real: e.real,
            target: e.target,
            type: e.type,
          },
        ],
      });
    } else {
      const index = rd.findIndex((f) => f.name === e.name);
      if (index > -1) {
        rd[index].data.push({
          apm: e.apm,
          ddate: e.ddate,
          real: e.real,
          target: e.target,
          type: e.type,
        });
      } else {
        rd.push({
          name: e.name,
          data: [
            {
              apm: e.apm,
              ddate: e.ddate,
              real: e.real,
              target: e.target,
              type: e.type,
            },
          ],
        });
      }
    }
  });
};
