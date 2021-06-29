class FormValidator {
  constructor(selectors, formElement) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonAttribute = selectors.inactiveButtonAttribute;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._toggleButtonState ();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formElement, inputElement);
        this._toggleButtonState ();
      });
    });
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _hideInputErrors(popup) {
    const formElement = popup.querySelector(this._formSelector);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
    });
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute(this._inactiveButtonAttribute, this._inactiveButtonAttribute);
    } else {
      this._submitButton.removeAttribute(this._inactiveButtonAttribute);
    }
  }

  _resetButtonState(popup) {
    const formElement = popup.querySelector(this._formSelector);
    this._toggleButtonState ();
  }

}

export default FormValidator;
