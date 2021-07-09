import { exitKey } from "../utils/constants.js";

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener('keydown', _handleEscClose);

  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('keydown', _handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === exitKey) {
      close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('popup__close-icon').addEventListener('click', close);
    this._popup.addEventListener('click', close);  /* здесь не уверен, проверить в конце */
  }
}
