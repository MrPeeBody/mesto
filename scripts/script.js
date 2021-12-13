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

const elems = document.querySelector(".elements");



// Функция открывания попапов

function openPopup(elem) {
  elem.classList.add("popup_open");
  document.addEventListener("keydown", closePopupByEsc);
}

profileButton.addEventListener("click", () => {
  userName.value = profileName.textContent;

  userData.value = profileData.textContent;

  openPopup(profilePopup);
});

addPhotoButton.addEventListener("click", () => {
  openPopup(photoPopup);
});

// функция закрытия попапов по клику ОВЕРЛЕЯ

function closePopupByOverlay(popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeDownPopup(popup);
    }
  });
}

closePopupByOverlay(profilePopup);

closePopupByOverlay(photoPopup);

closePopupByOverlay(imagePopup);

// функция закрытия попапов по клав escape

function closePopupByEsc(evt) {
  const openedPopup = document.querySelector(".popup_open");
  if (evt.key === "Escape") {
    closeDownPopup(openedPopup);
  }
}

// функция закрывания попапов

closePopupChekin.addEventListener("click", () => {
  closeDownPopup(profilePopup);
});

closePopupPhoto.addEventListener("click", () => {
  closeDownPopup(photoPopup);
});

closePopupImage.addEventListener("click", () => {
  closeDownPopup(imagePopup);
});

function closeDownPopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupByEsc);
}

// сохранение данных формы ----- popup user

userForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileName.textContent = userName.value;

  profileData.textContent = userData.value;

  closeDownPopup(profilePopup);
});



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

  closeDownPopup(photoPopup);


});
