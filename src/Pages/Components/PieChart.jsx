import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularGraph = ({ labels, data, colors, title, width = 250, height = 250 }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map((color) => `${color}B3`),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div style={{ width, height }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default CircularGraph;
