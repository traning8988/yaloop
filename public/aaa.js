const ctx = document.getElementById("stackedBarChart").getContext("2d");

// サンプルデータ
const tasks = [
  { title: "ruby", time: "02:00:00" },
  { title: "react", time: "01:30:00" },
  { title: "HTML/CSS", time: "02:00:00" },
  { title: "チームミーティング", time: "01:30:00" },
];

// 時間を秒に変換する関数
function timeToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// データを集計
const labels = tasks.map((task) => task.title);
const datasetData = tasks.map((task) => timeToSeconds(task.time) / 3600); // 時間単位で表現

const data = {
  labels: labels,
  datasets: [
    {
      label: "Task Time (hours)",
      data: datasetData,
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "Stacked Bar Chart Example",
    },
    tooltip: {
      mode: "index",
      intersect: false,
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
    },
  },
};

const stackedBarChart = new Chart(ctx, {
  type: "bar",
  data: data,
  options: options,
});
