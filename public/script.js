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
        timeParagraph.textContent = `学習時間: ${data.duration_hour}時間 ${data.duration_minute}分`;
        content.appendChild(timeParagraph);
      }

      // task要素の取得と更新
      const taskContainer = document.getElementById("report-tasks");
      if (taskContainer) {
        taskContainer.innerHTML = "";
    
        // タスクのリストを生成
        data.tasks.forEach((task) => {
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
    
          taskContainer.appendChild(taskDiv);
        });
      }
    })
    .catch((error) => console.error("Error loading data:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndUpdate();
});
