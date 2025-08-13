"use strict";

(async function () {
  const data = [
    { day: "mon", amount: 17.45 },
    { day: "tue", amount: 34.91 },
    { day: "wed", amount: 52.36 },
    { day: "thu", amount: 31.07 },
    { day: "fri", amount: 23.39 },
    { day: "sat", amount: 43.28 },
    { day: "sun", amount: 25.48 },
  ];

  const myChart = new Chart(document.getElementById("expenses"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.day),
      datasets: [
        {
          data: data.map((row) => row.amount),
          backgroundColor: [
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(186, 34%, 60%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
            "hsl(10, 79%, 65%)",
          ],
        },
      ],
    },
    options: {
      animation: {
        duration: 1500,
        easing: "easeInSine",
      },
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      elements: {
        bar: {
          borderRadius: 5,
          borderSkipped: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "hsl(25, 47%, 15%)",
          callbacks: {
            label: function (context) {
              return "$" + context.raw;
            },
            title: function () {
              return "";
            },
          },
          bodyFont: {
            size: 15,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              size: 14,
            },
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
          beginAtZero: true,
        },
      },
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      },
    },
  });

  window.addEventListener("resize", () => {
    myChart.resize();
  });
})();

const totalAmountElement = document.getElementById("totalAmount");
const targetAmount = 478.33;
const animationDuration = 1500;
const frameRate = 60;
const increment = targetAmount / ((animationDuration / 1000) * frameRate);
let currentAmount = 0;

function animateTotalAmount(timestamp) {
  if (!timestamp) timestamp = new Date().getTime();

  const progress = Math.min((timestamp - startTime) / animationDuration, 1);
  currentAmount = Math.min(currentAmount + increment, targetAmount);
  totalAmountElement.textContent = currentAmount.toFixed(2);

  if (progress < 1) {
    requestAnimationFrame(animateTotalAmount);
  }
}

const startTime = new Date().getTime();
requestAnimationFrame(animateTotalAmount);