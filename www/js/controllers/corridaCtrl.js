angular.module('app')

// Controla o status da corrida

.controller('corridaCtrl', function($scope, Scopes, buscarCorrida, $filter, $state) {


    var token = Scopes.get('loginCtrl').token;
    var usuario = Scopes.get('loginCtrl').user;
    $scope.instalador = Scopes.get('loginCtrl').nome;

    var status = JSON.parse(localStorage.getItem("STATUS-CORRIDA"));
    console.log(status);

    switch (status) {
      case true:
          $scope.on = true;
          $scope.off = false;
          $scope.onExibi = false;
          $scope.offExibi = true;
          $scope.message1 = "Corrida iniciada!";
        break;
      case false:
          $scope.on = false;
          $scope.off = true;
          $scope.onExibi = true;
          $scope.offExibi = false;
        break;
      default:
          $scope.on = false;
          $scope.off = true;
          $scope.onExibi = true;
          $scope.offExibi = false;
        break;
    }

    $scope.novaCorrida = function() {
      $state.go('novaCorrida');
    };
    $scope.fecharCorrida = function() {
      $state.go('fecharCorrida');
    };

})
