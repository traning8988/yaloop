document.getElementById("loadData").addEventListener("click", function () {
  fetch("/data")
    .then((response) => response.json())
    .then((data) => {
      const content = document.getElementById("content");
      content.innerHTML = "";

      data.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.id}: ${item.name} - ${item.description}`;
        content.appendChild(p);
      });
    })
    .catch((error) => console.error("Error loading data:", error));
});
