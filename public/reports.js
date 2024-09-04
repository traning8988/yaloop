document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();  // フォームのデフォルトの送信を防ぐ
//バックエンド側に情報を渡す　なんか渡したらなんか帰ってくる。
//成功したらデータを追加、失敗したら追加しない。
//　データを送信＆データを取得　fetch
// if (!result) {
//   window.alert('失敗');
//   return;
// }
// 入力フィールドからタスクを取得
  const taskInput = document.querySelector('.task-input').value;

  if (taskInput) {
    const li = document.createElement('li');
    li.classList.add("report-task");
    
    // 現在の .report-task 要素を取得
    const reportTasksContainer = document.querySelector('.report-tasks');
    const reportTasks = reportTasksContainer.querySelectorAll('.report-task');
    // console.log(reportTasks)
    
    // 要素の数が偶数の場合にクラスを追加
    if (reportTasks.length % 2 === 0) {
      li.classList.add("oddtask-color");
    }else {
      li.classList.add("eventtask-color");
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

document.addEventListener("DOMContentLoaded", function() {
  const reportTasksContainer = document.querySelector('.report-tasks');
  const updateFontSize = () => {
      const reportTasks = reportTasksContainer.querySelectorAll('.report-task');
      
      if (reportTasks.length >= 6) { // 6つ以上でフォントサイズを24px
          reportTasks.forEach(task => {
              const paragraphs = task.querySelectorAll('p');
              paragraphs.forEach(p => {
                  p.style.fontSize = '20px'; // フォントサイズを24pxに変更
              });
          });
      } else if (reportTasks.length >= 5) { // 4つ以上でフォントサイズを28px
          reportTasks.forEach(task => {
              const paragraphs = task.querySelectorAll('p');
              paragraphs.forEach(p => {
                  p.style.fontSize = '24px'; // フォントサイズを28pxに変更
              });
          });
      }  else if (reportTasks.length >= 4) { // 4つ以上でフォントサイズを28px
        reportTasks.forEach(task => {
            const paragraphs = task.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.fontSize = '28px'; // フォントサイズを28pxに変更
            });
        });
    } else {
          reportTasks.forEach(task => {
              const paragraphs = task.querySelectorAll('p');
              paragraphs.forEach(p => {
                  p.style.fontSize = ''; // 元のサイズに戻す
              });
          });
      }
  };

  // 初期ロード時にチェック
  updateFontSize();

  // タスクが追加されたときにもチェック
  document.getElementById("btn").addEventListener("click", function() {
      setTimeout(updateFontSize, 10); // 新しいタスクが追加された後にチェック
  });
});

