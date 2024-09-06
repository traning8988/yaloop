let timerInterval;
let elapsedTime = 0;

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function toggleCountUp() {
  if (timerInterval) {
    // タイマーが動いている場合はストップする
    clearInterval(timerInterval);
    timerInterval = null;
    console.log('Timer stopped');
  } else {
    // タイマーが動いていない場合はスタートする
    timerInterval = setInterval(() => {
      elapsedTime++;
      const formattedTime = formatTime(elapsedTime);
      
      // タイマー表示を更新
      document.getElementById('timer').textContent = formattedTime;
    }, 1000);
    console.log('Timer started');
  }
}


export { toggleCountUp };
