import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import BalanceDetails from "./BalanceDetails/BalanceDetails";


const FinanceDiagram = ({ dataDiagram }) => {
  const [curCanvas, setCurCanvas] = useState(React.createRef());

  const image = new Image();
  image.src = "https://www.chartjs.org/img/chartjs-logo.svg";

  // const plugin = {
  //   id: "custom_canvas_background_image",
  //   beforeDraw: (chart) => {
  //     if (image.complete) {
  //     const ctx = chart.ctx;
  //     const { top, left, width, height } = chart.chartArea;
  //     const x = left + width / 2 - image.width / 2;
  //     const y = top + height / 2 - image.height / 2;
  //     ctx.font = "19px serif";
  //     ctx.fillText("Hello world", x, y);
  //     // ctx.drawImage(image, x, y);
  //     } else {
  //     image.onload = () => chart.draw();
  //     }
  //   },
  // };

  useEffect(() => {

    const ctx = curCanvas.current.getContext("2d");
    let chart = new Chart(ctx, {
      type: "doughnut",
      plugins: [<BalanceDetails />],
      data: {
        labels: dataDiagram.names,
        datasets: [
          {
            label: "CHART",
            data: dataDiagram.amounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderWidth: 0,
            hoverOffset: 2,
            hoverBackgroundColor: [
              "rgba(255, 99, 132, 0.9)",
              "rgba(54, 162, 235, 0.9)",
              "rgba(255, 206, 86, 0.9)",
              "rgba(75, 192, 192, 0.9)",
              "rgba(153, 102, 255, 0.9)",
              "rgba(255, 159, 64, 0.9)",
            ],
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            display: false,
          },
          y: {
            grid: {
              display: false,
            },
            display: false,
          },
        },
        plugins: {
          legend: {},
        },
      },
    });
    window.chart = chart;

    return () => chart.destroy();
  }, [curCanvas, dataDiagram]);

  

  return <canvas ref={curCanvas} id="myChart"></canvas>
};

export default FinanceDiagram;
