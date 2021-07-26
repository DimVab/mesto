import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {submitFormHandler}) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._id, this._card);
    });
  }

  setCardInfo(cardId,card) {
    this._id = cardId;
    this._card = card;
  }
}
