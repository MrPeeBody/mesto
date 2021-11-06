let popup = document.querySelector(".popup");
let openPopup = document.querySelector(".profile__button");
let closePopup = document.querySelector(".popup__reset-button");
let saveContent = document.querySelector(".popup__save-button");
let userName = document.querySelector(".popup__text_type_name");
let userData = document.querySelector(".popup__text_type_data");
let profileName = document.querySelector(".profile__title");
let profileData = document.querySelector(".profile__subtitle");
let form = document.querySelector(".popup__window");

openPopup.addEventListener("click", openUp);
function openUp() {
  popup.classList.add("popup_open");
  userName.value = profileName.textContent;
  userData.value = profileData.textContent;
}

closePopup.addEventListener("click", closeDown);
function closeDown() {
  popup.classList.remove("popup_open");
}

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = userName.value;
  profileData.textContent = userData.value;
  closeDown();
});
