import MessageController from "../../../controllers/MessagesController.js"
import LoaderController from "../../../controllers/LoaderController.js"
import DetailController from "../../../controllers/DetailController.js"

window.addEventListener('DOMContentLoaded', () => {
  
  const messages = document.querySelector('.message-modal')
  new MessageController(messages)
  
  const loaderDiv = document.querySelector('.loader')
  new LoaderController(loaderDiv)

  const adDetailContainer = document.querySelector('.ad-detail-container') 
  const adId = new URLSearchParams(window.location.search).get('id')
  new DetailController(adDetailContainer, adId) 
  
})