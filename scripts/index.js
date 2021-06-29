import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// переменные, связанные с редактированием профиля
const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileFormElement = profilePopup.querySelector('.form');
const profilePopupCloseIcon = profilePopup.querySelector('.popup__close-icon');
// переменные, связанные с добавлением карточек
const cardsList = document.querySelector('.elements__list');
const addButton = document.querySelector('.profile__add-button');
const addingImagePopup = document.querySelector('.popup_type_add-image');
const addingImageFormElement = addingImagePopup.querySelector('.form');
const cardNameInput = addingImagePopup.querySelector('.form__input_type_name-of-card');
const cardUrlInput = addingImagePopup.querySelector('.form__input_type_url');
const addingImagePopupCloseIcon = addingImagePopup.querySelector('.popup__close-icon');
// другие переменные
const imagePopup = document.querySelector('.popup_type_open-image');
const imagePopupCloseIcon = imagePopup.querySelector('.popup__close-icon');
const exitKey = 'Escape';

// первоначальное добавление карточек
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cardsList.append(cardElement);
});

const selectors = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonAttribute: 'disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

// добавление валидации
const profileFormValidator = new FormValidator (selectors, profileFormElement);
profileFormValidator.enableValidation();
const addingImageFormValidator = new FormValidator (selectors, addingImageFormElement);
addingImageFormValidator.enableValidation();

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleExitUsingKey);
}

// открыть попап редактирования профиля
function openProfilePopup(popup) {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation();
}

// открыть попап добавления картинки (вынес в отдельную функцию, чтобы поля обнулялись, когда закрыл попап)
function openAddingImagePopup(popup) {
  openPopup(popup);
  addingImageFormElement.reset();
  addingImageFormValidator.resetValidation();
}

// закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleExitUsingKey);
}

// закрыть попап кнопкой
function handleExitUsingKey(evt) {
  if (evt.key === exitKey) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// закрыть попап кликом по оверлею
function handleClickOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

// сохранить изменения в редактировании профиля
function saveProfileChanges (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
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

  closePopup(addingImagePopup);
}

function createCard(item) {
  const card = new Card (item, '.card-template');
  return card.getCard();
}

// слушатели событий:
// для редактирования профиля
editButton.addEventListener('click', () => openProfilePopup(profilePopup, selectors));
profilePopup.addEventListener('click', handleClickOverlay);
profileFormElement.addEventListener('submit', saveProfileChanges);
profilePopupCloseIcon.addEventListener('click', () => closePopup(profilePopup));
// для добавления карточки
addButton.addEventListener('click', () => openAddingImagePopup(addingImagePopup, selectors));
addingImagePopup.addEventListener('click', handleClickOverlay);
addingImageFormElement.addEventListener('submit', addCard);
addingImagePopupCloseIcon.addEventListener('click', () => closePopup(addingImagePopup));
// для попапа с картинкой
imagePopup.addEventListener('click', handleClickOverlay);
imagePopupCloseIcon.addEventListener('click', () => closePopup(imagePopup));
// для форм
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
addingImageFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

export { openPopup };
