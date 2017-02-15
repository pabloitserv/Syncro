angular.module('app')

.controller('loginCtrl', function($scope, $location, $window, userServiceToken, userServiceLogin, Scopes, buscarCorrida) {

//Adiciona um token ao usuário
$scope.usuario = '';
$scope.senha = '';
(function loadStorage(){
      $scope.usuario = parseInt(localStorage.getItem("firstItem"));
    })();


    $scope.validarUsuario = function(){

     var parametros = {
          cpf: $scope.usuario,
          password: $scope.senha
        };
        function storageSave(){
          localStorage.setItem("firstItem", parseInt($scope.usuario));
        }
        storageSave();


          Scopes.store('loginCtrl',$scope);

          userServiceToken.postToken(parametros).success(function(chave){
            var token = chave.token;
              userServiceLogin.getLogin(token).success(function(user){

                $scope.user = user.value;
                $scope.nome = user.value.name;
                $scope.token = token;
                $scope.usuario = user.value.usuario;

                    if (parametros.cpf == user.value.cpf && parametros.password == null) {
                          if (user.value.password == null) {
                            alert("MSG001 - ESTE USUÁRIO NÃO TEM SENHA DEFINIDA!\n\nPRESSIONE OK PARA CONTINUAR");
                            $location.path('/page5');
                          }
                    }
                    else if (parametros.cpf == user.value.cpf && parametros.password == user.value.password) {
                       $location.path('/page2');
                    }

              }).error(function(user, status){});
          }).error(function(chave, status){});

        
  };
});
