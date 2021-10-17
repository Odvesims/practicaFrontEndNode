import RequestsService from "./RequestsService.js"
import UserDataService from "./UserDataService.js"

export default {

  getAds: async function () {
    const url = 'http://localhost:8000/api/ads?_expand=user'
    const ads = await RequestsService.get(url)
    return ads.map(ad => this.parseAd(ad)) 
  },

  getAd: async function (addId) {
    const url = `http://localhost:8000/api/ads?id=${addId}`
    const ad = await RequestsService.get(url);
    return this.parseAd(ad[0]);
  },

  deleteAd: async function(adId) {
      const url = `http://localhost:8000/api/ads/${adId}`
      return await RequestsService.delete(url)
  },

  createAd: async function(name, price, type, photo, userId, tags) {
    const url = 'http://localhost:8000/api/ads'
    return await RequestsService.post(url, {name, price, type, photo, userId, tags})
  },

  parseAd: function (ad) { 
    ad.name = ad.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    ad.type = ad.type
    ad.price = ad.price
    ad.photo = ad.photo
    ad.id = ad.id
    ad.tags = ad.tags
    ad.allowedToDelete = (ad.userId === UserDataService.getAuthUserId())
    return ad
  },
}