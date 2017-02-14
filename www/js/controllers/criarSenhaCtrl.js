angular.module('app')

.controller('criarSenhaCtrl', function($scope, userServicePass,userServiceLogin,Scopes,$location,$window){

//Controla a criação de senha
  $scope.criar = function(){
    var usuario = Scopes.get('loginCtrl').user;

    var _id = usuario._id;
    var _password = $scope.novaSenha;

    userServicePass.putPassword(_id, _password).then(function(){
       alert('MSG005 - SENHA CRIADA COM SUCESSO!');
      $location.path('/page1');
    });

  };


})
