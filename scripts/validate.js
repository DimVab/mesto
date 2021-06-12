/* План:
1. Объявить нужные переменные
2. Объявить функцию показа ошибки +
3. Объявить функцию скрытия ошибки +
4. Объявить функцию проверки валидации для одного поля +
5. Объявить функцию проверки валидации для всех полей (для кнопки) +
6. Объявить функцию изменения состояния кнопки (если выполняется п.5) +
7. Объявить функцию навешивания функций п.4 и функции 6 в начале функции и при навешивании функций п.4 на все поля +
8. Объявить функцию навешивания функций п7. на формы +
9. Вызвать функцию п.8 2 раза, передавая им в аргумент объекты (адаптировать под обхъекты)

Возможные ошибки:
В задании при открытии попапа поля нейтральные, а у меня сразу красные. Возможно, это связано с тем, что у меня поля меняют стили с помощью псевдокласса :invalid, и нужно менять стили через классы
*/

// тестовые переменные:
const form1 = document.querySelector('.popup__form[name="about"]');
const form2 = document.querySelector('.popup__form[name="place"]');
// const input1 = form1.querySelector('.popup__input_type_name');
// const error1 = 'Ашипка!';
// рабочие переменные:

// добавляет подсказки об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // потом удалить: переменная объявляется внутри функции, тк её значение содержит параметр, а параметр при разных вызовах разный
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  console.log('Функция showInputError выполнена'); /* потом удалить */
  // не добавляется класс стилизации input при ошибке валидации, т.к. input стилизуется при помощи псевдокласса :invalid
}

// убирает подсказки об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  console.log('Функция hideInputError выполнена'); /* потом удалить */
}

// вызывает функции, добавляющие или убирающие подсказки об ошибке в зависимости от валидации
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
  console.log('Функция isValid выполнена'); /* потом удалить */
}

// проверяет проходят ли все поля формы валидацию
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// проверка (потом удалить)
console.log(hasInvalidInput(Array.from(form1.querySelectorAll('.popup__input'))));
console.log(hasInvalidInput(Array.from(form2.querySelectorAll('.popup__input'))));

// добавить или убрать атрибут disabled кнопке, в зависимости от того, проходят ли все поля формы валидацию или нет
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.removeAttribute('disabled');
  }
}

// навешивает функции валидации на все поля ввода в форме, которая указывается в аргументе
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState (inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState (inputList, buttonElement);
    });
    console.log('Функция setEventListeners выполненяется на каждой итерации'); /* потом удалить */
  });
  console.log('Функция setEventListeners выполнена'); /* потом удалить */
}

// навешивает функции навешивания функций на все поля ввода на все формы в документе
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
    console.log('Функция enableValidation выполненяется на каждой итерации'); /* потом удалить */
  });
  console.log('Функция enableValidation выполнена'); /* потом удалить */
}

// тестовые вызовы функций
// showInputError(form1, input1, error1);
// hideInputError(form1, input1);
// isValid(form1, input1);
// setEventListeners(form1);
// setEventListeners(form2);

// рабочие вызовы функций:
enableValidation();
