function downloadVimrc() {
  var blob = new Blob([editor.getSession().getValue()], {type: 'charset=utf-8'});
  saveAs(blob, '.vimrc');

}
