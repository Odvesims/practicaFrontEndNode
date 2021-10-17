import IndexController from "../../../controllers/IndexController.js"

window.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  new IndexController(navbar);
})