window.onload = loadLegends();



function loadLegends() {
  document.getElementById('legends').innerHTML = '<li><strong>[]</strong><span contenteditable="" onkeyup="readLegends()">add some label here</span><a href="javascript:void(0)" onclick="removeLegend(this)">x</a></li>';
  var data = localStorage.getItem('legend');
  if(data) {
    document.getElementById('legends').innerHTML = data;
  }
}

function readLegends() {
  var data =  document.getElementById('legends').innerHTML;
  console.log(data);
  window.localStorage.setItem('legend', data);
}

function addLegend() {
  var li = document.createElement('li');
  li.innerHTML = '<strong>[]</strong><span contenteditable onkeydown="readLegends()">add some label here</span><a href="javascript:void(0)" onclick="removeLegend(this)">x</a>';
  document.getElementById('legends').appendChild(li);
  readLegends();
}

function removeLegend(elem) {
  elem.parentNode.parentNode.removeChild(elem.parentNode);
  readLegends();
}

function clearLocalstorage() {
  localStorage.clear('legend');
  location.reload();
}

