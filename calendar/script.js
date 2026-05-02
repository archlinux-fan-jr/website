// these are human-readable month name labels, in order
monthlyNames = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];

// these are the days of the week for each month, in order
daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

weekStartDay = 0;

// this is the current date
currentDate = new Date();

function calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? currentDate.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? currentDate.getFullYear() : year;
  this.html = '';

  // get first day of month
  var firstDay = new Date(this.year, this.month, 0);
  var startingDay = firstDay.getDay();

  // set new first day of the week using setStartDay() function
  startingDay = startingDay - weekStartDay;
  if( startingDay < 0) {
    startingDay = startingDay + 7;
  }

  // find number of days in month
  var monthLength = daysInMonth[this.month];

  // compensate for leap year
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      monthLength = 29;
    }
  }

  // do the header
  var monthName = monthlyNames[this.month]
  var html = '<ul class="calendar"><li><ul>';

  // fill in the days
  var day = 1;
  // this loop is for is weeks (rows)
  for (var i = 0; i < 6; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j < 7; j++) {
      html += '<li';
      if(5-weekStartDay == j || (weekStartDay == j && j == 6)) html += ' class="saturday"';
      if(6-weekStartDay == j || weekStartDay == j-6) html += ' class="sunday"';
      html += '>';
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        html += '<span>' + day + '</span>';
        day++;
      }
      if(startingDay > 2 && i == 0 && j == 0 || startingDay <= 2 && i == 4 && j == 6)  {
        html += '<h3>' + monthName + '<br />'  + this.year + '</h3>';
      }
      if(startingDay <= 2 && i == 3 && j == 6 && day > monthLength)  {
        html += '</ul></li><li><ul><li></li><li></li><li></li><li></li><li></li><li></li><li><h3>' + monthName + '<br />'  + this.year + '</h3>';
      }
      html += '</li>';
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</ul></li><li><ul>';
    }
  }
  html += '</ul></li></ul>';
  return html;
}


window.onload = loadEverthing();

function loadEverthing() { // load input fields + generate calendar
  var monthsData = localStorage.getItem('calMonthlyNames');
  if(monthsData) {
    monthlyNames = JSON.parse(monthsData);
    fillNewLabelsFromLS();
  }

	document.getElementById('calendar').innerHTML = calendar();
}

function generateCals() {
  var months = document.getElementById("selectMonths").value;
  var thisYear = currentDate.getFullYear();
  var html = "";

  monthlyNames = readNewLabels("mon", 12);

  for (var i = 0 ; i < months; i++) {
    html += calendar(i%12, thisYear + Math.floor(i / 12 ));
  }
  document.getElementById('calendar').innerHTML = html;
}

function readNewLabels(id, numberOfLabels) {
  var labelName = "";
  var labelArray = new Array();

  for (var i = 0 ; i < numberOfLabels; i++) {
    labelName = document.getElementById(id + (i+1)).value;
    labelArray[i] = labelName;
  }
  return labelArray;
}

function fillNewLabelsFromLS() {
  var monthsData = localStorage.getItem('calMonthlyNames');
  var months = JSON.parse(monthsData);

  for (var i = 0 ; i < 12; i++) {
    document.getElementById("mon" + (i+1)).value = months[i];
  }
}

function saveLabelsToLocalstorage() {
  var months = readNewLabels("mon", 12);
  window.localStorage.setItem('calMonthlyNames', JSON.stringify(months));
}

function clearLocalstorage() {
  localStorage.clear('calMonthlyNames');
  location.reload();
}

function setStartDay() {
  var e = document.getElementById("weekStartDay");
  weekStartDay = parseInt(e.options[e.selectedIndex].value);
  document.getElementById('calendar').innerHTML = calendar();
}

function changeColor() {
  var newCSS = document.getElementById("changeColor").value;
  var all = document.getElementsByClassName('calendar');
  for (var i = 0; i < all.length; i++) {
    all[i].style.color = newCSS;
  }
}

function changeBackgroundColor() {
  var newCSS = document.getElementById("changeBackgroundColor").value;
  document.body.style.backgroundColor = newCSS;
}

function changeBorderColors() {
  var newCSS = document.getElementById("changeBorderColor").value;
  var all = document.getElementsByClassName('calendar')[0].getElementsByTagName("span");
  for (var i = 0; i < all.length; i++) {
    all[i].style.borderColor = newCSS;
  }
}

function changeBorderColor() {
  var newCSS = document.getElementById("changeBorderColor").value;
  var allClass = document.getElementsByClassName('calendar');
  for (var i=0; i < allClass.length; i++) {
    allClass[i].style.borderColor = newCSS;
    var allSpan = document.getElementsByClassName('calendar')[i].getElementsByTagName("span");
    for (var j = 0; j < allSpan.length; j++) {
      allSpan[j].style.borderColor = newCSS;
    }
  }
}

function changeBackgroundImage() {
  var newCSS = document.getElementById("changeBackgroundImage").value;
  var all = document.getElementsByClassName('calendar');
  for (var i = 0; i < all.length; i++) {
    all[i].style.background = 'url(' + newCSS + ') no-repeat 50% 50%';
  }
}

function changeLayout() {
  var e = document.getElementById("changeLayout");
  var cssFile = "css/layout/" + e.options[e.selectedIndex].value;
  console.log(cssFile);

  var oldlink = document.getElementsByTagName("link").item(3);
  var newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("href", cssFile);

  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
