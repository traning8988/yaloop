// function fetchReportById(id) {
//     fetch(`/data/${id}`)
//         .then(response => response.json())
//         .then(data => {
//             displayReport(data);
//         })
//         .catch(error => {
//             console.error("Error fetching report:", error);
//         });
// }

// function displayReport(report) {
//     const reportDiv = document.getElementById("report");
//     reportDiv.innerHTML = `
//         <p>ID: ${report.id}</p>
//         <p>Description: ${report.description}</p>
//         <p>User ID: ${report.user_id}</p>
//         <p>Created At: ${report.created_at}</p>
//         <p>Updated At: ${report.updated_at}</p>
//     `;
// }

// document.getElementById("prev").addEventListener("click", () => {
//     fetchReportById(2);  // id 2 のデータに切り替え
// });

// // 初期表示としてid=1のデータを表示する場合
// window.onload = () => {
//     fetchReportById(1);
// };