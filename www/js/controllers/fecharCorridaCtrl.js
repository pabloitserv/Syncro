angular.module('app')

// Controla o fechamento da corrida, pega a imagem e o input e cadastra no banco

.controller('fecharCorridaCtrl', function($scope, $ionicPopup, $http, $window, $cordovaCamera, $cordovaGeolocation, $interval, dateFilter, Scopes, criarCorridaService, $location, $filter, buscarCorrida) {

    $scope.load = false;
    $scope.fechar = "Fechar";

        $scope.pegarFoto = function() {

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
                $scope.imageCamera = "data:image/jpeg;base64," + imageData; //Função trata a imagem, convertendo de binário para jpeg, renderizando na tela
            }, function(err) {
                // error
                alert('err: ' + err);
                console.log("fracasso" + angular.toJson(imageData));
                error(err);
            });

        };

        var watchOptions = {timeout : 3000, enableHighAccuracy: false};
        var watch = $cordovaGeolocation.watchPosition(watchOptions);

        watch.then(
           null,
           function(err) {
              console.log(err)
           },
           function(position) {
             $scope.latitude  = position.coords.latitude;
             $scope.longitude = position.coords.longitude;
           }
        );

        $scope.selected = JSON.parse(localStorage.getItem("CAR"));
        $scope.finalizaCorrida = function() {
            $scope.load = true;
            $scope.fechar = "";

            var deviceStartDate = new Date();

            var user = Scopes.get('loginCtrl').user;
            var run = {
                deviceStartDate: deviceStartDate,
                mileage: $scope.mileage,
                car: $scope.selected.ID_VEICULO,
                vehicle: $scope.selected.PLACA+" - "+$scope.selected.MODELO,
                user: user,
                city: user.city,
                open: false,
                photo: $scope.imageCamera,
                latitude: $scope.latitude,
                longitude: $scope.longitude
            }

            criarCorridaService.postCorrida(run).success(function(data) {
              localStorage.setItem("STATUS-CORRIDA", JSON.stringify(run.open));

              $scope.load = true;
              $scope.fechar = "Finalizada";
              var popF = $ionicPopup.show({
                title: "MSG004",
                template: "<p class='text-center'>CORRIDA FINALIZADA COM SUCESSO!</p>"
              });
                setTimeout(function(){
                  popF.close();
                  ionic.Platform.exitApp();
                }, 3500);
            }).error(function(data, status) {
                $ionicPopup.alert({
                  title: "MSG003",
                  template: "<p class='text-center'>FALHA AO FINALIZAR</p>"
                });
                $scope.load = false;
                $scope.fechar = "finalizar";
            });

        };

    // });
});
