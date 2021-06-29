import { openPopup } from "./index.js";

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
    // классовые переменные
    this._cardImage = this._card.querySelector('.element__image');
    this._likeButton = this._card.querySelector('.element__like');
    this._deleteButton = this._card.querySelector('.element__delete');

    this._setEventListeners();

    this._card.querySelector('.element__name').textContent = this._name;
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
  }

  getCard() {
    this._generateCard();

    return this._card;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIcon();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _handleDeleteIcon() {
    this._deleteButton.closest('.element').remove();
  }

  _handleImageClick() {
    openPopup(imagePopup);
    openedImage.src = this._src;
    caption.textContent = this._name;
  }
}

export default Card;
