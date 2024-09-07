export function graphMonth() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const ctx = document.getElementById("totalTimeChart").getContext("2d");

      // monthDataを使用してグラフを作成

      const monthData = [
        { date: "2024-08-10", total_time: "03:52:00" },
        { date: "2024-08-11", total_time: "05:10:45" },
        { date: "2024-08-12", total_time: "06:15:30" },
        { date: "2024-08-13", total_time: "04:25:18" },
        { date: "2024-08-14", total_time: "07:05:00" },
        { date: "2024-08-15", total_time: "04:48:30" },
        { date: "2024-08-16", total_time: "05:33:15" },
        { date: "2024-08-17", total_time: "03:40:00" },
        { date: "2024-08-18", total_time: "06:22:45" },
        { date: "2024-08-19", total_time: "12:55:30" },
        { date: "2024-08-20", total_time: "06:00:00" },
        { date: "2024-08-21", total_time: "05:10:15" },
        { date: "2024-08-22", total_time: "03:45:30" },
        { date: "2024-08-23", total_time: "06:20:00" },
        { date: "2024-08-24", total_time: "05:42:30" },
        { date: "2024-08-25", total_time: "04:30:00" },
        { date: "2024-08-26", total_time: "06:50:45" },
        { date: "2024-08-27", total_time: "05:20:30" },
        { date: "2024-08-28", total_time: "07:10:00" },
        { date: "2024-08-29", total_time: "06:40:20" },
        { date: "2024-08-30", total_time: "04:25:00" },
        { date: "2024-08-31", total_time: "05:52:00" },
        { date: "2024-09-01", total_time: "06:18:30" },
        { date: "2024-09-02", total_time: "05:47:10" },
        { date: "2024-09-03", total_time: "04:08:00" },
        { date: "2024-09-04", total_time: "07:17:00" },
        { date: "2024-09-05", total_time: "06:30:07" },
        { date: "2024-09-06", total_time: "04:21:20" },
        { date: "2024-09-07", total_time: "05:25:00" },
      ];

      const formattedDates = monthData.map((item) => {
        const date = new Date(item.date);
        const formatter = new Intl.DateTimeFormat("ja-JP", {
          month: "numeric",
          day: "numeric",
        });
        return formatter.format(date); // M/D形式で表示
      });

      // 時間を"HH:MM:SS"から小数の時間（例: 3.5時間）に変換する関数
      function timeToHours(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return hours + minutes / 60 + seconds / 3600;
      }

      // ラベル（X軸）とデータ（Y軸）の配列を作成
      const labels = monthData.map((item) => item.date);
      const datas = monthData.map((item) => timeToHours(item.total_time));

      // グラフのデータセット
      const chartData = {
        labels: formattedDates,
        datasets: [
          {
            label: "学習時間 (時間)",
            data: datas,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      };

      // グラフのオプション
      const options = {
        plugins: {
          title: {
            display: true,
            text: "過去1ヶ月の学習時間",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return `学習時間: ${value.toFixed(2)} 時間`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "日付",
            },
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "時間 (h)",
            },
          },
        },
      };

      // グラフの作成
      const learningTimeChart = new Chart(ctx, {
        type: "line", // 折れ線グラフ
        data: chartData,
        options: options,
      });
    });
}
