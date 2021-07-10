const initialCards = [
  {
    name: 'Алтай',
    link: './images/elements/Altai.jpg',
    alt: 'Горные луга Алтая'
  },
  {
    name: 'Побережье Камчатки',
    link: './images/elements/Kamchatka-beach.jpg',
    alt: 'Побережье Камчатки'
  },
  {
    name: 'Парк Монрепо',
    link: './images/elements/Monrepo.jpg',
    alt: 'Парк Монрепо зимой'
  },
  {
    name: 'Байкал',
    link: './images/elements/Baikal.jpg',
    alt: 'Байкал зимой'
  },
  {
    name: 'Красная поляна',
    link: './images/elements/Krasnaya-polyana.jpg',
    alt: 'Горы на Красной поляне'
  },
  {
    name: 'Вулкан Камчатки',
    link: './images/elements/Kamchatka-volkano.jpg',
    alt: 'Вулкан на Камчатке'
  }
];
const cardsContainer = '.elements__list';

const selectors = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
const profileFormElement = document.querySelector('.popup_type_edit-profile').querySelector('.form');
const addingImageFormElement = document.querySelector('.popup_type_add-image').querySelector('.form');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const exitKey = 'Escape';

export { initialCards, cardsContainer, selectors, profileFormElement, addingImageFormElement, addButton, editButton, exitKey };
