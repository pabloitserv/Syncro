angular.module('app')


.controller('fecharCorridaCtrl', function($scope, $http, $window, $cordovaCamera, $cordovaGeolocation, $interval, dateFilter, veiculoService, Scopes, criarCorridaService, $location, $filter, buscarCorrida) {


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

    console.log(posicao);

    var carro= corridas.data[posicao - 1].car;
    console.log(carro);

    veiculoService.getVeiculos().then(function(carros){

      for (var i = 0; i < carros.data.length; i++) {
          if (carros.data[i].IdVeiculo == carro) {
            $scope.carroGravado = carros.data[i];
          }
      //if (carros.data != null) {
      //  $scope.lista = carros.data;
      //}
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


      $scope.finalizaCorrida = function(){
          var deviceStartDate = new Date();

          var user = Scopes.get('loginCtrl').user;
          var run = {
            deviceStartDate: deviceStartDate,
            mileage: $scope.mileage,
            car: corridas.data[posicao - 1].car,
            user: user,
            open:false,
            photo: $scope.imageCamera,
            latitude: $scope.latitude,
            longitude:$scope.longitude
          }

          criarCorridaService.postCorrida(run).success(function(data){
            alert("Corrida finaliza com sucesso!");
            
            $location.path('/page1')
            $window.location.reload(true);
          }).error(function(data,status){
             $scope.message = "Falha ao Registrar Corrida"+data;
             alert("Falha ao cadastrar");
          });
          //console.log(run);

    };

  });

})
