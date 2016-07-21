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

      var posicao = corridas.data.length-1;

      if (corridas.data[posicao].open == false) {
          $scope.abre = false;
          $scope.fecha = true;
       }
       else{
         $scope.abre = true;
         $scope.fecha = false;
         $scope.message = "Corrida iniciada!";
       }
       
    });
    $scope.novaCorrida = function(){
      $location.path('/page3');

    };
    $scope.fecharCorrida = function(){
      $location.path('/page4');
    };

  })
