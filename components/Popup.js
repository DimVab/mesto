import { exitKey } from "../utils/constants.js";

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === exitKey) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('popup__close-icon').addEventListener('click', close);
    this._popup.addEventListener('click', close);  /* здесь не уверен, проверить в конце */
  }
}
