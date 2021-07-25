import './index.css';

import {cardsContainer,
        selectors,
        profileFormElement,
        addingImageFormElement,
        addButton,
        editButton } from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: '1e46d460-5fe9-4d55-8f96-bc20172f2d2e',
    'Content-Type': 'application/json'
  },
  renderInitialCards: (elements) => {
    const cardsList = new Section({
      items: elements,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement);
      }
    }, cardsContainer);
    cardsList.renderItems();
  },
  renderUserInfo: (userData) => {
    userInfo.setUserInfo(userData);
  },
  prependCard: (cardInfo) => {
    const cardsList = new Section({}, cardsContainer);
    const cardElement = createCard(cardInfo);
    cardsList.prependItem(cardElement);
  }
});

api.getInitialCards();
api.getUserInfo();


const popupWithImage = new PopupWithImage('.popup_type_open-image');
popupWithImage.setEventListeners();

// добавление валидации
const profileFormValidator = new FormValidator (selectors, profileFormElement);
profileFormValidator.enableValidation();
const addingImageFormValidator = new FormValidator (selectors, addingImageFormElement);
addingImageFormValidator.enableValidation();

// добавление экземпляра класса, добавляющего картинки
const addingImagePopup = new PopupWithForm('.popup_type_add-image', {
  submitFormHandler: (data) => {
    api.addCard(data);
    addingImagePopup.close();
  }
});
addingImagePopup.setEventListeners();

// добавление экземпляра класса, редактирующего профиль
const profilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitFormHandler: (data) => {
      api.editUserInfo(data);
      profilePopup.close();
  }
});
profilePopup.setEventListeners();

function createCard(data) {
  const card = new Card (data, '.card-template', {handleCardClick: (src, alt, name) => {
    popupWithImage.open(src, alt, name);
}});

  const cardElement = card.getCard();
  return cardElement;
}

// слушатели:
// открыть попап редактирования профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup._popup.querySelector('.form__input_type_name').value = currentUserInfo.userName;
  profilePopup._popup.querySelector('.form__input_type_job').value = currentUserInfo.userJob;
  profileFormValidator.resetValidation();
});
// открыть попап добавления карточки
addButton.addEventListener('click', () => {
  addingImagePopup.open();
  addingImageFormValidator.resetValidation();
});
