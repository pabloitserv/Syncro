angular.module('app')

.controller('criarSenhaCtrl', function($scope, userServicePass,Scopes, $ionicPopup, $state){

//Controla a criação de senha
  $scope.criar = function(){
    var usuario = Scopes.get('loginCtrl').user;

    var _id = usuario._id;
    var _password = $scope.novaSenha;

    userServicePass.putPassword(_id, _password).then(function(){
       var pop = $ionicPopup.show({
         title:"MSG005",
         template:"SENHA CRIADA COM SUCESSO!"
       });
       setTimeout(function(){
         pop.close();
         $state.go('login');
       }, 2500);
    });

  };


})
