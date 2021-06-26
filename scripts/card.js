import { openPopup, handleClickOverlay } from "./index.js";

// переменные, связанные с открытием попапа с картинкой
const imagePopup = document.querySelector('.popup_type_open-image');
const openedImage = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._src = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.element__name').textContent = this._name;
    this._card.querySelector('.element__image').src = this._src;
    this._card.querySelector('.element__image').alt = this._alt;
  }

  getCard() {
    this._generateCard();

    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._card.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteIcon();
    });

    this._card.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _handleLikeIcon() {
    this._card.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteIcon() {
    this._card.querySelector('.element__delete').closest('.element').remove();
  }

  _handleImageClick() {
    openPopup(imagePopup);
    openedImage.src = this._src;
    caption.textContent = this._name;
    imagePopup.addEventListener('click', handleClickOverlay);
  }
}

export default Card;
