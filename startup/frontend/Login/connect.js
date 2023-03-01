async function connectUser() {
    const dados = {
        email: document.querySelector('#typeEmail').value,
        password: document.querySelector('#typePassword').value,
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    

    await fetch('http://localhost:4000/signin', options)
        .then(response => response.json())
        .then(resp => {
            const SuccessMsg = document.querySelector('#text-success')
            SuccessMsg.classList.remove('d-none');

            const IconSuccess = document.getElementById('icon-success')
            IconSuccess.classList.remove('d-none');

            const IconError = document.getElementById('icon-error');
            IconError.classList.add('d-none');
            const ErrorMsg = document.querySelector('#text-error')
            ErrorMsg.classList.add('d-none');

            setTimeout(() => {
                window.location.href = '../index.html';
              }, 1500);
        })
        .catch(error => {
            const IconError = document.getElementById('icon-error');
            IconError.classList.remove('d-none');
            
            const ErrorMsg = document.querySelector('#text-error')

            if (!dados.email || !dados.password){
                ErrorMsg.textContent = 'Informe usuário e senha!'
            } else {
                ErrorMsg.textContent = 'Usuário ou Senha Errado!'
            }
        });
}