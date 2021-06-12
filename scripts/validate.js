/* План:
1. Объявить нужные переменные
2. Объявить функцию показа ошибки +
3. Объявить функцию скрытия ошибки +
4. Объявить функцию проверки валидации для одного поля +
5. Объявить функцию проверки валидации для всех полей (для кнопки)
6. Объявить функцию изменения состояния кнопки (если выполняется п.5)
7. Объявить функцию навешивания функций п.4 и функции 6 в начале функции и при навешивании функций п.4 на все поля
8. Объявить функцию навешивания функций п7. на формы
9. Вызвать функцию п.8 2 раза, передавая им в аргумент объекты
*/

// тестовые переменные:
const form1 = document.querySelector('.popup__form');
const input1 = form1.querySelector('.popup__input_type_name');
const error1 = 'Ашипка!';
// рабочие переменные:


function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // потом удалить: переменная объявляется внутри функции, тк её значение содержит параметр, а параметр при разных вызовах разный
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  console.log('Функция showInputError выполнена'); /* потом удалить */
  // не добавляется класс стилизации input при ошибке валидации, тк input стилизуется при помощи псевдокласса :invalid
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  console.log('Функция hideInputError выполнена'); /* потом удалить */
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  console.log('Функция isValid выполнена'); /* потом удалить */
}

// тестовые вызовы функций
// showInputError(form1, input1, error1);
// hideInputError(form1, input1);
isValid(form1, input1);

// рабочие вызовы функций:
