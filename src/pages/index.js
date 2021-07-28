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

// добавление экземпляров классов:
// абстрактные классы:
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: '1e46d460-5fe9-4d55-8f96-bc20172f2d2e',
    'Content-Type': 'application/json'
  }
});

const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
}, cardsContainer);

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'});
// классы валидации:
const profileFormValidator = new FormValidator (selectors, profileFormElement);
const addingImageFormValidator = new FormValidator (selectors, addingImageFormElement);
const avatarFormValidator = new FormValidator (selectors, avatarFormElement);
//классы попапов:
const popupWithImage = new PopupWithImage('.popup_type_open-image');
const submitPopup = new PopupWithSubmit('.popup_type_submit', {
  submitFormHandler: ((cardId, card) => {
    api.deleteCard(cardId).then(() => {
      card.cardElement.remove();
      submitPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  })
});

const addingImagePopup = new PopupWithForm('.popup_type_add-image', {
  submitFormHandler: (data) => {
    addingImagePopup.renderSaving(true);
    api.addCard(data).then((cardData) => {
      const cardElement = createCard(cardData);
      cardsList.prependItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addingImagePopup.renderSaving(false, 'Создать');
      addingImagePopup.close();
    });
  }
});

const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', {
  submitFormHandler: ((avatarUrl) => {
    editAvatarPopup.renderSaving(true);
    api.editAvatar(avatarUrl).then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.renderSaving(false, 'Сохранить');
      editAvatarPopup.close();
    });
  })
});

const profilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitFormHandler: (data) => {
    profilePopup.renderSaving(true);
      api.editUserInfo(data).then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderSaving(false, 'Сохранить');
        profilePopup.close();
      });
  }
});

// первоначальная отрисовка карточек и получения данных о пользователе
api.getInitialData()
  .then((data) => {
    const [initialCardsData, userInfoData] = data;
    userInfo.setInitialUserInfo(userInfoData);
    cardsList.renderItems(initialCardsData);
  })
  .then(() => {
    // навешивание слушателей:
    // слушатели на кнопки
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

    // слушатели на иконку аватара
    avatarEditButton.addEventListener('click', () => {
      editAvatarPopup.open();
    });
    profileAvatar.addEventListener('mouseover', mouseoverAvatar);
    avatarEditButton.addEventListener('mouseout', mouseoutAvatar);

    // слушатели на попапы
    popupWithImage.setEventListeners();
    submitPopup.setEventListeners();
    editAvatarPopup.setEventListeners();
    addingImagePopup.setEventListeners();
    profilePopup.setEventListeners();

    // добавление валидации
    profileFormValidator.enableValidation();
    addingImageFormValidator.enableValidation();
    avatarFormValidator.enableValidation();
  })
  .catch((err) => {
    console.log(err);
  });

// функции:
function createCard(data) {
  const card = new Card (data, '.card-template',
   {handleCardClick: (src, alt, name) => {
    popupWithImage.open(src, alt, name);
   },
   handleLikeIcon: (id) => {
    if (card.likeButton.classList.contains('element__like_active')) {
      api.removeLikeCard(id)
      .then((res) => {
      card.counter.textContent = res.likes.length;
      card.likeButton.classList.remove('element__like_active');
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      api.likeCard(id)
      .then((res) => {
        card.counter.textContent = res.likes.length;
        card.likeButton.classList.add('element__like_active');
      })
      .catch((err) => {
        console.log(err);
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
