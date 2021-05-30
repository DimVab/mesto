
// переменные, связанные с массивом и шаблоном
const cardTemplate = document.querySelector('.card-template').content;
const cardName = cardTemplate.querySelector('.element__name');
const cardImage = cardTemplate.querySelector('.element__image');
const cardAlt = cardTemplate.querySelector('.element__image');
const cardsList = document.querySelector('.elements__list');
// переменные, связанные с редактированием профиля
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup')[0];
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = popup.querySelector('.popup__form');
const closeIcon = popup.querySelector('.popup__close-icon');
// переменные, связанные с добавлением карточек
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelectorAll('.popup')[1];
const addPopopCloseIcon = addPopup.querySelector('.popup__close-icon');
const formElementAddButton = addPopup.querySelector('.popup__form');
const cardNameInput = addPopup.querySelector('.popup__input_type_name-of-card');
const cardUrlInput = addPopup.querySelector('.popup__input_type_url');
// переменные, связанные с открытием попапа с картинкой
const ImagePopup = document.querySelectorAll('.popup')[2];
const ImagePopupImage = ImagePopup.querySelector('.popup__image');
const ImagePopupCaption = ImagePopup.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Алтай',
    link: './images/elements/Altai.jpg',
    alt: 'Горные луга Алтая'
  },
  {
    name: 'Побережье Камчатки',
    link: './images/elements/Kamchatka-beach.jpg',
    alt: 'Побережье Камчатки'
  },
  {
    name: 'Парк Монрепо',
    link: './images/elements/Monrepo.jpg',
    alt: 'Парк Монрепо зимой'
  },
  {
    name: 'Байкал',
    link: './images/elements/Baikal.jpg',
    alt: 'Байкал зимой'
  },
  {
    name: 'Красная поляна',
    link: './images/elements/Krasnaya-polyana.jpg',
    alt: 'Горы на Красной поляне'
  },
  {
    name: 'Вулкан Камчатки',
    link: './images/elements/Kamchatka-volkano.jpg',
    alt: 'Вулкан на Камчатке'
  }
];

renderCards();

// отрисовать все карточки массива
function renderCards() {
  initialCards.forEach(renderCard);
}

// отрисовать карточку
function renderCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.alt;
  cardsList.append(card);
  addLikeFunction();
  addDeleteFunction();
  addImagePopup();
}

// отрисовать карточку в начале при добавлении
function renderCardAtTheBegining(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.alt;
  cardsList.prepend(card);
  addLikeFunction();
  addDeleteFunction();
  addImagePopup();
}

// открыть попап редактирования профиля
function editPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрыть попап редактирования профиля
function closePopop() {
  popup.classList.remove('popup_opened');
}

// открыть папап добавления карточки
function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

// закрыть попап добавления карточки
function closeAddPopop() {
  addPopup.classList.remove('popup_opened');
}

// сохранить изменения в редактировании профиля
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopop();
}

// добавить карточку
function addCard(evt) {
  evt.preventDefault();

  const item = {};

  item.name = cardNameInput.value;
  item.link = cardUrlInput.value;
  renderCardAtTheBegining(item);

  cardNameInput.value = '';
  cardUrlInput.value = '';

  closeAddPopop();
}

// лайкнуть карточку
function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like_active');
}

// добавить функцию лайка
function addLikeFunction() {
  const likeButton = document.querySelectorAll('.element__like');

  likeButton.forEach(function(item) {
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

  deleteButton.forEach(function(item) {
    item.addEventListener('click', deleteCard);
  });
}

// открыть попап с картинкой
function openImage(evt) {
  const eventTarget = evt.target;
  ImagePopup.classList.add('popup_opened');
  ImagePopup.style.backgroundColor = 'rgba(0, 0, 0, .9)';
  ImagePopupImage.src = eventTarget.src;
  ImagePopupCaption.textContent = eventTarget.nextElementSibling.firstElementChild.textContent;
}

// закрыть попап с картинкой
function closeImage() {
  ImagePopup.classList.remove('popup_opened');
}

// добавить картинке слушатель события
function addImagePopup() {
  const clickImage = document.querySelectorAll('.element__image');
  const closeIcon = ImagePopup.querySelector('.popup__close-icon');

  clickImage.forEach(function(item) {
    item.addEventListener('click', openImage);
  });

  closeIcon.addEventListener('click', closeImage);
}

// слушатели событий
// для редактирования профиля
editButton.addEventListener('click', editPopup);
closeIcon.addEventListener('click', closePopop);
formElement.addEventListener('submit', formSubmitHandler);
// для добавления карточки
addButton.addEventListener('click', openAddPopup);
addPopopCloseIcon.addEventListener('click', closeAddPopop);
formElementAddButton.addEventListener('submit', addCard);
