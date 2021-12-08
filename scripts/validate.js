// Пилим Валидацию

// функция событий по всем инпутам

function setEventListeners(
  form,
  { inputSelector, submitButtonSelector, submitInactiveClass }
) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));

  function hideSubmitButtons() {
    const popupSubmitButtons = Array.from(
      form.querySelectorAll(submitButtonSelector)
    );
    popupSubmitButtons.forEach((button) => {
      toggleButtonState(inputList, button, submitInactiveClass);
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
function toggleButtonState(arrInput, button, submitInactiveClass) {
  if (isUnvalid(arrInput)) {
    button.classList.add(submitInactiveClass);
    button.setAttribute("disabled", "true");
  } else {
    button.classList.remove(submitInactiveClass);
    button.removeAttribute("disabled", "true");
  }
}

function isUnvalid(arrInput) {
  return arrInput.some((elem) => {
    return !elem.validity.valid;
  });
}

// показываем спан ошибки
function shoWInputError(form, input, message, popupErrorClass) {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  input.classList.add(popupErrorClass);
  errorMessage.textContent = message;
}

// прячем спан ошибки
function hideInputError(form, input, popupErrorClass) {
  const errorMessage = form.querySelector(`.${input.id}-error`);
  input.classList.remove(popupErrorClass);
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
  formSelector: ".popup__window",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__save-button",
  submitInactiveClass: "form__submit_inactive",
  popupErrorClass: "popup__eror",
};

function enableValidation(config) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    submitInactiveClass,
    popupErrorClass,
  } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((elem) => {
    elem.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const newObj = {
      inputSelector,
      submitButtonSelector,
      submitInactiveClass,
      popupErrorClass,
    };
    setEventListeners(elem, newObj);
  });
}

enableValidation(validationConfig);
