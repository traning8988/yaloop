export function graphMonth() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const ctx = document.getElementById("totalTimeChart").getContext("2d");

      const monthData = data.total_times;

      // 現在の日付から1ヶ月前までの日付を配列で生成
      const today = new Date();
      const oneMonthAgo = new Date(today);
      oneMonthAgo.setMonth(today.getMonth() - 1);

      const getDateRange = (start, end) => {
        const dateArray = [];
        let currentDate = start;
        while (currentDate <= end) {
          dateArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateArray;
      };

      const dateRange = getDateRange(oneMonthAgo, today);

      // 日付フォーマットを"M/D"形式にする関数
      const formatToMD = (date) => {
        const formatter = new Intl.DateTimeFormat("ja-JP", {
          month: "numeric",
          day: "numeric",
        });
        return formatter.format(date);
      };

      // monthDataの日付をマップとして整理
      const monthDataMap = {};
      monthData.forEach((item) => {
        monthDataMap[item.date] = item.total_time;
      });

      // 日付範囲全体に対して、データがある場合はその値、ない場合は0をセット
      const labels = dateRange.map((date) => formatToMD(date));
      const datas = dateRange.map((date) => {
        const formattedDate = date.toISOString().split("T")[0];
        return monthDataMap[formattedDate]
          ? timeToHours(monthDataMap[formattedDate])
          : 0; // データがなければ0を設定
      });

      // 時間を"HH:MM:SS"から小数の時間に変換する関数
      function timeToHours(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return hours + minutes / 60 + seconds / 3600;
      }

      // グラフのデータセット
      const chartData = {
        labels: labels, // 補完された日付範囲
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
