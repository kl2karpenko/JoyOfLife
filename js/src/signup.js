ko.components.register('signup', {
  viewModel: {},
  template: { require: 'text!tmpl/signup.html' }
});

ko.components.defaultLoader.loadTemplate("signup", {}, function (ca) {
  console.log(ca);
});