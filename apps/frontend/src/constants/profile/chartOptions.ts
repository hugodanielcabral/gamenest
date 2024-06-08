export const donutPlotOptions = {
    plotOptions: {
        pie: {
          donut: {
            background: "#414A4C",
            labels: {
              show: true,
              value:{
                color: "#fff"
              },
              total: {
                show: true,
                label: 'Total de juegos',
                color: "#fff",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                }
              }
            }
          }
        }
      }
}