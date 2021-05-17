let editButton = document.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__submit-button');
let nameInput = document.querySelector('.popup__field-name');
let jobInput = document.querySelector('.popup__field-profession');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let like = document.querySelectorAll('.element__like');

function editPopup() {
  popup.classList.add('popup_opened');
}

function closePopup (evt) {
  evt.preventDefault();

  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(evt);
}

editButton.addEventListener('click', editPopup);
closeIcon.addEventListener('click', closePopup);
saveButton.addEventListener('click', formSubmitHandler);

for (let i = 0; i < like.length; i++) {
  like[i].addEventListener('click', function likeClick() {
    if (like[i].hasAttribute('active')) {
    like[i].setAttribute('src', './images/icons/like.svg');
    like[i].removeAttribute('active');
    } else {
    like[i].setAttribute('src', './images/icons/like_active.svg');
    like[i].setAttribute('active', 'like_active');
    }
  });
}
