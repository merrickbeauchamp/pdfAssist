const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const table = document.getElementById('table');

 function buttonClick(text, buttonClicked) {

  if(text) {
     navigator.clipboard.writeText(text)
    buttonClicked.innerHTML = "Copied"
  }
}

uploadButton.addEventListener('click', function() {
  if (!window.FileReader) {
    alert('Your browser does not support file reading.');
    return;
  }

  if (!fileInput.files.length) {
    alert('Please select a file to upload.');
    return;
  }

  const file = fileInput.files[0];

  if (!file.type.match('text/plain')) {
    alert('Please upload a TXT file.');
    return;
  }

  const reader = new FileReader();
let data = {
  
}

  
  reader.onload = function(e) {
    let no = 0
    let text = e.target.result.split("\n");
    for(let i = 1; i < text.length; i++ ) {
      if(no == 5) {
        break
      }
      let found = false
      for(let line of text) {
        if(line.startsWith(i + " ") && line.length > 20) {
          let words = line.split(" ") 
          data[words[0]] = {
            SKU: words[1],
            QTY: words[words.length - 4],
            PRICE: words[words.length - 2],
            EXTENSION: words[words.length - 1]
          }
          found = true
          break;
        }
      }
      if(found == false) no++
    }
    
    let rows = ""
    for(let z = 1; z < Object.entries(data).length + 10; z++) {
      rows += `<tr><td>${z}</td><td>${data[z]?.SKU || "ERROR"}<button onclick="buttonClick('${data[z]?.SKU}', this)">Copy</button></td><td>${data[z]?.QTY || "ERROR"}<button onclick="buttonClick('${data[z]?.QTY}', this)">Copy</button></td><td>${data[z]?.PRICE || "ERROR"}<button onclick="buttonClick('${data[z]?.PRICE}', this)">Copy</button></td><td>${data[z]?.EXTENSION || "ERROR"}<button onclick="buttonClick('${data[z]?.EXTENSION}', this)">Copy</button></td></tr>`
    }
    table.innerHTML = `
    <tr>
    <th>#</th>
    <th>SKU</th>
    <th>QTY</th>
    <th>PRICE</th>
    <th>EXTENSION</th>
    </tr>` + rows
    console.log(table.innerHTML)
  };

  reader.readAsText(file);
});
