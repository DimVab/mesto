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
const avatarFormElement = document.querySelector('.popup_type_edit-avatar').querySelector('.form');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const exitKey = 'Escape';

const profileAvatar = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.profile__avatar-edit-icon');

export { cardsContainer, selectors, profileFormElement, addingImageFormElement, avatarFormElement, addButton, editButton, exitKey, profileAvatar, avatarEditButton };
