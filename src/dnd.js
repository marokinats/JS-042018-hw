/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');

  let r = Math.floor(Math.random() * (257));
  let g = Math.floor(Math.random() * (257));
  let b = Math.floor(Math.random() * (257));
  let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';

  let pageWidth = document.documentElement.clientWidth;
  let pageHeight = document.documentElement.clientHeight;
  let elemWidth = Math.floor(Math.random() * (pageWidth / 2));
  let elemHeight = Math.floor(Math.random() * (pageHeight / 2));

  newDiv.style.width = elemWidth + 'px';
  newDiv.style.height = elemHeight + 'px';
  newDiv.style.position = 'absolute';
  newDiv.style.top = (pageHeight - elemHeight) / 2 + 'px';
  newDiv.style.left = (pageWidth - elemWidth) / 2 + 'px';
  newDiv.style.backgroundColor = rgb;

  return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

  target.ondragstart = function() {
    
    return false;
  };
  target.onmousedown = function(e) { 

    moveAt(e);

    function moveAt(e) {
      target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
      target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
    }

    document.onmousemove = function(e) {
      moveAt(e);
    }

    target.onmouseup = function() {
      document.onmousemove = null;
      target.onmouseup = null;
    }
  }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
