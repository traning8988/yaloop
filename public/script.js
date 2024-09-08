function fetchDataAndUpdate() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      // content要素の取得と更新
      const todayData = data.today;

      const dateToday = document.getElementById("dateToday");
      if (dateToday) {
        dateToday.innerHTML = "";

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const dateParagraph = document.createElement("p");
        dateParagraph.className = "";
        dateParagraph.textContent = `${year} / ${month} / ${day}`;
        dateToday.appendChild(dateParagraph);
      }

      const content = document.getElementById("content");
      if (content) {
        content.innerHTML = "";

        // `duration_hour` と `duration_minute` が存在しない場合にデフォルト値を設定
        const durationHour = todayData.duration_hour || "00";
        const durationMinute = todayData.duration_minute || "00";

        // 学習時間を表示する要素を作成
        const timeParagraph = document.createElement("p");
        timeParagraph.className = "report-totaltime"; // クラス名を設定
        timeParagraph.textContent = `Total: ${durationHour}時間 ${durationMinute}分`;
        content.appendChild(timeParagraph);
      }

      // task要素の取得と更新
      const taskContainer = document.getElementById("report-tasks");
      if (taskContainer) {
        taskContainer.innerHTML = "";

        // タスクのリストを生成
        todayData.tasks.forEach((task, index) => {
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

      // 現在の .report-task 要素を取得
      const reportTasksContainer = document.querySelector(".report-tasks");
      const reportTasks = reportTasksContainer.querySelectorAll(".report-task");
      // console.log(reportTasks)

      const reportContent = document.getElementById("editable-area");
      if (reportContent) {
        reportContent.innerHTML = "";

        // 学習時間を表示する要素を作成
        const reportParagraph = document.createElement("p");
        reportParagraph.className = ""; // クラス名を設定
        reportParagraph.textContent = `${todayData.description}`;
        reportContent.appendChild(reportParagraph);
      }

      const userContent = document.getElementById("user-name");
      if (userContent) {
        userContent.innerHTML = "";

        // 学習時間を表示する要素を作成
        const userParagraph = document.createElement("p");
        userParagraph.className = ""; // クラス名を設定
        userParagraph.textContent = `${todayData.user.name}`;
        userContent.appendChild(userParagraph);
      }
    })
    .catch((error) => console.error("Error loading data:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndUpdate();
});

document.addEventListener("DOMContentLoaded", function () {
  function recallTodayData() {
    const selectData = data.today;

    const dateToday = document.getElementById("dateToday");
    if (dateToday) {
      dateToday.innerHTML = "";

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const dateParagraph = document.createElement("p");
      dateParagraph.className = "";
      dateParagraph.textContent = `${year} / ${month} / ${day}`;
      dateToday.appendChild(dateParagraph);
    }

    console.log("------------today-------------");
    console.log(selectData.duration_hour);
    console.log(selectData.duration_minute);

    const date = document.getElementById("dateToday");
    if (date) {
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
      timeParagraph.textContent = `Total: ${selectData.duration_hour}時間 ${selectData.duration_minute}分`;
      content.appendChild(timeParagraph);
    }

    const taskContainer = document.getElementById("report-tasks");
    if (taskContainer) {
      taskContainer.innerHTML = "";

      // タスクのリストを生成
      selectData.tasks.forEach((task, index) => {
        // ここをselectData.tasksに修正
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
      reportParagraph.textContent = `${selectData.description}`;
      reportContent.appendChild(reportParagraph);
    }
  }

  document
    .getElementById("today")
    .addEventListener("click", fetchDataAndUpdate);
});

//yesterdayの関数
document.addEventListener("DOMContentLoaded", function () {
  function recallYesterdayData() {
    const selectData = data.yesterday;

    const dateYesterday = document.getElementById("dateYesterday");
    if (dateYesterday) {
      dateYesterday.innerHTML = "";

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const year = yesterday.getFullYear();
      const month = yesterday.getMonth() + 1;
      const day = yesterday.getDate();

      const dateParagraph = document.createElement("p");
      dateParagraph.textContent = `${year} / ${month} / ${day}`;
      dateYesterday.appendChild(dateParagraph);
    }

    console.log("------------yesterday-------------");
    console.log(selectData.duration_hour);
    console.log(selectData.duration_minute);

    const dateYesterdays = document.getElementById("dateToday");
    if (dateYesterdays) {
      dateYesterdays.innerHTML = "";

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const year = yesterday.getFullYear();
      const month = yesterday.getMonth() + 1;
      const day = yesterday.getDate();

      const dateParagraph = document.createElement("p");
      dateParagraph.textContent = `${year} / ${month} / ${day}`;
      dateYesterdays.appendChild(dateParagraph);
    }

    const content = document.getElementById("content");

    if (content) {
      content.innerHTML = "";
      const timeParagraph = document.createElement("p");
      timeParagraph.className = "report-totaltime";
      timeParagraph.textContent = `Total: ${selectData.duration_hour}時間 ${selectData.duration_minute}分`;
      content.appendChild(timeParagraph);
    }

    const taskContainer = document.getElementById("report-tasks");
    if (taskContainer) {
      taskContainer.innerHTML = "";

      // タスクのリストを生成
      selectData.tasks.forEach((task, index) => {
        // ここをselectData.tasksに修正
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
      reportParagraph.textContent = `${selectData.description}`;
      reportContent.appendChild(reportParagraph);
    }
  }

  document
    .getElementById("prevYesterday")
    .addEventListener("click", recallYesterdayData);
});

document.addEventListener("DOMContentLoaded", function () {
  function recallYesterdayData() {
    const selectData = data.yesterday;

    console.log("------------yesterday-------------");
    console.log(selectData.duration_hour);
    console.log(selectData.duration_minute);

    const dateYesterdays = document.getElementById("dateToday");
    if (dateYesterdays) {
      dateYesterdays.innerHTML = "";

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const year = yesterday.getFullYear();
      const month = yesterday.getMonth() + 1;
      const day = yesterday.getDate();

      const dateParagraph = document.createElement("p");
      dateParagraph.textContent = `${year} / ${month} / ${day}`;
      dateYesterdays.appendChild(dateParagraph);
    }

    const content = document.getElementById("content");

    if (content) {
      content.innerHTML = "";
      const timeParagraph = document.createElement("p");
      timeParagraph.className = "report-totaltime";
      timeParagraph.textContent = `Total: ${selectData.duration_hour}時間 ${selectData.duration_minute}分`;
      content.appendChild(timeParagraph);
    }

    const taskContainer = document.getElementById("report-tasks");
    if (taskContainer) {
      taskContainer.innerHTML = "";

      // タスクのリストを生成
      selectData.tasks.forEach((task, index) => {
        // ここをselectData.tasksに修正
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
      reportParagraph.textContent = `${selectData.description}`;
      reportContent.appendChild(reportParagraph);
    }
  }

  document
    .getElementById("nextYesterday")
    .addEventListener("click", recallYesterdayData);
});

//   day_before_yesterdayの関数

document.addEventListener("DOMContentLoaded", function () {
  function recallDbyData() {
    // const selectData = data.today
    // const selectData = data.yesterday
    const selectData = data.day_before_yesterday;

    const dateDayBeforeYesterday = document.getElementById("dateToday");
    if (dateDayBeforeYesterday) {
      dateDayBeforeYesterday.innerHTML = "";

      const today = new Date();
      const dayBeforeYesterday = new Date(today);
      dayBeforeYesterday.setDate(today.getDate() - 2);

      const year = dayBeforeYesterday.getFullYear();
      const month = dayBeforeYesterday.getMonth() + 1;
      const day = dayBeforeYesterday.getDate();

      const dateParagraph = document.createElement("p");
      dateParagraph.textContent = `${year} / ${month} / ${day}`;
      dateDayBeforeYesterday.appendChild(dateParagraph);
    }

    const content = document.getElementById("content");

    if (content) {
      content.innerHTML = "";
      const timeParagraph = document.createElement("p");
      timeParagraph.className = "report-totaltime";
      timeParagraph.textContent = `Total: ${selectData.duration_hour}時間 ${selectData.duration_minute}分`;
      content.appendChild(timeParagraph);
    }

    const taskContainer = document.getElementById("report-tasks");
    if (taskContainer) {
      taskContainer.innerHTML = "";

      // タスクのリストを生成
      selectData.tasks.forEach((task, index) => {
        // ここをselectData.tasksに修正
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
      reportParagraph.textContent = `${selectData.description}`;
      reportContent.appendChild(reportParagraph);
    }
  }
  document
    .getElementById("dbYesterday")
    .addEventListener("click", recallDbyData);
});

document.addEventListener("DOMContentLoaded", function () {
  const dbyBtn = document.getElementById("dbYesterday");
  const pydBtn = document.getElementById("prevYesterday");
  const nydBtn = document.getElementById("nextYesterday");
  const tdyBtn = document.getElementById("today");

  // day-before-Yesterdayが表示されているとき
  dbyBtn.addEventListener("click", function () {
    dbyBtn.style.display = "none";
    pydBtn.style.display = "none";
    nydBtn.style.display = "inline-block"; // nextYesterdayボタンだけ表示
    tdyBtn.style.display = "none";
  });

  // Yesterdayが表示されているとき
  pydBtn.addEventListener("click", function () {
    dbyBtn.style.display = "inline-block"; // dbYesterdayボタンを表示
    pydBtn.style.display = "none";
    nydBtn.style.display = "none";
    tdyBtn.style.display = "inline-block"; // todayボタンを表示
  });

  //Today(初期状態)が表示されているとき
  nydBtn.addEventListener("click", function () {
    dbyBtn.style.display = "inline-block"; // dbYesterdayボタンを表示
    pydBtn.style.display = "none";
    nydBtn.style.display = "none";
    tdyBtn.style.display = "inline-block"; // todayボタンを表示
  });

  tdyBtn.addEventListener("click", function () {
    dbyBtn.style.display = "none";
    pydBtn.style.display = "inline-block"; // prevYesterdayボタンだけ表示
    nydBtn.style.display = "none";
    tdyBtn.style.display = "none";
  });

  // Today(初期状態)が表示されているとき
  dbyBtn.style.display = "none";
  pydBtn.style.display = "inline-block"; // prevYesterdayボタンだけ表示
  nydBtn.style.display = "none";
  tdyBtn.style.display = "none";
});
