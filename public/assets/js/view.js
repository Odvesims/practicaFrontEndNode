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
  return `<div class="card border-danger mb-3 message-modal">
  <div class="card-header bg-danger text-white">Error</div>
  <div class="card-body text-primary">
    <p class="card-text">${message}</p>
  </div>
  <div class="card-footer text-primary"><button class = "btn btn-default">Cerrar</button></div>
</div>`
}

export function successView(message) {
  return `<div class="card border-success mb-3 message-modal">
  <div class="card-header bg-success text-white">Success</div>
  <div class="card-body text-primary">
    <p class="card-text">${message}</p>
  </div>
  <div class="card-footer text-primary"><button class = "btn btn-default">Cerrar</button></div>
</div>`
}


export function loaderView() {
  return '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
}


export function adPreview(ad) {
  return adCard(ad)
}

export function adDetailedView(ad) {

  let adType = '<span class = "bg-success col">Buy</span>'
  if(ad.type !== 'buy') adType = '<span class = "bg-warning">Sell</span>' 

  if (ad === null || ad.name === undefined) return '<h1> This ad does not exists.</h1>'
  
  let button = ''
  if (ad.allowedToDelete) button = '<button class="mt-1 btn btn-danger" id="ad-delete-btn"> Delete </button>'

  if (ad.photo === "") ad.photo = "no-picture.png"
  
  return `<div><img src="public/assets/images/${ad.photo}" alt="ad-photo"></div>
    <div class = "mt-1">
      <p class="price"> Price: ${ad.price}</p>
      <p class="name"> Description: ${ad.name}</p>
      <p class="type"> Listed for: ${ad.type} </p>
      <p class="tags"> Tags: ${ad.tags} </p>
    </div>
    ${button}`
}

function adCard(ad){
  const ownership = ad.allowedToDelete ? 'You posted this ad' : '';
  if(ad.photo === ''){
    ad.photo = 'no-picture.png';
  }
  let adType = '<span class = "bg-success col">Buy</span>'
  if(ad.type !== 'buy'){
    adType = '<span class = "bg-warning">Sell</span>' 
  };
  return `<a class = "col-4 mt-1 border hand-cursor" href='/detail.html?id=${ad.id}'>
    <div class = 'row bg-primary text-white'>${ad.name}</div>
    <div class = 'row small'>${ownership}</div>
    <div class = 'row'><img src='public/assets/images/${ad.photo}' alt="product-photo"/></div>
    <div class = 'row'>
      <div class = "col-6">Type: ${adType}</div>
      <div class = "col-6">Price: ${ad.price}</div>
    </div>
  </a>`
}