import { initialCards, cardsContainer, selectors, profileFormElement, addingImageFormElement, addButton, editButton } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// переменные, связанные с редактированием профиля
// const nameInput = profilePopup.querySelector('.form__input_type_name');
// const jobInput = profilePopup.querySelector('.form__input_type_job');

// переменные, связанные с добавлением карточек
// const cardNameInput = addingImagePopup.querySelector('.form__input_type_name-of-card');
// const cardUrlInput = addingImagePopup.querySelector('.form__input_type_url');

//
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.card-template', {handleCardClick: () => {

      // слабая связь внутри слабой связи
      const popupWithImage = new PopupWithImage('.popup_type_open-image');
      popupWithImage.setEventListeners();
      card._cardImage.addEventListener('click', () => {
        popupWithImage.open(card.src, card.name);
      });
    }});

    const cardElement = card.getCard();
    cardsList.addItem(cardElement);
  }
}, cardsContainer);

cardsList.renderItems();

// добавление валидации
const profileFormValidator = new FormValidator (selectors, profileFormElement);
profileFormValidator.enableValidation();
const addingImageFormValidator = new FormValidator (selectors, addingImageFormElement);
addingImageFormValidator.enableValidation();

// добавление функциональности попапа, добавляющего картинки
const addingImagePopup = new PopupWithForm('.popup_type_add-image', {
  submitFormHandler: (data) => {
    addingImagePopup._popup.querySelector('.form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = addingImagePopup._getInputValues(); /* всё работает, но так нельзя */
    const card = new Card (data, '.card-template', {handleCardClick: () => {

      // слабая связь внутри слабой связи
      const popupWithImage = new PopupWithImage('.popup_type_open-image');
      popupWithImage.setEventListeners();
      card._cardImage.addEventListener('click', () => {
        popupWithImage.open(card.src, card.name);
      });
    }});

    const cardElement = card.getCard();
    cardsList.prependItem(cardElement);
    addingImagePopup.close();
    });
  }
});
addingImagePopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitFormHandler: (data) => {
    const userInfo = new UserInfo('.profile__name','.profile__job');

    profilePopup._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      userInfo.setUserInfo(data);
      profilePopup.close();
    });
  }
});
profilePopup.setEventListeners();

// добавить карточку
// function addCard(evt) {
//   evt.preventDefault();

//   const item = {};

//   item.name = cardNameInput.value;
//   item.link = cardUrlInput.value;

//   const newCard = createCard(item);
//   cardsList.prepend(newCard);

//   addingImageFormElement.reset();

//   closePopup(addingImagePopup);
// }

// function createCard(item) {
//   const card = new Card (item, '.card-template');
//   return card.getCard();

// слушатели событий:
// для форм
// profileFormElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
// addingImageFormElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
// для редактирования профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
  const userInfo = new UserInfo('.profile__name', '.profile__job');
  const userData = userInfo.getUserInfo();
  profilePopup._popup.querySelector('.form__input_type_name').value = userData.userName;
  profilePopup._popup.querySelector('.form__input_type_job').value = userData.userJob;
  profileFormValidator.resetValidation();
});
// profileFormElement.addEventListener('submit', saveProfileChanges);
// для добавления карточки
addButton.addEventListener('click', () => {
  addingImagePopup.open();
  addingImageFormValidator.resetValidation();
});
// addingImageFormElement.addEventListener('submit', addCard);
