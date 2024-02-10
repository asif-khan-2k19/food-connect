// Dynamically getting time in donate page
window.onload = function() {
  var currentTimeInput = document.getElementById('currentTime');
  var currentDateInput = document.getElementById('currentDate');
  
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var currentTime = hours + ':' + minutes;

  currentTimeInput.value = currentTime;
  
  var year = now.getFullYear().toString().padStart(4, '0');
  var month = (now.getMonth() + 1).toString().padStart(2, '0');
  var day = now.getDate().toString().padStart(2, '0');
  var currentDate = year + '-' + month + '-' + day;
  
  currentDateInput.value = currentDate;
};
