document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault();  // フォームのデフォルトの送信を防ぐ
  
    // 入力フィールドからタスクを取得
    const taskInput = document.querySelector('.task-input').value;
    const taskDuration = math.random

  
    if (taskInput) {
      const li = document.createElement('li');
      li.classList.add("report-task");
      
      // 現在の .report-task 要素を取得
      const reportTasksContainer = document.querySelector('.report-tasks');
      const reportTasks = reportTasksContainer.querySelectorAll('.report-task');
      console.log(reportTasks)
      
      // 要素の数が偶数の場合にクラスを追加
      if (reportTasks.length % 2 === 0) {
        li.classList.add("oddtask-color");
      }else {
        li.classList.add("eventask-color");
      }
      
      // 新しいリストアイテムをコンテナに追加
      reportTasksContainer.appendChild(li);
      // console.log(reportTasks.length)
      
       // タスクタイトルの<p>を作成
       const taskTitle = document.createElement('p');
       taskTitle.classList.add("task-title");
       taskTitle.textContent = taskInput;
  
       const taskTime = document.createElement('p');
       taskTime.classList.add("task-time");
       taskTime.textContent = "now-working";
       
       // <p>を<li>に追加
       li.appendChild(taskTitle);
       li.appendChild(taskTime);
       
       // <li>を<ul>に追加
       document.querySelector('.report-tasks').appendChild(li);
  
  
       // 入力フィールドをクリア
       document.querySelector('.task-input').value = '';
    }
  });