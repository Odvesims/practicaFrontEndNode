export function SignUpFormValidation(form) {

  const USER_MESSAGE = 'Username must be between 8 and 20 characters in length. It must have at least 1 letter and 1 number and may only contain number/letters/dot/dashes.';
  const PASSWORD_MESSAGE = 'Password must be at least 6 characters long and contain at least one letter and one number';
  const CONFIRMATION_MESSAGE = 'Password and confirmation must match';

  let user_input = form.querySelector("#username");
  let password_input = form.querySelector("#password");
  let password_confirm_input = form.querySelector("#passwordConfirmation");

  let user_valid_msg = form.querySelector("#userValidationMessage");
  let pass_valid_msg = form.querySelector("#passwordValidationMessage");
  let conf_valid_msg = form.querySelector("#confirmationValidationMessage");
  
  if (user_input.value.length < 6 || user_input.value.search(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9.-]{8,20}$/)){
    user_input.reportValidity(USER_MESSAGE);
    setInputValidationMessage(user_input, user_valid_msg, USER_MESSAGE);
    return false;
  } else{
    clearInputValidationMessage(user_input, user_valid_msg);
  } 

  if (password_input.value.length < 6 || password_input.value.search(/.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/)) {
    password_input.setCustomValidity(PASSWORD_MESSAGE);
    setInputValidationMessage(password_input, pass_valid_msg, PASSWORD_MESSAGE);
    return false;
  } else{
    clearInputValidationMessage(password_input, pass_valid_msg);
  }

  if (password_input.value !== password_confirm_input.value) {
    password_confirm_input.setCustomValidity(CONFIRMATION_MESSAGE);
    setInputValidationMessage(password_confirm_input, conf_valid_msg, CONFIRMATION_MESSAGE);
    return false;
  } else{
    clearInputValidationMessage(password_confirm_input, conf_valid_msg);
  }

  return true;
}

function setInputValidationMessage(input, message_div, message){
  if(document.activeElement === input){
    input.className += ' border-danger';
    message_div.innerHTML = message;
    message_div.className = "text-danger small ml-4";
  }
}

function clearInputValidationMessage(input, message_div){
  input.classList.remove('border-danger');
  message_div.innerHTML = "";
}