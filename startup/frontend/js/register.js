

function registerData() {
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

  const ErrorMsg = document.querySelector('#text-error');
  const boxError = document.getElementById('box-error');
  const boxSuccess = document.getElementById('box-success');

fetch('http://localhost:4000/signup', options)
    .then(response => {
      if(response.status === 204){
        boxSuccess.classList.remove('d-none');
        boxError.classList.add('d-none');

        document.querySelector('#typeName').value = ''
        document.querySelector('#typeEmail').value = ''
        document.querySelector('#typePassword').value = ''
        document.querySelector('#typeConfirmPassword').value = ''

        setTimeout(() => {
          window.location.href = './signin.html';
        }, 2000);

      } else {
        return response.json()
      }
    })
    .catch(error => {
      boxError.classList.remove('d-none');

      const message = error.toString();
      const removeStartQuotes = message.indexOf('"');
      const removeFinalQuotes = message.lastIndexOf('"');
      const messageWithoutQuotes = message.slice(removeStartQuotes + 1, removeFinalQuotes);
      
      ErrorMsg.textContent = messageWithoutQuotes
    });
}
