import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(src, name) {
    super.open();
    this._popup.querySelector('.popup__image').src = src;
    this._popup.querySelector('.popup__caption').textContent = name;
  }
}
