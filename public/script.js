function fetchDataAndUpdate() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      // content要素の取得と更新
      const content = document.getElementById("content");
      if (content) {
        content.innerHTML = "";

        // 学習時間を表示する要素を作成
        const timeParagraph = document.createElement("p");
        timeParagraph.className = "report-totaltime"; // クラス名を設定
        timeParagraph.textContent = `Total: ${data.duration_hour}時間 ${data.duration_minute}分`;
        content.appendChild(timeParagraph);
      }

      // task要素の取得と更新
      const taskContainer = document.getElementById("report-tasks");
      if (taskContainer) {
        taskContainer.innerHTML = "";

        // タスクのリストを生成
        data.tasks.forEach((task, index) => {
          const taskDiv = document.createElement("div");
          taskDiv.className = "report-task"; // タスクコンテナのクラス名

          const taskTitle = document.createElement("p");
          taskTitle.className = "task-title"; // タスクタイトルのクラス名
          taskTitle.textContent = task.title;

          const taskTime = document.createElement("p");
          taskTime.className = "task-time"; // タスク時間のクラス名
          taskTime.textContent = task.time;

          taskDiv.appendChild(taskTitle);
          taskDiv.appendChild(taskTime);

          if (index % 2 === 0) {
            taskDiv.classList.add("oddtask-color");
          } else {
            taskDiv.classList.add("eventtask-color");
          }
          taskContainer.appendChild(taskDiv);
        });

        // タスクの数に応じてフォントサイズを変更
        const reportTasks = document.querySelectorAll(".report-task"); // ここで再取得する

        reportTasks.forEach((task) => {
          const paragraphs = task.querySelectorAll("p");

          // フォントサイズの設定
          if (reportTasks.length >= 6) {
            paragraphs.forEach((p) => {
              p.style.fontSize = "17px";
            });
          } else if (reportTasks.length >= 5) {
            paragraphs.forEach((p) => {
              p.style.fontSize = "21px";
            });
          } else if (reportTasks.length >= 4) {
            paragraphs.forEach((p) => {
              p.style.fontSize = "25px";
            });
          } else if (reportTasks.length >= 3) {
            paragraphs.forEach((p) => {
              p.style.fontSize = "27px";
            });
          } else {
            paragraphs.forEach((p) => {
              p.style.fontSize = ""; // 元のサイズに戻す
            });
          }
        });
      }

      // 現在の .report-task 要素を取得
      const reportTasksContainer = document.querySelector(".report-tasks");
      const reportTasks = reportTasksContainer.querySelectorAll(".report-task");
      // console.log(reportTasks)

      // 要素の数が偶数の場合にクラスを追加
      if (reportTasks.length % 2 === 0) {
        div.classList.add("oddtask-color");
      } else {
        div.classList.add("eventtask-color");
      }

      const reportContent = document.getElementById("report-content");
      if (reportContent) {
        reportContent.innerHTML = "";

        // 学習時間を表示する要素を作成
        const reportParagraph = document.createElement("p");
        reportParagraph.className = ""; // クラス名を設定
        reportParagraph.textContent = `日報\n ${data.description}`;
        reportContent.appendChild(reportParagraph);
      }

      const userContent = document.getElementById("user-name");
      if (userContent) {
        userContent.innerHTML = "";

        // 学習時間を表示する要素を作成
        const userParagraph = document.createElement("p");
        userParagraph.className = ""; // クラス名を設定
        userParagraph.textContent = `${data.user.name}`;
        userContent.appendChild(userParagraph);
      }
    })
    .catch((error) => console.error("Error loading data:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndUpdate();
});
