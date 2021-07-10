import PopupWithImage from './PopupWithImage.js';

class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this.name = data.name;
    this.src = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._card.querySelector('.element__name').textContent = this.name;
    this._cardImage.src = this.src;
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

    this._handleCardClick();
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _handleDeleteIcon() {
    this._deleteButton.closest('.element').remove();
  }
}

export default Card;
