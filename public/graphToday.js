export function graphToday() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const todayData = data.today;
      const ctx = document.getElementById("stackedBarChart").getContext("2d");

      function timeToSeconds(hours, minutes, seconds) {
        return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
      }

      // tasksキーが存在するか確認
      const tasks =
        todayData.hasOwnProperty("tasks") && todayData.tasks.length > 0
          ? todayData.tasks
          : [{ title: "No Data", hours: "0", minutes: "0", seconds: "0" }];

      const labels = tasks.map((task) => task.title);
      const datasetData = tasks.map((task) =>
        (timeToSeconds(task.hours, task.minutes, task.seconds) / 3600).toFixed(
          1
        )
      );

      // データを大きい順にソート
      const sortedData = labels
        .map((label, index) => ({
          label: label,
          data: datasetData[index],
        }))
        .sort((a, b) => b.data - a.data);

      // ソート後のラベルとデータセット
      const sortedLabels = sortedData.map((item) => item.label);
      const sortedDatasetData = sortedData.map((item) => item.data);

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

      const datas = {
        labels: [``],
        datasets: sortedLabels.map((label, index) => ({
          label: label,
          data: [sortedDatasetData[index]], // ソート後の各タスクのデータ
          backgroundColor: colors[index % colors.length],
        })),
      };

      const options = {
        plugins: {
          title: {
            display: true,
            text: [
              `${new Date().getMonth() + 1}/${new Date().getDate()}の学習時間`,
            ],
          },
          tooltip: {
            intersect: false,
            callbacks: {
              title: function (tooltipItems) {
                return ``;
              },
              label: function (tooltipItem) {
                const datasetLabel = tooltipItem.dataset.label;
                const value = parseFloat(tooltipItem.raw);
                return datasetLabel !== "No Data"
                  ? `${datasetLabel}: ${value.toFixed(1)} hours`
                  : "データがありません";
              },
              footer: function () {
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
              text: "時間 (h)",
            },
          },
        },
      };

      const stackedBarChart = new Chart(ctx, {
        type: "bar",
        data: datas,
        options: options,
      });
    });
}
