// Возможные ошибки:
// В задании при открытии попапа поля нейтральные, а у меня сразу красные. Возможно, это связано с тем, что у меня поля меняют стили с помощью псевдокласса :invalid, и нужно менять стили через классы

const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonAttribute: 'disabled',
  // inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// добавляет подсказки об ошибке
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  // не добавляется класс стилизации input при ошибке валидации, т.к. input стилизуется при помощи псевдокласса :invalid
}

// убирает подсказки об ошибке
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

// скрыть все подсказки об ошибках в форме
function hideInputErrors(popup, config) {
  const formElement = popup.querySelector(config.formSelector);
  const inputElements = formElement.querySelectorAll(config.inputSelector);
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
}

// вызывает функции, добавляющие или убирающие подсказки об ошибке в зависимости от валидации
function isValid(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// проверяет проходят ли все поля формы валидацию
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// добавить или убрать атрибут disabled кнопке, в зависимости от того, проходят ли все поля формы валидацию или нет
function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute(config.inactiveButtonAttribute, config.inactiveButtonAttribute);
    console.log('Функция toggleButtonState ДОБАВИЛА атрибут disabled');
  } else {
    buttonElement.removeAttribute(config.inactiveButtonAttribute);
    console.log('Функция toggleButtonState УБРАЛА атрибут disabled');
  }
}

  //  возвратить к исходному состояние кнопки, если закрыл попап с противоположным состоянием
function resetButtonState(popup, config) {
  const formElement = popup.querySelector(config.formSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButtonState (inputList, buttonElement, config);
}

// навешивает функции валидации на все поля ввода в форме, которая указывается в аргументе
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState (inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState (inputList, buttonElement, config);
    });
  });
}

// навешивает функции навешивания функций на все поля ввода на все формы в документе
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
}

enableValidation(selectors);
