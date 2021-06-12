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
// переменные, связанные с добавлением карточек
const addButton = document.querySelector('.profile__add-button');
const addingImagePopup = document.querySelector('.popup_type_add-image');
const addingImageFormElement = addingImagePopup.querySelector('.popup__form');
const cardNameInput = addingImagePopup.querySelector('.popup__input_type_name-of-card');
const cardUrlInput = addingImagePopup.querySelector('.popup__input_type_url');
// переменные, связанные с открытием попапа с картинкой
const imagePopup = document.querySelector('.popup_type_open-image');
const openedImage = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');
// другие переменные
const exitKey = 'Escape';


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
  cardImage.addEventListener('click', () => openImagePopup(item));
  return card;
}

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
  // чтобы состояние кнопки возвращалось к исходному, если закрыл попап с неактивной кнопкой
  resetButtonState(popup, config);
}

// открыть попап добавления картинки (вынес в отдельную функцию, чтобы поля обнулялись, когда закрыл попап)
function openAddingImagePopup(popup, config) {
  openPopup(popup);
  addingImageFormElement.reset();
  // чтобы состояние кнопки возвращалось к исходному, если закрыл попап с активной кнопкой
  resetButtonState(popup, config);
}

// открыть попап с картинкой
function openImagePopup(cardData) {
  openPopup(imagePopup);
  openedImage.src = cardData.link;
  caption.textContent = cardData.name;
}

// закрыть любой попап
function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  closeIcon.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', handleExitUsingKey);
  popup.removeEventListener('click', handleClickOverlay);
  hideInputErrors(popup, selectors);
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

// слушатели событий:
// для редактирования профиля
editButton.addEventListener('click', () => openProfilePopup(profilePopup, selectors));
profileFormElement.addEventListener('submit', saveProfileChanges);
// для добавления карточки
addButton.addEventListener('click', () => openAddingImagePopup(addingImagePopup, selectors));
addingImageFormElement.addEventListener('submit', addCard);

