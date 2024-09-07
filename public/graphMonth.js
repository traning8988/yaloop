export function graphMonth() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const ctx = document.getElementById("totalTimeChart").getContext("2d");

      // monthDataを使用してグラフを作成

      const monthData = data.total_times;

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
              text: "",
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
