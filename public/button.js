document.addEventListener("DOMContentLoaded", function() {
    const button1 = document.getElementById('db-yesterday');
    const button2 = document.getElementById('yesterday');
    const button3 = document.getElementById('today');
  
    // 1番目のボタンを押したときの処理
    button1.addEventListener('click', function() {
      button1.style.display = 'none'; // 1を非表示
      button2.style.display = 'inline-block'; // 2を表示
      button3.style.display = 'none'; // 3を非表示
    });
  
    // 2番目のボタンを押したときの処理
    button2.addEventListener('click', function() {
      button1.style.display = 'inline-block'; // 1を表示
      button2.style.display = 'none'; // 2を非表示
      button3.style.display = 'inline-block'; // 3を表示
    });
  
    // 3番目のボタンを押したときの処理
    button3.addEventListener('click', function() {
      button1.style.display = 'none'; // 1を非表示
      button2.style.display = 'inline-block'; // 2を表示
      button3.style.display = 'none'; // 3を非表示
    });
  
    // 初期状態でボタン1と3を非表示にし、2のみ表示
    button1.style.display = 'inline-block';
    button2.style.display = 'none';
    button3.style.display = 'inline-block';
  });