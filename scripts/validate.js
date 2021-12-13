// Пилим валидацию

// функция по всем слушателям 
function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  
  formElement.addEventListener('submit', (evt) => {
     evt.preventDefault()
  });
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(formElement, buttonElement, inactiveButtonClass)
    });
  });
};

// проверяем валидность инпута
function checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass}) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass})
  } else {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass})
  }
};

// прячем ошибку
function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';

}
// показываем ошибку
function showInputError(formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;

};

// функция блокировки/разблокировки кнопки 
function toggleButtonState(formElement, buttonElement, inactiveButtonClass) {
  const isFormValid = formElement.checkValidity();
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
  buttonElement.disabled = !isFormValid;
};

// ....конфиг
const validationConfig = {
   formSelector: '.popup__window',
   inputSelector: '.popup__text',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'form__submit_inactive',
   inputErrorClass: 'popup__eror',
   errorClass: 'popup__input-error_active',

}

// захватываем все формы на странице
function enableValidation (config) {
  const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = config;
  const forms = document.querySelectorAll(formSelector);
 
  forms.forEach(form => {
    const newObj = {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}
    setEventListeners(form, newObj)
  })
}
// hallelujah!!!
enableValidation(validationConfig)
