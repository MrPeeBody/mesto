const profilePopup = document.querySelector("#checkin");
const photoPopup = document.querySelector("#photo");
const imagePopup = document.querySelector("#image");
const profileButton = document.querySelector(".profile__button");
const addPhotoButton = document.querySelector(".profile__add-button");
const closePopupChekin = document.querySelector(
  ".popup__reset-button.popup__reset-button_chekin"
);
const closePopupPhoto = document.querySelector(
  ".popup__reset-button.popup__reset-button_photo"
);

const closePopupImage = document.querySelector(
  ".popup__reset-button.popup__reset-button_image"
);
const userName = document.querySelector(".popup__text_type_name");
const userData = document.querySelector(".popup__text_type_data");
const formInput = document.querySelector(".popup__text");
const addLocation = document.querySelector(".popup__text_type_location");
const addLink = document.querySelector(".popup__text_type_link");
const profileName = document.querySelector(".profile__title");
const profileData = document.querySelector(".profile__subtitle");
const userForm = document.querySelector(".popup__window_user");
const addPhotoForm = document.querySelector(".popup__window_photo");
const newTitle = document.querySelector(".elem__title");
const popupImg = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__description");

// Функция открывания попапов
profileButton.addEventListener("click", () => {
  userName.value = profileName.textContent;
  userData.value = profileData.textContent;
  openPopup(profilePopup);
});

addPhotoButton.addEventListener("click", () => {
  openPopup(photoPopup);
});

function openPopup(elem) {
  elem.classList.add("popup_open");
}

// функция закрывания попапов
closePopupChekin.addEventListener("click", () => {
  closeDown(profilePopup);
});

// функция закрытия попапов по клику оверлея
function closePopupByOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeDown(popup);
    }
  });
}

closePopupByOverlay(profilePopup);
closePopupByOverlay(photoPopup);
closePopupByOverlay(imagePopup);

// функция закрытия попапов по клав escape
function closePopupByEsc(popup) {
  popup.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeDown(popup);
    }
  });
}

closePopupByEsc(profilePopup);
closePopupByEsc(photoPopup);
closePopupByEsc(imagePopup);

closePopupPhoto.addEventListener("click", () => {
  closeDown(photoPopup);
});

closePopupImage.addEventListener("click", () => {
  closeDown(imagePopup);
});

function closeDown(elem) {
  elem.classList.remove("popup_open");
}

// сохранение данных формы ----- popup user
userForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileData.textContent = userData.value;
  closeDown(profilePopup);
});

// реализация добавление карточек через массив объектов
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach((item) => {
  addNewCard(item.name, item.link);
});

function createNewCard(name, link) {
  const elemTemplate = document.querySelector("#elem-template").content;
  const elemCard = elemTemplate
    .querySelector(".elem.elements__elem")
    .cloneNode(true);
  elemCard.querySelector(".elem__image").src = link;
  elemCard.querySelector(".elem__image").alt = "картинка места - " + name;
  elemCard.querySelector(".elem__title").textContent = name;
  const likeButton = elemCard.querySelector(".elem__like");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("elem__like_switched");
  });

  const deleteButton = elemCard.querySelector(".elem__trash");
  deleteButton.addEventListener("click", function () {
    const deleteElem = deleteButton.closest(".elements__elem");
    deleteElem.remove();
  });

  const popupPic = elemCard.querySelector(".elem__image");

  popupPic.addEventListener("click", () => {
    openPopup(imagePopup);
    popupImg.src = link;
    popupImg.alt = "картинка места " + name;
    popupTitle.textContent = name;
  });
  return elemCard;
}

function addNewCard(name, link) {
  const elems = document.querySelector(".elements");
  elems.prepend(createNewCard(name, link));
}

// сохранение данных формы и добавление нового фото ----- popup photo

addPhotoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const city = addLocation.value;
  const href = addLink.value;
  addLocation.value = "";
  addLink.value = "";
  addNewCard(city, href);
  closeDown(photoPopup);
});
