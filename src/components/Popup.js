import { exitKey } from "../utils/constants.js";

export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === exitKey) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-icon').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}
