const altayImage = new URL('../images/elements/Altai.jpg', import.meta.url);
const kamchatkaBeachImage = new URL('../images/elements/Kamchatka-beach.jpg', import.meta.url);
const monrepoImage = new URL('../images/elements/Monrepo.jpg', import.meta.url);
const baykalImage = new URL('../images/elements/Baikal.jpg', import.meta.url);
const krasnayaPolyanaImage = new URL('../images/elements/Krasnaya-polyana.jpg', import.meta.url);
const kamchatkaVolcanoImage = new URL('../images/elements/Kamchatka-volkano.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Алтай',
    link: altayImage,
    alt: 'Горные луга Алтая'
  },
  {
    name: 'Побережье Камчатки',
    link: kamchatkaBeachImage,
    alt: 'Побережье Камчатки'
  },
  {
    name: 'Парк Монрепо',
    link: monrepoImage,
    alt: 'Парк Монрепо зимой'
  },
  {
    name: 'Байкал',
    link: baykalImage,
    alt: 'Байкал зимой'
  },
  {
    name: 'Красная поляна',
    link: krasnayaPolyanaImage,
    alt: 'Горы на Красной поляне'
  },
  {
    name: 'Вулкан Камчатки',
    link: kamchatkaVolcanoImage,
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
