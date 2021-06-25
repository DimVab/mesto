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
    .cloneNode(true);

    return cardElement;
  }

  _generateCard() {
    this._card = this._getTemplate();

    this._card.querySelector('.element__name').textContent = this._name;
    this._card.querySelector('.element__image').src = this._src;
    this._card.querySelector('.element__image').alt = this._alt;
  }

  getCard() {
    this._generateCard();

    return this._card;
  }
}

export default Card;
