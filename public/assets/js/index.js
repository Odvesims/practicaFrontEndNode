import IndexController from "../../../controllers/IndexController.js"
import MessageController from "../../../controllers/MessagesController.js"
import AdsListController from '../../../controllers/AdsListController.js'
import LoaderController from '../../../controllers/LoaderController.js'

window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  new IndexController(navbar);
  
  const messages = document.querySelector('.message-modal')
  new MessageController(messages)
  
  const loaderDiv = document.querySelector('.loader')
  new LoaderController(loaderDiv)

  const adsListContainer = document.querySelector('.ads-list') 
  const adsListController = new AdsListController(adsListContainer) 
  adsListController.renderAds() 
})