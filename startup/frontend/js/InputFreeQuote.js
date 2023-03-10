function registerData() {
    const dados = {
      name: document.querySelector('#typeName').value,
      email: document.querySelector('#typeEmail').value,
      service: document.querySelector('#typeService').value,
      message: document.querySelector('#typeMessage').value
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(dados),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const msgError = document.querySelector('#msg-error');
    const boxError = document.querySelector('#box-error');

    const boxSuccess= document.querySelector('#box-success');
  
  fetch('http://localhost:4000/FreeQuote', options)
      .then(response => {
        if(response.status === 204){
          boxError.classList.add('d-none');
          boxSuccess.classList.remove('d-none');

          document.querySelector('#typeName').value = ''
          document.querySelector('#typeEmail').value = ''
          document.querySelector('#typeService').value = ''
          document.querySelector('#typeMessage').value = ''

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
        
        msgError.textContent = messageWithoutQuotes});
    }