angular.module('app')


.controller('corridaCtrl', function($scope, Scopes, verificaCorridaService, $location, buscarCorrida, $filter) {

  var token = Scopes.get('loginCtrl').token;
  var usuario = Scopes.get('loginCtrl').user;
  $scope.instalador = Scopes.get('loginCtrl').nome;

  var dataAtraso = new Date();
  var inicio = new Date(dataAtraso.setDate(dataAtraso.getDate()-1));
  var dia =1;
  var dataAtual = new Date();
  var termino = new Date(dataAtual.setDate(dataAtual.getDate()+1));
  inicio = $filter('date')(inicio, 'yyyy-MM-dd');
  termino = $filter('date')(termino, 'yyyy-MM-dd');
  buscarCorrida.getCorridas(inicio,termino,0,usuario._id,0).then(function(corridas){


    if (corridas.data.length == 0) {

      $scope.on       = false;
      $scope.off      = true;
      $scope.onExibi  = true;
      $scope.offExibi = false;
    }

    if(corridas.data != 0){

      var posicao = corridas.data.length;


        if(corridas.data[posicao-1].open == true){
          $scope.on       = true;
          $scope.off      = false;
          $scope.onExibi  = false;
          $scope.offExibi = true;
          $scope.message1 = "Corrida iniciada!";
          $scope.message2 = "Existe uma corrida em aberto";
        }
        else{
          $scope.on       = false;
          $scope.off      = true;
          $scope.onExibi  = true;
          $scope.offExibi = false;
        }

    }
  });
  $scope.novaCorrida = function(){
    $location.path('/page3');

  };
  $scope.fecharCorrida = function(){
    $location.path('/page4');
  };

})
