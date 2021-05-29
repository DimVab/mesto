
const cardTemplate = document.querySelector('.card-template').content;
const cardName = cardTemplate.querySelector('.element__name');
const cardImage = cardTemplate.querySelector('.element__image');
const cardAlt = cardTemplate.querySelector('.element__image');
const cardsList = document.querySelector('.elements__list');

const editButton = document.querySelector('.profile__edit-button');
const closeIcon = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup__form');

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
  // card.cardName.textContent = item.name;
  // card.cardImage.src = item.link;
  // card.cardImage.alt = item.alt;
  cardsList.append(card);
}

// открыть попап
function editPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// закрыть попап
function closePopop() {
  popup.classList.remove('popup_opened');
}

// сохранить изменения в редактировании профиля
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopop();
}

// слушатели событий
editButton.addEventListener('click', editPopup);
closeIcon.addEventListener('click', closePopop);
formElement.addEventListener('submit', formSubmitHandler);
