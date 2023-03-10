
fetch('http://localhost:4000/users')
    .then(response => response.json())
    .then(data => {
        data.map(obj => {
            const userTable = document.getElementById("userTable");
            const lista = document.createElement("tr");

            obj['action'] = `<a href="#/${obj.id}" class="btn btn-warning text-dark"
                             style="border-radius: 10px;
                                    padding: 5px 10px;
                                    margin: 0px 5px;">
                                <i class="bi bi-pencil"></i>
                            </a>
                             <a href="#/${obj.id}" class="btn btn-danger"
                             style="border-radius: 10px;
                                    padding: 5px 10px">
                                <i class="bi bi-trash"></i>
                             </a>`;

            for (let i in obj) {
                const item = document.createElement("td")

                item.innerHTML = obj[i];
                lista.appendChild(item);

                userTable.appendChild(lista);


                if (obj.admin === true) {
                    obj.admin = '<i class="bi bi-check-square"></i>'
                } if (obj.admin === false) {
                    obj.admin = '<i class="bi bi-square"></i>'
                }
            }
        })

        $(document).ready(() => {
            const table = $('table');
            const headers = table.find('th');
            const rows = table.find('tbody tr');
            
            // Define a coluna de ordenação padrão (ID neste exemplo)
            let currentSortColumn = headers.eq(0).attr('data-column');
            let currentSortOrder = headers.eq(0).attr('data-order');
            let currentSortIcon = headers.eq(0).find('i');
            
            // Define a função de comparação com base no tipo de dados da coluna
            const getComparator = (type, order) => {
              if (type === 'number') {
                return (a, b) => (order === 'ascending') ?
                  Number(a.cells[currentSortColumn].textContent) - Number(b.cells[currentSortColumn].textContent) :
                  Number(b.cells[currentSortColumn].textContent) - Number(a.cells[currentSortColumn].textContent);
              } else {
                return (a, b) => (order === 'ascending') ?
                  a.cells[currentSortColumn].textContent.localeCompare(b.cells[currentSortColumn].textContent) :
                  b.cells[currentSortColumn].textContent.localeCompare(a.cells[currentSortColumn].textContent);
              }
            };
            
            // Ordena as linhas da tabela e atualiza a tabela com as linhas ordenadas
            const sortTable = () => {
              const comparator = getComparator(headers.eq(currentSortColumn).attr('data-type'), currentSortOrder);
              const sortedRows = rows.sort(comparator)
                .map((index, row) => row.outerHTML)
                .toArray();
              
              table.find('tbody').html(sortedRows.join(''));
            };
            
            // Altera a classe de ícone para indicar a direção da ordenação atual
            const toggleSortIcon = () => {
              currentSortIcon.removeClass('bi bi-sort-up bi-sort-down');
              if (currentSortOrder === 'ascending') {
                currentSortIcon.addClass('bi-sort-up');
              } else {
                currentSortIcon.addClass('bi-sort-down');
              }
            };
            
            // Atualiza a coluna de ordenação e ordena a tabela quando o cabeçalho da coluna é clicado
            headers.click(function() {
              const clickedColumn = $(this).attr
              ('data-column');
              if (clickedColumn === currentSortColumn) {
                currentSortOrder = (currentSortOrder === 'ascending') ? 'descending' : 'ascending';
              } else {
                currentSortColumn = clickedColumn;
                currentSortOrder = 'ascending';
                currentSortIcon = $(this).find('i');
              }
              toggleSortIcon();
              sortTable();
            });
            
            // Ordena a tabela ao carregar a página
            sortTable();
            toggleSortIcon();
        })
        
    })
    .catch(error => {

    });

