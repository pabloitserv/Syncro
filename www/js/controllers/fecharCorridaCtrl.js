angular.module('app')

// Controla o fechamento da corrida, pega a imagem e o input e cadastra no banco

.controller('fecharCorridaCtrl', function($scope, $http, $window, $cordovaCamera, $cordovaGeolocation, $interval, dateFilter, veiculoService, Scopes, criarCorridaService, $location, $filter, buscarCorrida) {

  $scope.load = false;
  $scope.fechar = "Fechar";

  var dataAtraso = new Date();
  var inicio = new Date(dataAtraso.setDate(dataAtraso.getDate()-1));
  var dia =1;
  var dataAtual = new Date();
  var termino = new Date(dataAtual.setDate(dataAtual.getDate()+1));
  inicio = $filter('date')(inicio, 'yyyy-MM-dd');
  termino = $filter('date')(termino, 'yyyy-MM-dd');
    var usuario = Scopes.get('loginCtrl').user;
  buscarCorrida.getCorridas(inicio,termino,0,usuario._id,0).then(function(corridas){

    var posicao = corridas.data.length;
    $scope.carro = corridas.data[posicao - 1].car;

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
    alert('err: '+err);
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

// Acha a placa e registra
 var i;
 for (i = 0; i < corridas.data.length; i++) {

         $scope.placaModel = corridas.data[i].vehicle;

   }

    $scope.finalizaCorrida = function(){
      $scope.load = true;
      $scope.fechar = "";

      var deviceStartDate = new Date();

      var user = Scopes.get('loginCtrl').user;
      var run = {
        deviceStartDate: deviceStartDate,
        mileage: $scope.mileage,
        car: $scope.carro,
        vehicle: $scope.placaModel,
        user: user,
        city: user.city,
        open:false,
        photo: $scope.imageCamera,
        latitude: $scope.latitude,
        longitude:$scope.longitude
      }
      console.log(run);

        criarCorridaService.postCorrida(run).success(function(data){
          alert("Corrida cadastrada com sucesso!");
          $scope.load = false;
          $scope.fechar = "Finalizada";

          $location.path('/page1');
          $window.location.reload(true);

        }).error(function(data,status){
           alert("Falha ao cadastrar");
           $scope.load = false;
           $scope.fechar = "finalizar";
        });

      };

  });
});
