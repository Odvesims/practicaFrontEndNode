import { loaderView } from "../public/assets/js/view.js"
import PubSub from "../services/PubSub.js"

export default class LoaderController {

  constructor(element) {
    this.element = element
    this.element.innerHTML = loaderView()
    PubSub.subscribe(PubSub.events.HIDE_LOADING, () => {
        this.hideLoader()
    })
    PubSub.subscribe(PubSub.events.SHOW_LOADING, () => {
        this.showLoader()
    })
  }

  hideLoader() {
    this.element.style.display = "none" 
  }

  showLoader() {
    this.element.style.display = "initial" 
  }
}