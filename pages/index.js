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


const popupWithImage = new PopupWithImage('.popup_type_open-image');
popupWithImage.setEventListeners();

// отрисовка массива карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, cardsContainer);
cardsList.renderItems();

// добавление валидации
const profileFormValidator = new FormValidator (selectors, profileFormElement);
profileFormValidator.enableValidation();
const addingImageFormValidator = new FormValidator (selectors, addingImageFormElement);
addingImageFormValidator.enableValidation();

// добавление экземпляра класса, добавляющего картинки
const addingImagePopup = new PopupWithForm('.popup_type_add-image', {
  submitFormHandler: (data) => {
    const cardElement = createCard(data);
    cardsList.prependItem(cardElement);
    addingImagePopup.close();
  }
});
addingImagePopup.setEventListeners();

const userInfo = new UserInfo({name: '.profile__name', job: '.profile__job'});

// добавление экземпляра класса, редактирующего профиль
const profilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitFormHandler: (data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
  }
});
profilePopup.setEventListeners();

function createCard(data) {
  const card = new Card (data, '.card-template', {handleCardClick: () => {
    popupWithImage.open(card.src, card.name);
}});

  const cardElement = card.getCard();
  return cardElement;
}

// слушатели:
// открыть попап редактирования профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
  profilePopup._popup.querySelector('.form__input_type_name').value = userInfo.getUserInfo().userName;
  profilePopup._popup.querySelector('.form__input_type_job').value = userInfo.getUserInfo().userJob;
  profileFormValidator.resetValidation();
});
// открыть попап добавления карточки
addButton.addEventListener('click', () => {
  addingImagePopup.open();
  addingImageFormValidator.resetValidation();
});
