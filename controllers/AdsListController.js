import { adPreview } from '../public/assets/js/view.js'
import PubSub from '../services/PubSub.js'
import AdsDataService from '../services/AdsDataService.js';

export default class AdsListController {

  constructor(element) {
    this.element = element;
  }

  async renderAds() {
    PubSub.publish(PubSub.events.SHOW_LOADING)
    try {
      const ads = await AdsDataService.getAds() 
      if (ads.length === 0) {
        PubSub.publish(PubSub.events.SHOW_WARNING, 'No ads found.') ;
        this.element.innerHTML += '<h1>No Ads found</h1>';
      } else {
        let index = 0;
        let row_div;
        for (const ad of ads) {
          if(index % 3 === 0){
            row_div = document.createElement("div");
            row_div.classList = "row";  
            this.element.appendChild(row_div);
          }
          row_div.innerHTML += adPreview(ad);
          index++;
        }
        this.element.appendChild(row_div);
      }
    } catch (error) {
      console.log(error)
      PubSub.publish(PubSub.events.SHOW_ERROR, error)
    } finally {
      PubSub.publish(PubSub.events.HIDE_LOADING) 
    }
  }

}