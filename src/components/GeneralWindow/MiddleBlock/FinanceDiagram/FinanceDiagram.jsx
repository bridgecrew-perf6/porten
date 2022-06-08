import React from "react";
import Chart from "chart.js/auto";
import { Box } from "@mui/material";
import { Pie, Doughnut } from "react-chartjs-2";

const FinanceDiagram = ({ dataDiagram }) => {
  console.log(dataDiagram);

  const pieChartData = {
    labels: dataDiagram.map((category) => category.category),
    datasets: [
      {
        data: dataDiagram.map((category) => category.totalAmount),
        backgroundColor: dataDiagram.map((category) => category.color),
        hoverBackgroundColor: dataDiagram.map(
          (category) => category.hoverColor
        ),
        borderWidth: 0,
      },
    ],
  };

  const pieChart = (
    <Doughnut
      // type="pie"
      // width={130}
      // height={50}
      options={{
        title: {
          display: true,
          fontSize: 15,
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top", //Position of the legend.
        },
      }}
      data={pieChartData}
    />
  );

  return (
    <Box sx={{ p: { xs: "0em 4em", sm: "0em 3em", lg: "0em 6em" } }}>
      {pieChart}
    </Box>
  );
};

export default FinanceDiagram;
