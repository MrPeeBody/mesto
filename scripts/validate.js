// Пилим Валидацию
const popupForm = document.querySelector(".popup__window");
const popupInput = popupForm.querySelector(".popup__text");

// функция событий по всем инпутам

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__text"));

  function hideSaveButtons() {
    const popupSaveButtons = Array.from(
      form.querySelectorAll(".popup__save-button")
    );
    popupSaveButtons.forEach((button) => {
      toggleButtonState(inputList, button);
    });
  }

  inputList.forEach((elem) => {
    hideSaveButtons();

    elem.addEventListener("input", () => {
      isValid(form, elem);
      hideSaveButtons();
    });
  });
}

// блокировка и стилизация кнопок попапа
function toggleButtonState(arrInput, button) {
  if (isUnvalid(arrInput)) {
    button.classList.add("form__submit_inactive");
    button.setAttribute("disabled", "true");
  } else {
    button.classList.remove("form__submit_inactive");
    button.removeAttribute("disabled", "true");
  }
}

function isUnvalid(arrInput) {
  return arrInput.some((elem) => {
    return !elem.validity.valid;
  });
}

// показываем спан ошибки
function shoWInputError(form, input, message) {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  input.classList.add("popup__eror");
  errorMessage.textContent = message;
}

// прячем спан ошибки
function hideInputError(form, input) {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup_eror");
  errorMessage.textContent = "";
}

// проверка валидности инпута
function isValid(form, input) {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    shoWInputError(form, input, input.validationMessage);
  }
}

// функция валидации всех форм
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__window"));
  formList.forEach((elem) => {
    elem.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(elem);
  });
}

enableValidation();
