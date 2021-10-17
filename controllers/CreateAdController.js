import AdsDataService from "../services/AdsDataService.js"
import PubSub from "../services/PubSub.js"
import {CreateAdValidation} from '../utils/validations/CreateAdValidation.js'
import UserDataService from "../services/UserDataService.js"

export default class CreateAdController {

  constructor(element) {
    this.element = element 
    this.attachEventListeners();
    document.querySelector('input').focus();
  }

  attachEventListeners() {
    this.element.addEventListener('submit', async function(event) {
      event.preventDefault()
      if (CreateAdValidation(event.srcElement)) {
        try {
          const data = new FormData(this)
          const name = data.get('name')  
          const price = parseFloat(data.get('price'))
          const type = data.get('type')
          const photo = 'no-picture.png'
          const userId = UserDataService.getAuthUserId;
          const tags = data.get('tags');
          const result = await AdsDataService.createAd(name, price, type, photo, userId, tags);
          PubSub.publish(PubSub.events.SHOW_SUCCESS, 'Ad created successfully');
          location.href = '/';
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

    this.element.querySelectorAll('input').forEach(inputElement => {
    /*  inputElement.addEventListener('input', () => {
        if (CreateAdValidation(this.element)) {
          this.element.querySelector('button').removeAttribute('disabled')
        } else {
          this.element.querySelector('button').setAttribute('disabled', true)
        }
      })*/
    })
  }
}
