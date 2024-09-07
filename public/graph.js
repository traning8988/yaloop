import { graphToday } from "./graphToday.js";
import { graphMonth } from "./graphMonth.js";

// 各ページの要素を取得
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

// ページを表示・非表示にする関数
function showPage(pageToShow) {
  // すべてのページを非表示にする
  page1.classList.add("hidden");
  page2.classList.add("hidden");

  // 指定されたページを表示する
  pageToShow.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  graphToday();
});
// ボタンのクリックイベントに関数を割り当て
document.getElementById("btnPage1").addEventListener("click", function () {
  showPage(page1);
  graphToday();
});

document.getElementById("btnPage2").addEventListener("click", function () {
  showPage(page2);
  graphMonth();
});
