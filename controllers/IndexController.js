import UserDataService from "../services/UserDataService.js"

export default class IndexController {

  constructor(navbar) {
    this.navbar = navbar;
    this.navbar.innerHTML = this.setNavHtml();
    this.attachEventLogOutUser();
  }

  setNavHtml(){
    const userSession = UserDataService.isAuthenticated() ? `<ul class="navbar-nav mr-2"><li class="nav-item"><button id = "log-out" class = "btn btn-danger text-white">Log Out</button></li></ul>` : `<ul class="navbar-nav mr-2"><li class="nav-item"><a class="nav-link" href="/login.html">Log In</a></li><li class="nav-item"><a class="nav-link" href="/signup.html">Sign Up</a></li></ul>`;
    const createAd = UserDataService.isAuthenticated() ? `<li class="nav-item"><a class="nav-link" href="/create.html">Create Ad</a></li>` : ``;
    return `<a class="navbar-brand" href="#">Nodepop</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        ${createAd}
      </ul>
      ${userSession}
    </div>`;
  }
  
  attachEventLogOutUser() {
    const logOutButton = document.querySelector('#log-out')
    if (logOutButton) {
      logOutButton.addEventListener('click', () => {
        localStorage.removeItem('AUTH_TOKEN')
        window.location.reload();
      })

    }
  }

}