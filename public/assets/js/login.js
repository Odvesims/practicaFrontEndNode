import MessageController from "../../../controllers/MessagesController.js"
import LoginController from "../../../controllers/LoginController.js"


window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')
    new LoginController(form)
    const messages = document.querySelector('.error-message')
    new MessageController(messages)
})