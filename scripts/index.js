import initialCards from './initial-cards.js';
import Card from './card.js';
import FormValidator from './formValidator.js';

initialCards.forEach((item) => {
  const card = new Card (item, '.card-template');
  const cardElement = card.getCard();
  document.querySelector('.elements__list').append(cardElement);
});

const selectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const formList = Array.from(document.querySelectorAll(selectors.formSelector));
formList.forEach( (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const formValidator = new FormValidator (selectors, formElement);
  formValidator.enableValidation();
});


// переменные, связанные с редактированием профиля
const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileFormElement = profilePopup.querySelector('.form');
// переменные, связанные с добавлением карточек
const addButton = document.querySelector('.profile__add-button');
const addingImagePopup = document.querySelector('.popup_type_add-image');
const addingImageFormElement = addingImagePopup.querySelector('.form');
const cardNameInput = addingImagePopup.querySelector('.form__input_type_name-of-card');
const cardUrlInput = addingImagePopup.querySelector('.form__input_type_url');
// другие переменные
const exitKey = 'Escape';


// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  const closeIcon = popup.querySelector('.popup__close-icon');
  closeIcon.addEventListener('click', closePopup);
  document.addEventListener('keydown', handleExitUsingKey);
  popup.addEventListener('click', handleClickOverlay);
}

// открыть попап редактирования профиля
function openProfilePopup(popup, config) {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  setResetValidateStatus(popup);
}

// открыть попап добавления картинки (вынес в отдельную функцию, чтобы поля обнулялись, когда закрыл попап)
function openAddingImagePopup(popup, config) {
  openPopup(popup);
  addingImageFormElement.reset();
  setResetValidateStatus(popup);
}

function setResetValidateStatus(popup) {
  const formElement = popup.querySelector('.form');
  const formValidator = new FormValidator (selectors, formElement);
  formValidator._hideInputErrors(popup);
  formValidator._resetButtonState(popup);
}

// закрыть любой попап
function closePopup() {
  const popup = document.querySelector('.popup_opened');
  const closeIcon = popup.querySelector('.popup__close-icon');
  popup.classList.remove('popup_opened');
  closeIcon.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', handleExitUsingKey);
  popup.removeEventListener('click', handleClickOverlay);
}

// закрыть попап кнопкой
function handleExitUsingKey(evt) {
  if (evt.key === exitKey) {
    closePopup();
  }
}

// закрыть попап кликом по оверлею
function handleClickOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

// сохранить изменения в редактировании профиля
function saveProfileChanges (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

// добавить карточку
function addCard(evt) {
  evt.preventDefault();

  const item = {};

  item.name = cardNameInput.value;
  item.link = cardUrlInput.value;

  const newCard = createCard(item);
  cardsList.prepend(newCard);

  addingImageFormElement.reset();

  closePopup();
}

// слушатели событий:
// для редактирования профиля
editButton.addEventListener('click', () => openProfilePopup(profilePopup, selectors));
profileFormElement.addEventListener('submit', saveProfileChanges);
// для добавления карточки
addButton.addEventListener('click', () => openAddingImagePopup(addingImagePopup, selectors));
addingImageFormElement.addEventListener('submit', addCard);

export { openPopup };
