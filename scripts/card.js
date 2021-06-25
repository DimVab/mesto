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
  }

  _handleLikeIcon() {
    this._card.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteIcon() {
    this._card.querySelector('.element__delete').closest('.element').remove();
  }
}

export default Card;
