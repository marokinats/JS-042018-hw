/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
	for (var i = 0; i < array.length; i++) {
		fn(array[i], i, array);
	}
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
	let newArray = [];

	for (var i = 0; i < array.length; i++) {
		newArray.push(fn(array[i], i, array));
	}
	
	return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
	let newArray = [];

	if (initial) {
		newArray = initial;
		for (var i = 0; i < array.length; i++) {
			newArray = fn(newArray,array[i], i, array);
		}
	}

	else {
		newArray = array[0];
		for (var i = 1; i < array.length; i++) {
			newArray = fn(newArray,array[i], i, array);
		}
	}
	
	return newArray;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
let upperProps = obj => Object.keys(obj).map(item => item.toUpperCase());

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
	var newArray = [];

	if (to > array.length) {
		to = array.length;
	}

	if (to < 0) {
		if (to < -array.length) {
			to = 0;
		} else {
			to = array.length + to;	
		}
	}

	if (from < 0 && from >= -array.length) {
		from = array.length - from;
	}
	if (from < -array.length) {
		from = 0;
	}

	for (var i = from; i < to; i++) {
		newArray.push(array[i]);
	}

	return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

	return new Proxy(obj, {
		set(obj, prop, value) {
			obj[prop] = Math.pow(value, 2);

			return true;
		}
	}
)};

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
