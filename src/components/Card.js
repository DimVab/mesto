class Card {
  constructor(data, cardSelector, functions) {
    this._name = data.name;
    this._src = data.link;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = functions.handleCardClick;
    this._handleLikeIcon = functions.handleLikeIcon;
    this._likes = data.likes;
    // this._likeCard = functions.likeCard;
    // this._removeLikeCard = functions.removeLikeCard;
    this._id = data._id;
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
    this.likeButton = this._card.querySelector('.element__like');
    this._deleteButton = this._card.querySelector('.element__delete');
    this.counter = this._card.querySelector('.element__like-counter');

    this._setEventListeners();
    this._findUserLike();

    this._card.querySelector('.element__name').textContent = this._name;
    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this.counter.textContent = this._likes.length;
  }

  getCard() {
    this._generateCard();

    return this._card;
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this._handleLikeIcon(this._id);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIcon();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._src, this._alt, this._name);
    });
  }

  _handleDeleteIcon() {
    this._deleteButton.closest('.element').remove();
  }

  _findUserLike() {
    if (this._likes.some((user) => {
      return user._id === '9e2f6b5f7b1c9513313c4f7c';
    })) {
      this.likeButton.classList.add('element__like_active');
    }
  }
}

export default Card;
