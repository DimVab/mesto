import './index.css';

import {cardsContainer,
        selectors,
        profileFormElement,
        addingImageFormElement,
        avatarFormElement,
        addButton,
        editButton,
        profileAvatar,
        avatarEditButton } from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'});

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: '1e46d460-5fe9-4d55-8f96-bc20172f2d2e',
    'Content-Type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage('.popup_type_open-image');
popupWithImage.setEventListeners();

const submitPopup = new PopupWithSubmit('.popup_type_submit', {
  submitFormHandler: ((cardId, card) => {
    api.deleteCard(cardId).then(() => {
      card._card.remove();
      submitPopup.close();
    });
  })
});
submitPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', {
  submitFormHandler: ((avatarUrl) => {
    editAvatarPopup.renderSaving(true);
    api.editAvatar(avatarUrl).then((res) => {
      profileAvatar.src = res.avatar;
      editAvatarPopup.close();
    })
    .finally(editAvatarPopup.renderSaving(false, 'Сохранить'));
  })
});
editAvatarPopup.setEventListeners();

// добавление экземпляра класса, добавляющего картинки
const addingImagePopup = new PopupWithForm('.popup_type_add-image', {
  submitFormHandler: (data) => {
    addingImagePopup.renderSaving(true);
    api.addCard(data).then((cardData) => {
      const cardsList = new Section({}, cardsContainer);
      const cardElement = createCard(cardData);
      cardsList.prependItem(cardElement);
    })
    .finally(addingImagePopup.renderSaving(false, 'Создать'));
    addingImagePopup.close();
  }
});
addingImagePopup.setEventListeners();

// добавление экземпляра класса, редактирующего профиль
const profilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitFormHandler: (data) => {
    profilePopup.renderSaving(true);
      api.editUserInfo(data).then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .finally(profilePopup.renderSaving(false, 'Сохранить'));
      profilePopup.close();
  }
});
profilePopup.setEventListeners();

api.getInitialData().then((data) => {
  const [initialCardsData, userInfoData] = data;
  userInfo.setInitialUserInfo(userInfoData);

  const cardsList = new Section({
    items: initialCardsData,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  }, cardsContainer);
  cardsList.renderItems();
})
  .then(() => {
// потом можно в параметр что-нибудь прокинуть;
    addButton.addEventListener('click', () => {
      addingImagePopup.open();
      addingImageFormValidator.resetValidation();
    });

    editButton.addEventListener('click', () => {
      profilePopup.open();
      const currentUserInfo = userInfo.getUserInfo();
      profilePopup._popup.querySelector('.form__input_type_name').value = currentUserInfo.userName;
      profilePopup._popup.querySelector('.form__input_type_job').value = currentUserInfo.userJob;
      profileFormValidator.resetValidation();
    });

    avatarEditButton.addEventListener('click', () => {
      editAvatarPopup.open();
    });
  });

// добавление валидации
const profileFormValidator = new FormValidator (selectors, profileFormElement);
profileFormValidator.enableValidation();
const addingImageFormValidator = new FormValidator (selectors, addingImageFormElement);
addingImageFormValidator.enableValidation();
const avatarFormValidator = new FormValidator (selectors, avatarFormElement);
avatarFormValidator.enableValidation();


function createCard(data) {
  const card = new Card (data, '.card-template',
   {handleCardClick: (src, alt, name) => {
    popupWithImage.open(src, alt, name);
   },
   handleLikeIcon: (id) => {
      if (card.likeButton.classList.contains('element__like_active')) {
        api.removeLikeCard(id).then((res) => {
        card.counter.textContent = res.likes.length;
        card.likeButton.classList.remove('element__like_active');
        });
    } else {
      api.likeCard(id).then((res) => {
        card.counter.textContent = res.likes.length;
        card.likeButton.classList.add('element__like_active');
      });
    }
   },
       handleDeleteIconClick: () => {
        submitPopup.setCardInfo(data._id, card);
        submitPopup.open();
      }
  });
  const cardElement = card.getCard();

  return cardElement;
}

function mouseoverAvatar () {
  // иначе я не понимаю, как сделать так, чтобы один элемент становился прозрачнее, а другой поверх него наоборот проявлялся
  avatarEditButton.classList.add('profile__avatar-edit-icon_hovered');
  profileAvatar.classList.add('profile__avatar_hovered');
}

function mouseoutAvatar () {
  avatarEditButton.classList.remove('profile__avatar-edit-icon_hovered');
  profileAvatar.classList.remove('profile__avatar_hovered');
}

profileAvatar.addEventListener('mouseover', mouseoverAvatar);
avatarEditButton.addEventListener('mouseout', mouseoutAvatar);
