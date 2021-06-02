const popups = document.querySelectorAll('.popup');
const closeIcons = document.querySelectorAll('.popup__close-icon');
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

initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsList.append(newCard);
});

// отрисовать карточку
function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.alt;
  addLikeFunction();
  addDeleteFunction();
  addOpenFunction();
  return card;
}

// открыть попап редактирования профиля
function openProfilePopup() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// открыть папап добавления карточки
function openAddingImagePopup() {
  addingImagePopup.classList.add('popup_opened');
}

// открыть попап с картинкой
function openImagePopup(evt) {
  const eventTarget = evt.target;
  imagePopup.classList.add('popup_opened');
  imagePopup.style.backgroundColor = 'rgba(0, 0, 0, .9)';
  openedImage.src = eventTarget.src;
  caption.textContent = eventTarget.nextElementSibling.firstElementChild.textContent;
}

// закрыть любой попап
function closePopup() {
  popups.forEach((item) => {
    item.classList.remove('popup_opened');
  });
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

  cardNameInput.value = '';
  cardUrlInput.value = '';

  closePopup();
}

// лайкнуть карточку
function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like_active');
}

// добавить функцию лайка
function addLikeFunction() {
  const likeButton = document.querySelectorAll('.element__like');

  likeButton.forEach((item) => {
    item.addEventListener('click', likeCard);
  });
}

// удалить карточку
function deleteCard(evt) {
  const eventTarget = evt.target.closest('.element');
  eventTarget.remove();
}

// добавить функцию удаления карточки
function addDeleteFunction() {
  const deleteButton = document.querySelectorAll('.element__delete');

  deleteButton.forEach((item) => {
    item.addEventListener('click', deleteCard);
  });
}

// добавить картинке слушатель события
function addOpenFunction() {
  const clickImage = document.querySelectorAll('.element__image');

  clickImage.forEach((item) => {
    item.addEventListener('click', openImagePopup);
  });
}

// слушатели событий
// для редактирования профиля
editButton.addEventListener('click', openProfilePopup);
profileFormElement.addEventListener('submit', saveProfileChanges);
// для добавления карточки
addButton.addEventListener('click', openAddingImagePopup);
addingImageFormElement.addEventListener('submit', addCard);
// для закрытия любого попапа
closeIcons.forEach(function(item) {
  item.addEventListener('click', closePopup);
});
