export function CreateAdValidation(form) {
  const AD_NAME =
    'Ad name must be at least 5 characters in length and can only contain alphanumeric values.';
  const AD_PRICE = 'Ad price must be a number greater than 0.';
  const AD_TYPE = 'Ad type must be either buy or sell.';
  const AD_TAGS = 'Ad tags can only contain alphanumeric values.';

  let ad_name_input = form.querySelector('#name');
  let ad_price_input = form.querySelector('#price');
  let ad_type_input = form.querySelector('#type');
  let ad_tags_input = form.querySelector('#tags');

  let ad_name_regex =
    /^[a-zA-Z0-9À-ÿ\u00f1\u00d1]{1,}(((\s){1}[a-zA-Z0-9À-ÿ\u00f1\u00d1]{1,}){1,})?$/i;
  let ad_tags_regex = /^[\w ,!?]+$/;

  if (ad_name_regex.test(ad_name_input.value) == false) {
    ad_name_input.setCustomValidity(AD_NAME);
    return false;
  }

  if (
    ad_price_input.value === '' ||
    isNaN(ad_price_input.value) ||
    !parseFloat(ad_price_input.value)
  ) {
    ad_price_input.setCustomValidity(AD_PRICE);
    return false;
  }

  if (ad_tags_regex.test(ad_tags_input.value) == false) {
    ad_tags_input.setCustomValidity(AD_TAGS);
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

  if (selectedValue === undefined) {
    ad_type_input.setCustomValidity(AD_TYPE);
    return false;
  }

  return true;
}
