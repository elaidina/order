const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const panovnici = [
  'Bořivoj I. (867-899)',
  'Spytihněv I. (895-915)',
  'Vratislav I. (915-921)',
  'sv. Václav (921-935)',
  'Boleslav I.Ukrutný (935-972)',
  'Boleslav II. Pobožný (972-999)',
  'Boleslav III. Ryšavý (999-1003)',
  'Jaromír (1003-1034)',
  'Oldřich (1012-1034)',
  'Břetislav I. (1034-1055)',
  'Vratislav II. (1061-1092)',
  'Břetislav II. (1092-1100)',
  'Bořivoj II. (1101-1120)',
  'Svatopluk Olomoucký (1107-1109)',
  'Vladislav I. (1109-1125)',
  'Soběslav I. (1125-1140)',
  'Vladislav II. (1140-1172)',
  'Soběslav II. (1173-1178)',
  'Konrád II. Ota (1189-1191)',
  'Jindřich Břetislav (1193-1197)',
  'Přemysl Otakar I. (1192-1230)',
  'Václav I. Jednooký (1230-1253)',
  'Přemysl Otakar II. (1253-1278)',
  'Václav II. (1278-1305)',
  'Václav III.(1305-1306)',
  'Jan Lucemburský (1310-1346)',
  'Karel IV. (1346-1378)',
  'Václav IV. (1378-1419)',
  'Zikmund Lucemburský (1436-1437)',
  'Ladislav Pohrobek (1453-1457)',
  'Jiří z Poděbrad (1458-1471)',
  'Vladislav Jagellonský (1471-1516)',
  'Ludvík Jagellonský (1516-1526)',
  'Ferdinand I Habsburský (1526-1564)',
  'Maxmilián II. (1564-1576)',
  'Rudolf II. (1576-1611)',
  'Matyáš Habsburský (1611-1619)',
  'Fridrich Falcký (1619-1620)',
  'Ferdinand II. (1620-1637)',
  'Ferdinand III. (1637-1657)',
  'Leopold I. (1657-1705)',
  'Josef I. (1705-1711)',
  'Karel VI. (1711-1740)',
  'Marie Terezie (1740-1780)',
  'Josef II. (1780-1790)',
  'Leopold II. (1790-1792)',
  'František II. (1792-1835)',
  'Ferdinand I. (V. Dobrotivý) (1835-1848)',
  'František Josef I. (1848-1916)',
  'Karel I. (1916-1918)',
  'Tomáš Garrique Masaryk (1918-1935)',
  'Edvard Beneš (1935-1948)',
  'Emil Hácha (1938-1945)',
  'Klement Gottwald (1948-1953)',
  'Antonín Zápotocký (1953-1957)',
  'Antonín Novotný (1957-1968)',
  'Ludvík Svoboda (1968-1975)',
  'Gustáv Husák (1975-1989)',
  'Václav Havel (1989-2003)',
  'Václav Klaus (2003-2013)',
  'Miloš Zeman (2013-2023)',
  
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...panovnici]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
         
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== panovnici[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
  
  draggable_list.addEventListener('mousemove', checkOrder);
}
