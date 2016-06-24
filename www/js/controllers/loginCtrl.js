angular.module('app')

.controller('loginCtrl', function($scope, $location, userServiceToken, userServiceLogin, Scopes) {

    $scope.validarUsuario = function(){

        var parametros = {
          cpf: $scope.usuario,
          password: $scope.senha
        };

          userServiceToken.postToken(parametros).success(function(chave){
          var token =chave.token;
          userServiceLogin.getLogin(token).success(function(user){

              $scope.user = user.value;
              $scope.nome = user.value.name;
              $scope.token = token;
              $scope.usuario = user.value.usuario;

              Scopes.store('loginCtrl',$scope);


              if (user.value != null) {

                  if (user.value.password == "" || user.value.password == null) {

                    alert("MSG003 - ESTE USUÁRIO NÃO TEM SENHA DEFINIDA!");
                      $location.path('/page5');
                  }else{
                      console.log('entrou na corrida');
                      $location.path('/page2');

                    }
              }else{
                alert("MSG002 - LOGIN INEXISTENTE!");
              }

              }).error(function(user,status){
                $scope.message = "Falha na validação do Login" + user;
              });

              }).error(function(chave,status){
                $scope.message = "Falha na validação do Login" + user;
              });
  };

})
