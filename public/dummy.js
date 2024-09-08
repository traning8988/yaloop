document.getElementById('add-1h-btn').addEventListener('click', function() {
  addRuby("Ruby");
});

document.getElementById('add-1h-btn1').addEventListener('click', function() {
  addRuby("Next.js");
});

document.getElementById('add-1h-btn2').addEventListener('click', function() {
  addRuby("オブジェクト指向");
});


function addRuby(task) { 
  fetch('/add_record', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('Record added successfully:', data);
      restartServer(); // サーバー再起動
    } else {
      console.error('Error adding record:', data.message);
    }
  })
  .catch(error => {
    console.error('Error adding record:', error);
  });
}




// function addRuby() { 
//   fetch('/add_record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "task": task })
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Record added successfully:', data);
//     // ここで必要な更新処理を行う（例：グラフの更新など）
//     restartServer()
//   })
//   .catch(error => {
//     console.error('Error adding record:', error);
//   });
// }



// function addRuby() { 
//   fetch('/add_record', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ "task": task })
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Record added successfully:', data);
//     // ここで必要な更新処理を行う（例：グラフの更新など）
//     restartServer()
//   })
//   .catch(error => {
//     console.error('Error adding record:', error);
//   });
// }


