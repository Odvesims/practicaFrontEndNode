import CreateAdController from "../../../controllers/CreateAdController.js"
import MessageController from "../../../controllers/MessagesController.js"

window.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector('form')
  new CreateAdController(form)
  const messages = document.querySelector('.message-modal')
  new MessageController(messages)
})
