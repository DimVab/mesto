import initialCards from './initial-cards.js';
import Card from './card.js';

initialCards.forEach((item) => {
  const card = new Card (item, '.card-template');
  const cardElement = card.getCard();
  document.querySelector('.elements__list').append(cardElement);
});

