angular.module('app')


.controller('novaCorridaCtrl', function($scope, $http, $cordovaCamera, $cordovaGeolocation, $interval, dateFilter, veiculoService, Scopes, criarCorridaService, $location, $window) {


  veiculoService.getVeiculos().then(function(carros){
    if (carros.data != null) {
      $scope.lista = carros.data;
    }
});

  $scope.pegarFoto = function(){

   var options = {
    quality: 100,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 300,
    targetHeight: 300,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
    console.log("sucesso" + angular.toJson(imageData));
    $scope.imageCamera = "data:image/jpeg;base64," + imageData;//Função trata a imagem, convertendo de binário para jpeg, renderizando na tela
  }, function(err) {
    // error
    console.log("fracasso" + angular.toJson(imageData));
    error(err);
  });

  };

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
 .getCurrentPosition(posOptions)
 .then(function (position) {
  $scope.latitude  = position.coords.latitude;
  $scope.longitude = position.coords.longitude;
   }, function(err) {
    console.log(err)
 });


    $scope.addCorrida = function(){
      var deviceStartDate = new Date();

      var user = Scopes.get('loginCtrl').user;
      var run = {
        deviceStartDate: deviceStartDate,
        mileage: $scope.mileage,
        car: $scope.car.IdVeiculo,
        user: user,
        open:true,
        photo: $scope.imageCamera,
        latitude: $scope.latitude,
        longitude:$scope.longitude
      }

        criarCorridaService.postCorrida(run).success(function(data){
          alert("Corrida cadastrada com sucesso!");

          $location.path('/page1');
           window.location.reload(true);
        }).error(function(data,status){
           $scope.message = "Falha ao Registrar Corrida"+data;
           alert("Falha ao cadastrar");
        });


  };

});
