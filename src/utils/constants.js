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

export { cardsContainer, selectors, profileFormElement, addingImageFormElement, addButton, editButton, exitKey };
