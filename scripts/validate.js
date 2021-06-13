const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// добавляет подсказки об ошибке
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// убирает подсказки об ошибке
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
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
  } else {
    buttonElement.removeAttribute(config.inactiveButtonAttribute);
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
