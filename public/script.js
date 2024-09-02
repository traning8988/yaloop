document.getElementById("loadData").addEventListener("click", function () {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const content = document.getElementById("content");
      content.innerHTML = "";

      data.forEach((item) => {
        const p = document.createElement("p");
        p.className = "report-totaltime"; // クラス名を設定
        // p.textContent = `${item.id}: ${item.name} - ${item.description} - ${item.duration}`;
        p.textContent = `学習時間: ${item.duration_hour}時間${item.duration_minute}分`;
        content.appendChild(p);
      });
    })
    .catch((error) => console.error("Error loading data:", error));
});
