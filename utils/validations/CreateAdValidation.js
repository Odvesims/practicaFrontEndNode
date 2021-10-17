export function CreateAdValidation(form) {
  
  const AD_NAME = 'Ad name must be at least 5 characters in length.';
  const AD_PRICE = 'Ad price must be a number greater than 0.';
  const AD_TYPE = 'Ad type must be either buy or sell.';

  let ad_name_input = form.querySelector("#name");
  let ad_price_input = form.querySelector("#price");
  let ad_type_input = form.querySelector("#type");
  
  if (ad_name_input.value.length < 5){
    ad_name_input.setCustomValidity(AD_NAME);
    return false;
  }  

  if(ad_price_input.value === '' || isNaN(ad_price_input.value) || !parseFloat(ad_price_input.value)){
    ad_price_input.setCustomValidity(AD_PRICE);
    return false;
  }

  const typeRadios = form.querySelectorAll('input[name="type"]');
  let selectedValue;
  for (const radio of typeRadios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }

  if(selectedValue === undefined){
    ad_type_input.setCustomValidity(AD_TYPE);
    return false;
  }

  return true;
}
