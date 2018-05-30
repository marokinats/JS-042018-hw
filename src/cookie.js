/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');


function getCookies() {
    
  return document.cookie
    .split('; ')
    .reduce((prev, current) => {
    
    const [name, value] = current.split('=');
          
    prev[name] = value;
    
    return prev;
  }, {});
}

function isMatching(full, chunk) {
  if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
        
    return true;
  } else {
    
    return false;
  }
}

// при первой загрузке
showTable(getCookies());

// Добавление куки
addButton.addEventListener('click', () => {
  
    document.cookie = `${addNameInput.value} = ${addValueInput.value}`;
    addNameInput.value = '';
    addValueInput.value = '';
    if(filterNameInput.value) {

      getFilteredCookies();
    } else {
      showTable(getCookies());
    }
});

// Удаление
listTable.addEventListener('click', function (e) {
    
  if (!e.target.tagName === "BUTTON") return;
  
  let target = e.target.closest('tr');
  
  let currentName = target.firstElementChild;
  
  let currentNameText =  currentName.textContent;
  
  let currentValueText = currentName.nextSibling.textContent;
 
  let date = new Date(0);

  document.cookie = `${currentNameText}=${currentValueText};expires=${date.toUTCString()}`;
  
  target.remove();
});

function getFilteredCookies() {
  const allCookies = getCookies();
  
  const filteredCookies = {};
  
  let subStr = filterNameInput.value;
  
  for (let name in allCookies) {
    if (isMatching(allCookies[name], subStr) || isMatching(name, subStr)) {
        
      filteredCookies[name] = allCookies[name];
    }
  }
  showTable(filteredCookies);
};

// Поиск в объекте
filterNameInput.addEventListener('keyup', function () {
  getFilteredCookies()
  
});

// функция рендеринга
function showTable(cookies) {
  listTable.innerHTML = '';
    
  for (let key in cookies) {
    listTable.innerHTML += `<tr><td>${key}</td><td>${cookies[key]}</td><td><button>Удалить</button></td></tr>`;
  }
}

