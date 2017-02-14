angular.module('app')

.controller('loginCtrl', function($scope, $location, $window, userServiceToken, userServiceLogin, Scopes, buscarCorrida) {

//Adiciona um token ao usuário

    $scope.validarUsuario = function(){
     var parametros = {
          cpf: $scope.usuario,
          password: $scope.senha
        };



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

          // userServiceToken.postToken(parametros).success(function(chave){
          // var token =chave.token;
          // userServiceLogin.getLogin(token).success(function(user){
            //     if (user.value != null) {!parametros.password ||

            //         if (user.value.password == "" || user.value.password == null) {
            //           alert("MSG002 - ESTE USUÁRIO NÃO TEM SENHA DEFINIDA!");
            //             $location.path('/page5');
            //         }else{
            //             $location.path('/page2');
            //           }
            //     }else{
            //       alert("MSG001 - LOGIN INEXISTENTE!");
            //     }
            //   }).error(function(user,status){
            //     $scope.message = "Falha na validação do Login" + user;
            //   });
            // }).error(function(chave,status){
            //   $scope.message = "Falha na validação do Login" + user;
            //});
  };
});
