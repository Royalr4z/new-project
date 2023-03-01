
async function registerData() {
  const dados = {
    name: document.querySelector('#typeName').value,
    email: document.querySelector('#typeEmail').value,
    password: document.querySelector('#typePassword').value,
    confirmPassword: document.querySelector('#typeConfirmPassword').value
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const ErrorMsg = document.querySelector('#Error')

  await fetch('http://localhost:4000/signup', options)
    .then(response => response.json())
    .then(res => {
      const iconSuccess = document.getElementById('icon-success');
      iconSuccess.classList.remove('d-none');

      const TextSuccess = document.getElementById('text-success');
      TextSuccess.classList.remove('d-none');

      setTimeout(() => {
        window.location.href = 'signin.html';
      }, 2000);
    })
    .catch(error => {
      const IconError = document.getElementById('icon-error');
      IconError.classList.remove('d-none');

      const message = error.toString();
      const removeStartQuotes = message.indexOf('"');
      const removeFinalQuotes = message.lastIndexOf('"');
      const messageWithoutQuotes = message.slice(removeStartQuotes + 1, removeFinalQuotes);

      ErrorMsg.textContent = messageWithoutQuotes
    });
}
