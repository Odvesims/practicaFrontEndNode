export function SignUpFormValidation(form) {
  let user_input = form.querySelector("#username");
  let password_input = form.querySelector("#password");
  let password_confirm_input = form.querySelector("#passwordConfirmation");
  if (user_input.value.length < 6){
    user_input.setCustomValidity('Username must have at least 6 characters');
    return false;
  } 
  if (password_input.value.length < 6 || password_confirm_input.value.length < 6) {
    password_input.setCustomValidity('Password must be at least 6 characters long')
    password_confirm_input.setCustomValidity('Confirmation must be at least 6 characters long')
    return false;
  }
  return true;
}