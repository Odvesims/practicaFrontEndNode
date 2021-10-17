import PubSub from '../services/PubSub.js'
import AdsDataService from '../services/AdsDataService.js';
import { adDetailedView } from '../public/assets/js/view.js'

export default class AdsListController {

  constructor(element, adId) {
    this.element = element 
    this.adId = adId;
    this.loadAd() 
  }

  async loadAd() {
    PubSub.publish(PubSub.events.SHOW_LOADING) 
    try { 
      const ad = await AdsDataService.getAd(this.adId) 
      
      this.element.innerHTML = adDetailedView(ad) 
      this.addDeleteButtonEventListener(ad)
    } catch (error) {
      PubSub.publish(PubSub.events.SHOW_ERROR, error)
    } finally {
      PubSub.publish(PubSub.events.HIDE_LOADING) 
    }
  }

  addDeleteButtonEventListener(ad) {
    const button = this.element.querySelector('button')
    if (button) {
      button.addEventListener('click', async () => {
        const answer = confirm('Do you confirm you want to delete this ad?')
        if (answer === true) {
          PubSub.publish(PubSub.events.SHOW_LOADING) 
          button.setAttribute('disabled', 'disabled') 
          try {
            await AdsDataService.deleteAd(ad.id) 
            PubSub.publish(PubSub.events.SHOW_SUCCESS, 'The ad was deleted successfully.')
            setTimeout( function() {
                window.location.href = '/' 
            }, 1500)
          } catch(error) {
            PubSub.publish(PubSub.events.SHOW_ERROR, error)
            button.removeAttribute('disabled') 
          } finally {
            PubSub.publish(PubSub.events.HIDE_LOADING) 
          }
        }
      })
    }
  }

}