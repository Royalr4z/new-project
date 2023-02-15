const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input1 = document.querySelector('#input1').value;
  const input2 = document.querySelector('#input2').value;
  const data = { input1, input2 };
  fetch('/api/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data inserted successfully');
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
});
