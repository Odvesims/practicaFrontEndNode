import SignupController from "../../../controllers/SignUpController.js"
import MessageController from "../../../controllers/MessagesController.js"

window.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector('form')
  new SignupController(form)
  const messages = document.querySelector('.error-message')
  new MessageController(messages)
})
