// 文字を変える関数
function changeText() {
  document.getElementById("text").innerHTML =
    "スクリプト1の関数が実行されました！";
}

document
  .getElementById("changeTextButton")
  .addEventListener("click", changeText);
