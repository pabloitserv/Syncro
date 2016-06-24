angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
    url: '/page1',
    templateUrl: 'templates/login.html'
  })

  .state('corrida', {
    url: '/page2',
    templateUrl: 'templates/corrida.html'
  })

  .state('novaCorrida', {
    url: '/page3',
    templateUrl: 'templates/novaCorrida.html'
  })

  .state('fecharCorrida', {
    url: '/page4',
    templateUrl: 'templates/fecharCorrida.html'
  })

  .state('criarSenha', {
    url:'/page5',
    templateUrl: 'templates/criarSenha.html'
  })

$urlRouterProvider.otherwise('/page1')



});
