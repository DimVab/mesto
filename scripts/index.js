// переменные, связанные с массивом и шаблоном
const cardTemplate = document.querySelector('.card-template').content;
const cardName = cardTemplate.querySelector('.element__name');
const cardImage = cardTemplate.querySelector('.element__image');
const cardAlt = cardTemplate.querySelector('.element__image');
const cardsList = document.querySelector('.elements__list');
// переменные, связанные с редактированием профиля
const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit-profile');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profilePopupCloseIcon = profilePopup.querySelector('.popup__close-icon');
// переменные, связанные с добавлением карточек
const addButton = document.querySelector('.profile__add-button');
const addingImagePopup = document.querySelector('.popup_type_add-image');
const addingImageFormElement = addingImagePopup.querySelector('.popup__form');
const cardNameInput = addingImagePopup.querySelector('.popup__input_type_name-of-card');
const cardUrlInput = addingImagePopup.querySelector('.popup__input_type_url');
const addingImagePopupCloseIcon = addingImagePopup.querySelector('.popup__close-icon');
// переменные, связанные с открытием попапа с картинкой
const imagePopup = document.querySelector('.popup_type_open-image');
const openedImage = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseIcon = imagePopup.querySelector('.popup__close-icon');

// отрисовать карточки из массива
initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsList.append(newCard);
});

// создать карточку
function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const likeButton = card.querySelector('.element__like');
  const deleteButton = card.querySelector('.element__delete');
  const cardImage = card.querySelector('.element__image');
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.alt;
  likeButton.addEventListener('click', handleLikeIcon);
  deleteButton.addEventListener('click', handleDeleteIcon);
  cardImage.addEventListener('click', () => openImagePopup(cardImage));
  return card;
}

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// открыть попап редактирования профиля
function openProfilePopup() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открыть попап с картинкой
function openImagePopup(cardImage) {
  openPopup(imagePopup);
  imagePopup.classList.add('popup_transparency_dark');
  openedImage.src = cardImage.src;
  caption.textContent = cardImage.nextElementSibling.firstElementChild.textContent;
}

// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

  cardNameInput.value = '';
  cardUrlInput.value = '';

  closePopup(addingImagePopup);
}

// лайкнуть карточку
function handleLikeIcon(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like_active');
}

// удалить карточку
function handleDeleteIcon(evt) {
  const eventTarget = evt.target.closest('.element');
  eventTarget.remove();
}

// слушатели событий
// для редактирования профиля
editButton.addEventListener('click', openProfilePopup);
profileFormElement.addEventListener('submit', saveProfileChanges);
profilePopupCloseIcon.addEventListener('click', () => closePopup(profilePopup));
// для добавления карточки
addButton.addEventListener('click', () => openPopup(addingImagePopup));
addingImageFormElement.addEventListener('submit', addCard);
addingImagePopupCloseIcon.addEventListener('click', () => closePopup(addingImagePopup));
// закрыть попап с картинкой
imagePopupCloseIcon.addEventListener('click', () => closePopup(imagePopup));
