const data = {
    "today": {
      "duration_hour": "06",
      "duration_minute": "30",
      "duration_second": "07",
      "description": "successful get today date description!!",
      "tasks": [
        {"title": "Ruby today", "hours": "01", "minutes": "15", "seconds": "00"},
        {"title": "チームミーティング", "hours": "02", "minutes": "05", "seconds": "00"},
        {"title": "JavaScript", "hours": "01", "minutes": "05", "seconds": "00"},
        {"title": "React", "hours": "02", "minutes": "05", "seconds": "00"},
        {"title": "HTML", "hours": "00", "minutes": "00", "seconds": "07"}
      ],
      "user": {
        "id": 1,
        "name": "阿川",
        "email": "agawa@example.com"
      }
    },
    "yesterday": {
      "duration_hour": "09",
      "duration_minute": "30",
      "duration_second": "07",
      "tasks": [
        {"title": "Ruby", "hours": "03", "minutes": "15", "seconds": "00"},
        {"title": "チームミーティング", "hours": "01", "minutes": "05", "seconds": "00"},
        {"title": "JavaScript", "hours": "01", "minutes": "05", "seconds": "00"},
        {"title": "React", "hours": "02", "minutes": "05", "seconds": "00"},
        {"title": "HTML", "hours": "02", "minutes": "00", "seconds": "07"}
      ],
      "user": {
        "id": 1,
        "name": "阿川",
        "email": "agawa@example.com"
      }
    },
    "day_before_yesterday": {
      "duration_hour": "08",
      "duration_minute": "30",
      "duration_second": "07",
      "tasks": [
        {"title": "Ruby", "hours": "02", "minutes": "15", "seconds": "00"},
        {"title": "チームミーティング", "hours": "02", "minutes": "05", "seconds": "00"},
        {"title": "JavaScript", "hours": "02", "minutes": "05", "seconds": "00"},
        {"title": "React", "hours": "01", "minutes": "05", "seconds": "00"},
        {"title": "HTML", "hours": "01", "minutes": "00", "seconds": "07"}
      ],
      "user": {
        "id": 1,
        "name": "阿川",
        "email": "agawa@example.com"
      }
    }
  };


document.addEventListener("DOMContentLoaded", function() {
    function recallTodayData() {
      const todayData = data.today
      console.log('------------today-------------');
      console.log(todayData.duration_hour);
      console.log(todayData.duration_minute);

      const date = document.getElementById("date");
      if(date) {
        date.innerHTML = "";
        const dateParagraph = document.createElement("p");
        dateParagraph.className = "report-date";
        dateParagraph.textContent = "today-data from JSON";
        date.appendChild(dateParagraph);
      }

      const content = document.getElementById("content");
      
      if (content) {
        content.innerHTML = "";
        const timeParagraph = document.createElement("p");
        timeParagraph.className = "report-totaltime";
        timeParagraph.textContent = `Total: ${todayData.duration_hour}時間 ${todayData.duration_minute}分`;
        content.appendChild(timeParagraph);
      }

      const taskContainer = document.getElementById("report-tasks");
      if (taskContainer) {
        taskContainer.innerHTML = "";

        // タスクのリストを生成
        todayData.tasks.forEach((task, index) => {  // ここをtodayData.tasksに修正
          const taskDiv = document.createElement("div");
          taskDiv.className = "report-task"; // タスクコンテナのクラス名

          const taskTitle = document.createElement("p");
          taskTitle.className = "task-title"; // タスクタイトルのクラス名
          taskTitle.textContent = task.title;

          const taskTime = document.createElement("p");
          taskTime.className = "task-time"; // タスク時間のクラス名
          taskTime.textContent = `${task.hours}時間${task.minutes}分`;

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

       const reportContent = document.getElementById("editable-area");
       if (reportContent) {
         reportContent.innerHTML = "";
 
         // 学習時間を表示する要素を作成
         const reportParagraph = document.createElement("div");
         reportParagraph.className = ""; // クラス名を設定
         reportParagraph.textContent = `${todayData.description}`;
         reportContent.appendChild(reportParagraph);
       }

    }
    
    
    document.getElementById("prev").addEventListener("click", recallTodayData);
  });

