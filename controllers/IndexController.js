import DataService from "../services/DataService.js"

export default class IndexController {

  constructor(navbar) {
    this.navbar = navbar;
    const userSession = DataService.isAuthenticated() ? `<ul class="navbar-nav mr-2"><li class="nav-item"><button id = "log-out" class = "btn btn-danger text-white">Log Out</button></li></ul>` : `<ul class="navbar-nav mr-2"><li class="nav-item"><a class="nav-link" href="/login.html">Log In</a></li><li class="nav-item"><a class="nav-link" href="/signup.html">Sign Up</a></li></ul>`;
    const navHtml = `<a class="navbar-brand" href="#">Nodepop</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Create Ad</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
      <form class="form-inline mr-5">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      ${userSession}
    </div>`;
    this.navbar.innerHTML = navHtml;
    this.attachEventLogOutUser();
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