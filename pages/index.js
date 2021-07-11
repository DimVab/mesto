import {initialCards,
        cardsContainer,
        selectors,
        profileFormElement,
        addingImageFormElement,
        addButton,
        editButton } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
  }
});
addingImagePopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitFormHandler: (data) => {
    const userInfo = new UserInfo({name: '.profile__name', job: '.profile__job'});

      userInfo.setUserInfo(data);
      profilePopup.close();
  }
});
profilePopup.setEventListeners();

// function createCard(item) {
//   const card = new Card (item, '.card-template');
//   return card.getCard();

// слушатели:
// открыть попап редактирования профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
  const userInfo = new UserInfo({name: '.profile__name', job: '.profile__job'});
  profilePopup._popup.querySelector('.form__input_type_name').value = userInfo.getUserInfo().userName;
  profilePopup._popup.querySelector('.form__input_type_job').value = userInfo.getUserInfo().userJob;
  profileFormValidator.resetValidation();
});
// открыть попап добавления карточки
addButton.addEventListener('click', () => {
  addingImagePopup.open();
  addingImageFormValidator.resetValidation();
});
