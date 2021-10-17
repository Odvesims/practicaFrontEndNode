import DataService from "../services/DataService.js"
import PubSub from "../services/PubSub.js"
import {SignUpFormValidation} from '../utils/validations/SignUpValidations.js'

export default class SignupController {

  constructor(element) {
    this.element = element 
    this.attachEventListeners();
    document.querySelector('input').focus();
  }

  validatePasswordsMatch() {
    const passwordInputs = this.element.querySelectorAll('input[type="password"]')
    let passwords = []
    for(let i = 0; i < passwordInputs.length; i++){
      const input = passwordInputs[i];
      if(!passwords.includes(input.value)) passwords.push(input.value)
    };
    if(passwords.length == 1) {
      for(let i = 0; i < passwordInputs.length; i++){
        const input = passwordInputs[i];
        input.setCustomValidity('');
      };
    } else {
      for(let i = 0; i < passwordInputs.length; i++){
        const input = passwordInputs[i];
        input.setCustomValidity('Passwords do not match');
      };
    }
  }

  attachEventListeners() {
    this.element.addEventListener('submit', async function(event) {
      event.preventDefault()
      if (SignUpFormValidation(event.srcElement)) {
        try {
          const data = new FormData(this)
          const username = data.get('username')  
          const password = data.get('password')  
          const result = await DataService.registerUser(username, password)
          PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Sign-up Successful')
        } catch (error) {
          console.log(error);
          PubSub.publish(PubSub.events.SHOW_ERROR, error)
        }
      } else {
        let errorMessage = ''
        for (const element of this.elements) {
          if (element.validity.valid === false) {
            errorMessage += `Error on input ${element.name}: ${element.validationMessage}. `
          }
        }
        PubSub.publish(PubSub.events.SHOW_ERROR, errorMessage)
      }
    })
        
    this.element.querySelectorAll('input[type="password"]').forEach(input => {
      input.addEventListener('input', () => {
        this.validatePasswordsMatch()
      })
    })

    this.element.querySelectorAll('input').forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        if (SignUpFormValidation(this.element)) {
          this.element.querySelector('button').removeAttribute('disabled')
        } else {
          this.element.querySelector('button').setAttribute('disabled', true)
        }
      })
    })
  }
}
