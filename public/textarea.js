//free-boxの編集機能
function enableEdit() {
  const div = document.getElementById('editable-area');
  const text = div.innerText.trim();

  // textareaを生成
  const textarea = document.createElement('textarea');
  textarea.value = text;
  // textarea.style.width = '440px';
  // textarea.style.height = '280px';
  textarea.class = 'free-box';
  textarea.id = 'free-box';

  // divを非表示にしてtextareaを表示
  div.style.display = 'none';
  div.parentNode.insertBefore(textarea, div);

  // textareaにフォーカスを当てる
  textarea.focus();

  // 外部をクリックしたらtextareaの内容をdivに戻す
  textarea.addEventListener('blur', function() {
    div.innerText = textarea.value.trim() || '【よかった点】【改善点】【明日へ決意】'; // 空の場合、デフォルトテキストを表示
    div.style.display = 'block';
    textarea.remove();
  });
}