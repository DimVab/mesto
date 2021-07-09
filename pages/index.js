import initialCards from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';

const popups = document.querySelectorAll('.popup');
// переменные, связанные с редактированием профиля
const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const nameInput = profilePopup.querySelector('.form__input_type_name');
const jobInput = profilePopup.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileFormElement = profilePopup.querySelector('.form');

// переменные, связанные с добавлением карточек
const cardsList = document.querySelector('.elements__list');
const addButton = document.querySelector('.profile__add-button');
const addingImagePopup = document.querySelector('.popup_type_add-image');
const addingImageFormElement = addingImagePopup.querySelector('.form');
const cardNameInput = addingImagePopup.querySelector('.form__input_type_name-of-card');
const cardUrlInput = addingImagePopup.querySelector('.form__input_type_url');
// другие переменные
const imagePopup = document.querySelector('.popup_type_open-image');
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
function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileFormValidator.resetValidation();
}

// открыть попап добавления картинки
function openAddingImagePopup() {
  openPopup(addingImagePopup);
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
// для форм
profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
addingImageFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
});
// для редактирования профиля
editButton.addEventListener('click', openProfilePopup);
profileFormElement.addEventListener('submit', saveProfileChanges);
// для добавления карточки
addButton.addEventListener('click', openAddingImagePopup);
addingImageFormElement.addEventListener('submit', addCard);
// закрыть любой попап
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  });
});

export { openPopup };
