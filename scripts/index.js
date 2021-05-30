
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
  addLikeFunc();
}

// отрисовать карточку в начале при добавлении
function renderCardAtTheBegining(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__image').alt = item.alt;
  cardsList.prepend(card);
  addLikeFunc();
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

  closeAddPopop();
}

// лайкнуть карточку
function like(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like_active');
}

// добавить функцию лайка
function addLikeFunc() {
  const likeButton = document.querySelectorAll('.element__like');

  likeButton.forEach(function(item) {
    item.addEventListener('click', like);
  });
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
