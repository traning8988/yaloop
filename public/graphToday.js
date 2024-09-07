const ctx = document.getElementById("stackedBarChart").getContext("2d");

const tasks = [
  { title: "ruby", hours: "02", minutes: "00", seconds: "00" },
  { title: "react", hours: "01", minutes: "30", seconds: "00" },
  { title: "HTML/CSS", hours: "01", minutes: "10", seconds: "00" },
  { title: "チームミーティング", hours: "02", minutes: "20", seconds: "00" },
];

function timeToSeconds(hours, minutes, seconds) {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

const today = new Date();
const labels = tasks.map((task) => task.title);
const datasetData = tasks.map((task) =>
  (timeToSeconds(task.hours, task.minutes, task.seconds) / 3600).toFixed(1)
);

const colors = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 205, 86, 0.8)",
  "rgba(255, 99, 71, 0.8)",
  "rgba(100, 149, 237, 0.8)",
];

const data = {
  labels: [``],
  datasets: labels.map((label, index) => ({
    label: label,
    data: [datasetData[index]], // 各タスクのデータ
    backgroundColor: colors[index % colors.length],
  })),
};

const options = {
  plugins: {
    title: {
      display: true,
      text: [`${today.getMonth() + 1}/${today.getDate()}`],
    },
    tooltip: {
      intersect: false,
      callbacks: {
        title: function (tooltipItems) {
          // ツールチップのタイトル部分をカスタマイズ
          return ``;
        },
        label: function (tooltipItem) {
          // データセットのラベルを取得して表示
          const datasetLabel = tooltipItem.dataset.label;
          const value = parseFloat(tooltipItem.raw);
          return `${datasetLabel}: ${value.toFixed(1)} hours`;
        },
        footer: function (tooltipItems) {
          // ツールチップのフッター部分をカスタマイズ（ここでは空にしています）
          return "";
        },
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
      suggestedMax: 12,
      ticks: {
        callback: function (value) {
          return value.toFixed(0);
        },
        stepSize: 1,
      },
      title: {
        display: true,
        text: "",
      },
    },
  },
};

const stackedBarChart = new Chart(ctx, {
  type: "bar",
  data: data,
  options: options,
});
