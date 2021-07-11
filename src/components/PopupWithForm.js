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
    // по условию при закрытии форма должна сбрасываться. Данное действие подходит для попапа добавления картинки, но, когда закрывается попап редактирования профиля, метод .reset() на долю секунды сбрасывает значения полей до установленных в атрибуте value
   }
}
