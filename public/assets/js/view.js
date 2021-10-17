export function addView(ad) {
  return `<a href="/detail.html?id=${ad.id}">
  <div class="post">
      <strong class="author">${ad.author}</strong>
      <p class="message">${ad.message}</p>
      <time datetime="${ad.date}">${ad.date}</time>
  </div>
  <hr>
</a>`
}

export function errorView(message) {
  return `<div class="card border-danger mb-3 error">
  <div class="card-header bg-danger text-white">Error</div>
  <div class="card-body text-primary">
    <p class="card-text">${message}</p>
  </div>
  <div class="card-footer text-primary"><button class = "btn btn-default">Cerrar</button></div>
</div>`
}

export function successView(message) {
  return `<div class="card border-success mb-3 error">
  <div class="card-header bg-success text-white">Error</div>
  <div class="card-body text-primary">
    <p class="card-text">${message}</p>
  </div>
  <div class="card-footer text-primary"><button class = "btn btn-default">Cerrar</button></div>
</div>`
}


export function loaderView() {
  return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
}


export function adDetailedView(ad) {
  if (ad === null) {
      return '<h1>Ad not found!</h1>'
  }
  let button = ''
  if (ad.canBeDeleted) {
      button = '<button class="btn btn-danger">Delete</button>'
  }
  return `
      <p style="font-size:2em">${ad.message}</p>
      <strong class="author">${ad.author}</strong> - 
      <time datetime="${ad.date}">${ad.date}</time>
      ${button}
  `
}
