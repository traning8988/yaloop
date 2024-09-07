//save.js
document.getElementById("save-btn").addEventListener("click", function (event) {
  event.preventDefault();  // フォームのデフォルトの送信を防ぐ

  const reportForm = document.querySelector('.editable-area').innerText;
  fetch('/save_report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: reportForm }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      console.log('Report saved successfully');
      alert("本日もお疲れ様でした！！")
    } else {
      console.error('Failed to save report:', data.message);
      alert("失敗しました")
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});