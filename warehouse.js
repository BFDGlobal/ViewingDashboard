const API_KEY = 'AIzaSyBO12t7AJLbSNeyU9vALeIKg2rNiJx6Yno'; 
const SHEET_ID = '1LLDAyfazJvKvZGiDPdj7TQ2jsrFlMIaIQeGn9XlEAvU';
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?fields=sheets.data.rowData.values&key=${API_KEY}`;

function fetchData() {
  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      const sheet = data.sheets[0].data[0]; 
      const rows = sheet.rowData;
      const tableBody = document.querySelector('#sheet-data tbody');
      const tableHead = document.querySelector('#sheet-data thead');
      
      const headers = rows[0].values.map(cell => cell ? cell.formattedValue : '');
      const theadRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        theadRow.appendChild(th);
      });
      tableHead.appendChild(theadRow);
      
      let lastMergedRow = null; 

      rows.slice(1).forEach((row, rowIndex) => {  
        const tr = document.createElement('tr');
        row.values.forEach((cell, colIndex) => {
          const td = document.createElement('td');
          const cellValue = cell ? cell.formattedValue : '';

          if (colIndex === 0) {
            if (cellValue && rowIndex !== lastMergedRow) {
              td.textContent = cellValue;  
              lastMergedRow = rowIndex;
            } else {
              td.textContent = '';  
            }
          } else {
            td.textContent = cellValue;
          }

          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

window.onload = fetchData;
