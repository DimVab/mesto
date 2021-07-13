import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__image');
  }

  open(src, alt, name) {
    super.open();
    this._cardImage.src = src;
    this._cardImage.alt = alt;
    this._popup.querySelector('.popup__caption').textContent = name;

  }
}
