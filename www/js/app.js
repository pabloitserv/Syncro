// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function($ionicPlatform, $ionicPopup, $timeout, $interval) {
  $ionicPlatform.ready(function() {
    checkConnection();

    

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


   function checkConnection(){
      if(window.Connection){
        if(navigator.connection.type == Connection.NONE){
          var popupDesconcted = $ionicPopup.show({
            title: 'Aviso <i class="icon ion-alert-circled assertive"></i>',
            template: '<p class="text-center assertive"><strong>Sem conexão com internet!</strong>'
          });
          $timeout(function(){
            popupDesconcted.close();
          }, 5001)
        }
      }
   };
   $interval(function(){
     checkConnection();
   }, 5000);

  });
})
