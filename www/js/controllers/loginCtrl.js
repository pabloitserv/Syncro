angular.module('app')

.controller('loginCtrl', function($scope, userServiceToken, userServiceLogin, Scopes, $state, $ionicPopup) {

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
                            var pop = $ionicPopup.show({
                              title: "MSG-001",
                              template: "<p class='text-center'>ESTE USUÁRIO NÃO TEM SENHA DEFINIDA!\n\nPRESSIONE OK PARA CONTINUAR</p>"
                            });
                            setTimeout(function(){
                              pop.close();
                              $state.go('criarSenha');
                            }, 2500);
                          }
                    }
                    else if (parametros.cpf == user.value.cpf && parametros.password == user.value.password) {
                       $state.go('corrida');
                    }

              }).error(function(user, status){
                var erroShow = $ionicPopup.alert({
                  title: "Error !",
                  template: "User - "+user+", Status - "+status
                });
              });
          }).error(function(chave, status){
            var erroShow = $ionicPopup.alert({
              title: "Error !",
              template: "User - "+chave+", Status - "+status
            });
          });


  };
});
