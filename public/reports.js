document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();  // フォームのデフォルトの送信を防ぐ

  if (this.textContent === "Start") {
    // スタート機能
    startTask(this);
  } else {
    // ストップ機能
    stopTask(this);
  };
  function startTask() {
    // 入力フィールドからタスクを取得
    const taskInput = document.querySelector('.task-input').value;

    if (taskInput) {
      

      

      // AJAXリクエストを送信
      fetch('/start_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskInput }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data); // レスポンスを確認
        // 新しいリストアイテムを作成
        const li = document.createElement('li');
        li.classList.add("report-task");
        
        // タスクタイトルの<p>を作成
        const taskTitle = document.createElement('p');
        taskTitle.classList.add("task-title");
        taskTitle.textContent = taskInput;

        const taskTime = document.createElement('p');
        taskTime.classList.add("task-time");
        taskTime.textContent = "";
        
        // <p>を<li>に追加
        li.appendChild(taskTitle);
        li.appendChild(taskTime);
        
        // <li>を<ul>に追加
        document.querySelector('.report-tasks').appendChild(li);
        })
      .catch(error => {
        console.error('Error:', error);
      });
      // ボタンをストップボタンに変更
      const button = document.getElementById("btn");
      button.textContent = "Stop";
      button.style.backgroundColor = "#28AF40"
    }
  }

  function stopTask() {
    // 入力フィールドをクリア
    
    fetch('/end_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task ended:', data);
      document.querySelector('.task-input').value = '';
    })
    .catch(error => {
      console.error('Error:', error);
    });
   
    // ボタンをストップボタンに変更
    const button = document.getElementById("btn");
    button.textContent = "Start";
    button.style.backgroundColor = "#FF7D11"
  }
});