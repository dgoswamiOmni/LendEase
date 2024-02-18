document.addEventListener('DOMContentLoaded', function () {
    var btnLogin = document.getElementById('do-login');
    var idLogin = document.getElementById('login');
    var username = document.getElementById('username');
    if (btnLogin && idLogin && username) {
      btnLogin.onclick = function(){
        idLogin.innerHTML = '<p>We\'re happy to see you again, </p><h1>' + username.value + '</h1>';
      }
    }else {
      console.error('One or more elements not found.');
    }
  });
  