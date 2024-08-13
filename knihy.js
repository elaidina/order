const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const panovnici = [
  'Bible',
  'Důmyslný rytíř Don Quijote de la Mancha: Miguel de Cervantes y Saavedra',
  'Příběh dvou měst: Charles Dickens',
  'Společenstvo Prstenu: J. R. R. Tolkien',
  'Dvě věže: J. R. R. Tolkien',
  'Alchymista: Paulo Coelho',
  'Hobit: J. R. R. Tolkien',
  'Malý princ: Antoine de Saint-Exupéry',
  'Návrat krále: J. R. R. Tolkien',
  'Harry Potter a kámen mudrců: J. K. Rowlingová',
  'Deset malých černoušků: Agatha Christie',
  'Sen v červeném domě: Cchao Süe-čchin',
  'Alenka v říši divů: Lewis Carroll',
  'Letopisy Narnie: Lev, čarodějnice a skříň: C. S. Lewis',
  'Ona: H. Rider Haggard',
  'Šifra mistra Leonarda: Dan Brown',
  'Myšlením k bohatství: Napoleon Hill',
  'Harry Potter a princ dvojí krve: J. K. Rowlingová',
  'Kdo chytá v žitě: J. D. Salinger',
  'Dobrodružství Sherlocka Holmese: Arthur Conan Doyle',
  'Dvacet tisíc mil pod mořem: Jules Verne',
  'Harry Potter a tajemná komnata: J. K. Rowlingová',
  'Harry Potter a vězeň z Azkabanu: J. K. Rowlingová',
  'Harry Potter a ohnivý pohár: J. K. Rowlingová',
  'Harry Potter a Fénixův řád: J. K. Rowlingová',
  'Harry Potter a relikvie smrti: J. K. Rowlingová',
  'Sto roků samoty: Gabriel García Márquez',
  'Lolita: Vladimir Nabokov',
  'Heidi, děvčátko z hor: Johanna Spyriová',
  'Anna ze Zeleného domu: Lucy Maud Montgomery',
  
 /*  '511,09',
  '530',
  '630',
  '750',
  '840',
  '930',
  '999',
  '1001',
  '1010',
  '1100',
  '1101',
  '1110',
  '1111',
  '1111,1',
  '1190',
  '1910',
  '1991',
  '1999',
  '2000',
  '25 000',
  '25 500',
  '38 000',
  '500 000',
  '500 001',
  '500 010',
  '999 999',
  '1 000 000 ', */
  
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
