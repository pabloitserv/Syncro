angular.module('app')


.controller('corridaCtrl', function($scope, Scopes,verificaCorridaService,$location) {

  var token = Scopes.get('loginCtrl').token;

  $scope.instalador = Scopes.get('loginCtrl').nome;

 $scope.abre = false;

 $scope.novaCorrida = function(){

   $location.path('/page3');
   $scope.abre = function(){
    $scope.abre = true;
   }
 };
 $scope.fecharCorrida = function(){
   $location.path('/page4');
   $scope.abre = false;
 };


})
