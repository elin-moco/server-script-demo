setTimeout(function() {
  var xhr = new XMLHttpRequest();
  xhr.open('get', '/api/lazy');

  xhr.onreadystatechange = function() {
    var DONE = 4;
    var OK = 200;
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        var response = JSON.parse(xhr.responseText);
        var p1 = document.createElement('h1');
        p1.textContent = response.title;
        var p2 = document.createElement('p');
        p2.textContent = response.description;
        document.body.appendChild(p1);
        document.body.appendChild(p2);
      } else {
        alert('Error: ' + xhr.status);
      }
    }
  };
  xhr.send(null);
}, 3000);