// Пилим Валидацию
const popupForm = document.querySelector(".popup__window");
const popupInput = popupForm.querySelector(".popup__text");

// функция событий по всем инпутам

function setEventListeners(form, {inputSelector, submitButtonSelector}) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));

  function hideSubmitButtons() {
    const popupSubmitButtons = Array.from(
      form.querySelectorAll(submitButtonSelector)
    );
    popupSubmitButtons.forEach((button) => {
      toggleButtonState(inputList, button);
    });
  }

  inputList.forEach((elem) => {
    hideSubmitButtons();

    elem.addEventListener("input", () => {
      isValid(form, elem);
      hideSubmitButtons();
      
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
  input.classList.remove("popup__eror");
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


const validationConfig = {
  formSelector: '.popup__window',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
}

function enableValidation(config) {
  const {formSelector, inputSelector, submitButtonSelector} = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((elem) => {
    elem.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const newObj = {inputSelector, submitButtonSelector};
    setEventListeners(elem, newObj);
  });
}

enableValidation(validationConfig);
