document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();  // フォームのデフォルトの送信を防ぐ

  // 入力フィールドからタスクを取得
  const taskInput = document.querySelector('.task-input').value;

  if (taskInput) {
    // 新しいリストアイテムを作成
    const li = document.createElement('li');
    li.classList.add("report-task");
    
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

    // AJAXリクエストを送信
    fetch('/add_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: taskInput }),
    })
    .then(response => response.json())
    .rthen(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', eror);
    });
  }
});