import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');

    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popup.querySelector('.form').reset();
   }

   renderSaving (isSaving, initialValue) {
    if (isSaving) {
      this._popup.querySelector('.form__submit-button').value = 'Сохранение...';
    } else {
      this._popup.querySelector('.form__submit-button').value = initialValue;
    }
    // у меня даже при загрузке в 1-2 сек текст кнопки не меняется, хотя, если проверить через console.log, то изменения происходят
  }
}
