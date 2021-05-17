let editButton = document.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__submit-button');
// let nameInput = document.querySelector('.popup__field-name');
// let jobInput = document.querySelector('.popup__field-profession');
let popupInput = document.querySelector('.popup__input');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function editPopup(evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = popupInput.value;
  profileJob.textContent = popupInput.value;
// здесь редактируется только имя, исправить это потом
  editPopup(evt);
}

editButton.addEventListener('click', editPopup);
closeIcon.addEventListener('click', editPopup);
saveButton.addEventListener('click', formSubmitHandler);
