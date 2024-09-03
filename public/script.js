function fetchDataAndUpdate() {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const content = document.getElementById("content");
      content.innerHTML = "";

      // dataはオブジェクトなので、直接プロパティにアクセスします
      const p = document.createElement("p");
      p.className = "report-totaltime"; // クラス名を設定
      p.textContent = `学習時間: ${data.duration_hour}時間 ${data.duration_minute}分`;
      content.appendChild(p);
    })
    .catch((error) => console.error("Error loading data:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndUpdate();
});
