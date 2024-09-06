const data = {
    "today": {
      "duration_hour": "06",
      "duration_minute": "30",
      "duration_second": "07",
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
      console.log('------------today-------------');
      console.log(data.today.duration_hour);
      console.log(data.today.duration_minute);

      const content = document.getElementById("content");
      if (content) {
        content.innerHTML = "";

        const timeParagraph = document.createElement("p");
        timeParagraph.className = "report-totaltime";
        timeParagraph.textContent = `Total: ${data.today.duration_hour}時間 ${data.today.duration_minute}分`;
        content.appendChild(timeParagraph);

        const taskList = document.createElement("ul");
        taskList.className = "task-list";

        const todayTasks = data.today.tasks;
        // todayTasks.forEach(task => {
        //   const taskItem = document.createElement("li");
        //   taskItem.className = "task-item";
          
        //   const taskTitle = document.createElement("p");
        //   taskTitle.className = "task-title";
        //   taskTitle.textContent = task.title;
 
        //   const taskTime = document.createElement("p");
        //   taskTime.className = "task-time";
        //   taskTime.textContent = `${task.hours}時間 ${task.minutes}分 ${task.seconds}秒`;

        //   taskItem.appendChild(taskTitle);
        //   taskItem.appendChild(taskTime);
        //   taskList.appendChild(taskItem);
        // });

        content.appendChild(taskList);
      }
    }

    document.getElementById("prev").addEventListener("click", recallTodayData);

    
  });

