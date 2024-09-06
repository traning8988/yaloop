import { toggleCountUp } from './countUp.js';

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
        toggleCountUp();
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
    fetch('/end_task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task ended:', data);
      toggleCountUp();
      const reportTasksContainer = document.querySelector('.report-tasks');
      const lastTask = reportTasksContainer.lastElementChild;
      
      if (lastTask) {
        // lastTask内のtask-timeクラスを持つ要素を見つけて更新
        const taskTimeElement = lastTask.querySelector('.task-time');
        if (taskTimeElement) {
          taskTimeElement.textContent = ""; // または data.end_time などのサーバーからの値
        }
      }
      document.querySelector('.task-input').value = '';
    })
    .catch(error => {
      console.error('Error:', error);
    });
    main_restartServer()
    // ボタンをスタートボタンに変更
    const button = document.getElementById("btn");
    button.textContent = "Start";
    button.style.backgroundColor = "#FF7D11"
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
                  p.style.fontSize = '17px'; // フォントサイズを24pxに変更
              });
          });
      } else if (reportTasks.length >= 5) { // 4つ以上でフォントサイズを28px
          reportTasks.forEach(task => {
              const paragraphs = task.querySelectorAll('p');
              paragraphs.forEach(p => {
                  p.style.fontSize = '21px'; // フォントサイズを28pxに変更
              });
          });
      }  else if (reportTasks.length >= 4) { // 4つ以上でフォントサイズを28px
        reportTasks.forEach(task => {
            const paragraphs = task.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.fontSize = '25px'; // フォントサイズを28pxに変更
            });
        });
      }  else if (reportTasks.length >= 3) { // 4つ以上でフォントサイズを28px
        reportTasks.forEach(task => {
            const paragraphs = task.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.fontSize = '27px'; // フォントサイズを28pxに変更
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


function main_restartServer() {
  fetch('/restart', { method: 'POST' })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Server restart failed');
      }
    })
    .then(data => {
      console.log(data);
      // サーバー再起動後にページをリロード
      checkServerStatusAndReload();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('サーバー再起動に失敗しました。');
    });
}

function checkServerStatusAndReload() {
  // サーバーが再起動したかどうかをチェックする
  const checkInterval = setInterval(() => {
    fetch('/data') // サーバーが正常に動作しているか確認するためのエンドポイント
      .then(response => {
        if (response.ok) {
          clearInterval(checkInterval);
          window.location.reload(); // サーバーが再起動したらリロード
        }
      })
      .catch(error => {
        console.error('Server is not ready yet:', error);
      });
  }, 1000); // 1秒ごとにチェック
}