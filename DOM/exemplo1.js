function createButton() {
  let btn = document.createElement("input");
  btn.setAttribute("type", "button");
  btn.setAttribute("value", "Clique-me");
  btn.setAttribute("onClick", "createButton()");
  btn.setAttribute("onMouseOver", "removeButton(this)");
  let parent = document.getElementsByTagName("body")[0];
  parent.appendChild(btn);
}

function removeButton(elementToRemove) {
  let parent = elementToRemove.parentNode;
  console.log(`parent: ${parent}`);

  let firstChild = parent.firstElementChild;
  console.log(`${parent}'s firstChild: ${firstChild}`);

  let brother1 = firstChild.nextElementSibling;
  console.log(`${elementToRemove}'s nextSibling: ${brother1}`);

  parent.removeChild(elementToRemove);
  //   parent.removeChild(elementToRemove);
}

function createTable(lines, columns) {
    let parent = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    table.setAttribute("border", "2");

    for (let i = 0; i < lines; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
            let td = document.createElement("td");
            let text = document.createTextNode(`Célula ${i} - ${j}`);
            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    parent.appendChild(table);

}