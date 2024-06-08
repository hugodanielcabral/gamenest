import Chart from "react-apexcharts";
import { donutPlotOptions } from "../../../constants/profile/chartOptions";
import { extractSeriesAndLabels } from "../../../utils/extractSeriesAndLabels";

interface ProfileStatsProps {
  profileStats: {
    status_name: string;
    total: number;
  }[];
}

export const ProfileStats = ({ profileStats }: ProfileStatsProps) => {
  if (!profileStats || profileStats.length === 0) {
    return (
      <h2 className="text-center text-white">
        No hay estadísticas disponibles.
      </h2>
    );
  }
  const { labels, series } = extractSeriesAndLabels(profileStats);

  return (
    <div className="w-full flex justify-center">
      <Chart
        options={{
          labels,
          colors: [
            "#FE6F5E",
            "#FF9966",
            "#C0C0C0",
            "#66FF00",
            "#0070FF",
            "#8A2BE2",
          ],
          legend: {
            show: true,
            labels: {
              colors: "#fff",
            },
            fontSize: "16px",
          },
          plotOptions: donutPlotOptions.plotOptions,
        }}
        series={series}
        type="donut"
        width={400}
      />
    </div>
  );
};
