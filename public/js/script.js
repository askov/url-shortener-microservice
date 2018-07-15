'use strict';

var urlForm;

document.addEventListener("DOMContentLoaded", function () {
  urlForm = (function () {
    var err = document.querySelector('.error-container');
    var fields = [
      {
        input: document.forms[0].url,
        validator: validateUrl,
      }
    ];
    return new Form(err, fields);
  })();
});

var Form = function (errorContainer, fields) {
  this.errors = [];
  this.errorContainer = errorContainer;
  this.fields = this.initFields(fields);
};
Form.prototype.initFields = function (fields) {
  var tmp = [];
  for (var i = 0; i < fields.length; i++) {
    tmp.push(new FormInput(fields[i]));
    this.initInputEvents(fields[i].input);
  }
  return tmp;
};
Form.prototype.initInputEvents = function (input) {
  var form = this;
  input.oninput = function () {
    form.validate();
  }
};
Form.prototype.updateErrorDisplay = function () {
  this.errorContainer.innerHTML = this.errors[0] || '';
};
Form.prototype.clearErrors = function () {
  this.errors = [];
  this.updateErrorDisplay();
};
Form.prototype.addError = function (err) {
  this.errors.push(err);
};
Form.prototype.validate = function () {
  this.clearErrors();
  for (var i = 0; i < this.fields.length; i++) {
    const err = this.fields[i].validator(this.fields[i].el.value);
    if (err) {
      this.addError(err);
    }
  }
  this.updateErrorDisplay();
  return !this.errors.length;
};
Form.prototype.submit = function () {
  this.error.innerHTML = '';
};


var FormInput = function (field) {
  this.el = field.input;
  this.validator = field.validator;
  this.errClass = 'input-error';
};
FormInput.prototype.setErrorClass = function () {
  const tmp = this.el.className.split(' ');
  if (tmp.indexOf(this.errClass) === -1) {
    tmp.push(this.errClass);
  }
  this.el.className = tmp.join(' ');
};
FormInput.prototype.removeErrorClass = function () {
  const tmp = this.el.className.split(' ');
  var index = tmp.indexOf(this.errClass);
  if (index !== -1) {
    tmp.splice(index, 1);
  }
  this.el.className = tmp.join(' ');
};

// Validators
function validateUrl(url) {
  if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url)) {
    return '* URL is not correct';
  }
  return null;
}