document.addEventListener("DOMContentLoaded", function() {
  var input = document.querySelector('form input[type="text"]');
  input.oninput = function() {
    validateUrl(input.value);
  }
});

function validateForm() {
  var url = document.forms[0].url.value;
  if (validateUrl(url)) {
    return true;
  }
  setErrors('URL is not correct')
  return false;
}

function validateUrl(url) {
  if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url)) {
    clearErrors()
    return true;
  }
  return false;
}

function setErrors(err) {
  var container = document.querySelector('.error-container');
  var input = document.querySelector('form input[type="text"]');
  container.innerHTML = err;
  input.className = 'input-error';
}

function clearErrors() {
  var container = document.querySelector('.error-container');
  var input = document.querySelector('form input[type="text"]');
  container.innerHTML = '';
  input.className = '';
}
