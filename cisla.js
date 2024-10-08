const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const panovnici = [
  'Tokyo',
  'Delhi',
  'Shanghai',
  'São Paulo',
  'Mexico City',
  'Cairo',
  'Mumbai',
  'Beijing',
  'Dhaka',
  'Osaka',
  'New York',
  'Tehran',
  'Karachi',
  'Buenos Aires',
  'Chongqing',
  'Istanbul',
  'Kolkata',
  'Manila',
  'Lagos',
  'Rio de Janeiro',
  'Tianjin',
  'Kinshasa',
  'Guangzhou',
  'Los Angeles',
  'Moscow',
  'Shenzhen',
  'Lahore',
  'Bangalore',
  'Paris',
  'Bogotá',
  'Jakarta',
  'Chennai',
  'Lima',
  'Bangkok',
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
