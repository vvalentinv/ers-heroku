let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');
let loginSubmitButton = document.getElementById('login-submit-btn');
let loginErrorMessageDiv = document.getElementById('login-error-message')
let url_heroku = "https://ers-backend.herokuapp.com";
let url_dev = "http://127.0.0.1:8080";

loginSubmitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    let res = await fetch(`${url_heroku}/login`, {
      'credentials': 'include',
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        "username": usernameInput.value,
        "password": passwordInput.value
      })
    })
    if (res.status == 200) {
      window.location.href = '/reimb-view.html';
    } else if (res.status == 401) {
      errorElement.innerHTML = "";
      let data = await res.json();
      let errorElement = document.createElement('p');
      errorElement.innerHTML = data.message;
      errorElement.style.color = 'red';
      errorElement.style.fontWeight = 'bold';
      loginErrorMessageDiv.appendChild(errorElement);
    }
  } catch (err) {
    if (err.message == "Failed to fetch") {
      let errorElement = document.createElement('p');
      errorElement.innerHTML = err.message;
      errorElement.style.color = 'red';
      errorElement.style.fontWeight = 'bold';
      loginErrorMessageDiv.appendChild(errorElement);
    }
  }
});
