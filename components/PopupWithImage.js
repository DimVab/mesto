export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(data) {
    super._open();
    this._image.src = data.name;
    this._caption.textContent = data.link;
  }
}
