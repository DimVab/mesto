let editButton = document.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');

function editPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopop() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopop();
}

editButton.addEventListener('click', editPopup);
closeIcon.addEventListener('click', closePopop);
formElement.addEventListener('submit', formSubmitHandler);
