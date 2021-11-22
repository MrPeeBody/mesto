const popup = document.querySelector("#checkin");
const photoPopup = document.querySelector("#photo");
const imagePopup = document.querySelector('#image')
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

const saveContent = document.querySelector(".popup__save-button");
const userName = document.querySelector(".popup__text_type_name");
const userData = document.querySelector(".popup__text_type_data");
const addLocation = document.querySelector(".popup__text_type_location");
const addLink = document.querySelector(".popup__text_type_link");
const profileName = document.querySelector(".profile__title");
const profileData = document.querySelector(".profile__subtitle");
const userForm = document.querySelector(".popup__window_user");
const addPhotoForm = document.querySelector(".popup__window_photo");
const newTitle = document.querySelector(".elem__title");
const popupImg = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__description');


// Функция открывания попапов
profileButton.addEventListener("click", () => {
  
  openUp(popup);
});

addPhotoButton.addEventListener("click", () => {
  openUp(photoPopup);
});

function openUp(elem) {
  elem.classList.add("popup_open");
  userName.value = profileName.textContent;
  userData.value = profileData.textContent;
}

// функция закрывания попапов
closePopupChekin.addEventListener("click", () => {
  closeDown(popup);
});

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
  closeDown(popup);
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

// перебор массива объектов, с выполнением функции по добавлению новой карты для каждого элемента массива
initialCards.forEach((item) => {
  addNewCards(item.name, item.link);
});

// Функция по добавления новой карточки, через клонирование шаблона
function addNewCards(name, link) {
  // Получаем содержимое шаблона
  const elemTemplate = document.querySelector("#elem-template").content;
  // обозначаем контейнер для добавления новых элементов
  const elems = document.querySelector(".elements");
 
  // Клонируем содержимое шаблона в переменную
  const elemCard = elemTemplate
    .querySelector(".elem.elements__elem")
    .cloneNode(true);

    
  // добавляем атрибуты
  elemCard.querySelector(".elem__image").src = link;
  elemCard.querySelector(".elem__title").textContent = name;
  // закидываем готовый элемент в контейнер
  elems.prepend(elemCard);

  // Добавляем лайки
  const likeButton = elemCard.querySelector(".elem__like");
  likeButton.addEventListener('click', function() {
  likeButton.classList.toggle('elem__like_switched');


})
// Удаление карточки

const deleteButton = document.querySelector(".elem__trash");
deleteButton.addEventListener('click', function() {
const deleteElem = deleteButton.closest(".elements__elem");
deleteElem.remove() })

  // открытие попапа картинки
const popupPic = document.querySelector('.elem__image'); 
const hiden = document.querySelector('.popup__full-picture');  
popupPic.addEventListener('click', () => {
  
  openUp(imagePopup);
  popupImg.src = link;
  popupTitle.textContent = name;
  
})
}


// сохранение данных формы и добавление нового фото ----- popup photo

addPhotoForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const city = addLocation.value;
  const href = addLink.value;
  addNewCards(city, href);
  closeDown(photoPopup);
});

