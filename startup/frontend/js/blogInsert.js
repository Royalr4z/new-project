const user = document.getElementById("typeUser");

fetch('http://localhost:4000/users')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;
      user.appendChild(option); 
    });
  })
  .catch(error => {
    console.error("Erro ao buscar dados da API:", error);
  });



function Send() {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();
    
    if (mes === 1){mes = 'Jan'} if (mes === 2){mes = 'Fer'} 
    if (mes === 3){mes = 'Mar'} if (mes === 4){mes = 'Abr'} if (mes === 5){mes = 'Maio' }
    if (mes === 6){mes = 'Jun'} if (mes === 7){mes = 'Jul'} 
    if (mes === 8){mes = 'Ago'} if (mes === 9){mes = 'Set'} if (mes === 10){mes = 'Out' }
    if (mes === 11){mes = 'Nov'}if (mes === 12){mes = 'Dez'}

    const dataFormatada = `${dia}/${mes}/${ano}`;
    
    const dados = {
      date: dataFormatada,
      tag: document.querySelector('#typeTag').value,
      title: document.querySelector('#typeTitle').value,
      subtitle: document.querySelector('#typeSubtitle').value,
      imageUrl: document.querySelector('#typeImageUrl').value,
      content: document.querySelector('#typeContent').value,
      userId: document.querySelector('#typeUser').value
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
  
  fetch('http://localhost:4000/Blogs', options)
      .then(response => {
        if(response.status === 204){
            boxError.classList.add('d-none');
            boxSuccess.classList.remove('d-none');

            document.getElementById("typeUser").value = ''
            document.querySelector('#typeTitle').value = ''
            document.querySelector('#typeSubtitle').value = ''
            document.querySelector('#typeImageUrl').value = ''
            document.querySelector('#typeContent').value = '';
            document.querySelector('#typeTag').value = '';

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

function Cancel() {
      document.getElementById("typeUser").value = ''
      document.querySelector('#typeTitle').value = ''
      document.querySelector('#typeSubtitle').value = ''
      document.querySelector('#typeImageUrl').value = ''
      document.querySelector('#typeContent').value = ''
      document.querySelector('#typeTag').value = ''

}