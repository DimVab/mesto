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

// вообще не понял, как тут сделать универсальный код, чтобы применялся сразу ко всем иконкам лайков, поэтому каждому лайку - свой код
function likeClick1() {
  if (like[0].hasAttribute('active')) {
    like[0].setAttribute('src', './images/icons/like.svg');
    like[0].removeAttribute('active');
  } else {
    like[0].setAttribute('src', './images/icons/like_active.svg');
    like[0].setAttribute('active', 'like_active');
  }
}

function likeClick2() {
  if (like[1].hasAttribute('active')) {
    like[1].setAttribute('src', './images/icons/like.svg');
    like[1].removeAttribute('active');
  } else {
    like[1].setAttribute('src', './images/icons/like_active.svg');
    like[1].setAttribute('active', 'like_active');
  }
}

function likeClick3() {
  if (like[2].hasAttribute('active')) {
    like[2].setAttribute('src', './images/icons/like.svg');
    like[2].removeAttribute('active');
  } else {
    like[2].setAttribute('src', './images/icons/like_active.svg');
    like[2].setAttribute('active', 'like_active');
  }
}

function likeClick4() {
  if (like[3].hasAttribute('active')) {
    like[3].setAttribute('src', './images/icons/like.svg');
    like[3].removeAttribute('active');
  } else {
    like[3].setAttribute('src', './images/icons/like_active.svg');
    like[3].setAttribute('active', 'like_active');
  }
}

function likeClick5() {
  if (like[4].hasAttribute('active')) {
    like[4].setAttribute('src', './images/icons/like.svg');
    like[4].removeAttribute('active');
  } else {
    like[4].setAttribute('src', './images/icons/like_active.svg');
    like[4].setAttribute('active', 'like_active');
  }
}

function likeClick6() {
  if (like[5].hasAttribute('active')) {
    like[5].setAttribute('src', './images/icons/like.svg');
    like[5].removeAttribute('active');
  } else {
    like[5].setAttribute('src', './images/icons/like_active.svg');
    like[5].setAttribute('active', 'like_active');
  }
}

like[0].addEventListener('click', likeClick1);
like[1].addEventListener('click', likeClick2);
like[2].addEventListener('click', likeClick3);
like[3].addEventListener('click', likeClick4);
like[4].addEventListener('click', likeClick5);
like[5].addEventListener('click', likeClick6);
