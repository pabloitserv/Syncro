angular.module('app')

//Faz o controle da captura de imagem e cadastra a corrida no banco


.controller('novaCorridaCtrl', function($scope, $cordovaCamera, $cordovaGeolocation, Scopes, criarCorridaService, buscarCorrida, $filter) {

  function salvaPlaca(run){
    window.localStorage.setItem("PLACA1", run.vehicle);
  }


  $scope.lista = [
    {"ID_VEICULO":99,"PLACA":"EAF-3917","MODELO":"FIAT UNO MILLE 1.0"},
    {"ID_VEICULO":26,"PLACA":"EKN4522 ","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":48,"PLACA":"EOG-9995","MODELO":"CG 125 CARGO ES"},
    {"ID_VEICULO":100,"PLACA":"EYZ-5168","MODELO":"FIAT UNO MILLE 1.0"},
    {"ID_VEICULO":50,"PLACA":"FBC-7056","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":11,"PLACA":"FBC-7482","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":87,"PLACA":"FCH-8009","MODELO":"FIAT UNO VIVACE 1.0"},
    {"ID_VEICULO":88,"PLACA":"FCT-2297","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":92,"PLACA":"FDE-4225","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":66,"PLACA":"FFD-9148","MODELO":"CG 125 CARGO KS"},
    {"ID_VEICULO":25,"PLACA":"FFH-4863","MODELO":"UNO MILLE ECONOMY 10."},
    {"ID_VEICULO":56,"PLACA":"FFH-4907","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":24,"PLACA":"FFH-5053","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":70,"PLACA":"FFH-5139","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":77,"PLACA":"FFH-5280","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":113,"PLACA":"FFK-7909","MODELO":"PALIO FIRE 1.0"},
    {"ID_VEICULO":93,"PLACA":"FFL-2268","MODELO":"FRIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":84,"PLACA":"FGC-7732","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":138,"PLACA":"FGW-9279","MODELO":"CG CARGO 125"},
    {"ID_VEICULO":89,"PLACA":"FGZ-5833","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":45,"PLACA":"FHN-5725","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":32,"PLACA":"FHN-5764","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":23,"PLACA":"FIC-8733","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":40,"PLACA":"FIC-8735","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":53,"PLACA":"FIC-8736","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":64,"PLACA":"FIC-8758","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":116,"PLACA":"FII-9775","MODELO":"PALIO FIRE  1.0"},
    {"ID_VEICULO":29,"PLACA":"FIZ-4284","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":46,"PLACA":"FIZ-4305","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":55,"PLACA":"FIZ-4306","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":10,"PLACA":"FIZ-4312","MODELO":"UNO MILLE ECONOMY 1.0"},
    {"ID_VEICULO":12,"PLACA":"FIZ-4522","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":65,"PLACA":"FIZ-4607","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":60,"PLACA":"FIZ-4627","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":114,"PLACA":"FJU-9300","MODELO":"PALIO FIRE 1.0"},
    {"ID_VEICULO":115,"PLACA":"FKB-1577","MODELO":"PALIO FIRE 1.0"},
    {"ID_VEICULO":126,"PLACA":"FKL-8572","MODELO":"CG 125 CARGO KS "},
    {"ID_VEICULO":58,"PLACA":"FKU-6297","MODELO":"FIORINO FURGÃO 1.3"},
    {"ID_VEICULO":44,"PLACA":"FLC-4225","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":4,"PLACA":"FMF-9431","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":124,"PLACA":"FMF-9432","MODELO":"GOL GIV 1.0"},
    {"ID_VEICULO":18,"PLACA":"FMF-9433","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":122,"PLACA":"FMF-9435","MODELO":"GOL -G IV 1.0"},
    {"ID_VEICULO":125,"PLACA":"FMF-9437","MODELO":"GO GIV 1.0"},
    {"ID_VEICULO":54,"PLACA":"FMF9466 ","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":123,"PLACA":"FMF-9524","MODELO":"GOL G IV 1.0"},
    {"ID_VEICULO":19,"PLACA":"FMF-9533","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":30,"PLACA":"FMF-9534","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":42,"PLACA":"FMF-9705","MODELO":"GOL 1.0 G-IV"},
    {"ID_VEICULO":9,"PLACA":"FNQ-9441","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":102,"PLACA":"FNQ-9612","MODELO":"FIAT UNO VIVACE  1.0"},
    {"ID_VEICULO":17,"PLACA":"FNQ-9613","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":37,"PLACA":"FNQ-9614","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":15,"PLACA":"FNQ-9642","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":73,"PLACA":"FNQ-9919","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":78,"PLACA":"FNQ-9980","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":39,"PLACA":"FNQ-9994","MODELO":"PALIO FIRE  1.0"},
    {"ID_VEICULO":52,"PLACA":"FNQ-9996","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":21,"PLACA":"FNT-0053","MODELO":"CG 125 CARGO KS"},
    {"ID_VEICULO":34,"PLACA":"FNT-0054","MODELO":"CG 125 CARGO KS"},
    {"ID_VEICULO":76,"PLACA":"FNT-0120","MODELO":"CG 125 CARGO KS "},
    {"ID_VEICULO":7,"PLACA":"FNT-0121","MODELO":"CG 125 CARGO KS"},
    {"ID_VEICULO":13,"PLACA":"FNT-0122","MODELO":"CG 125 CARGO KS"},
    {"ID_VEICULO":118,"PLACA":"FOG-7669","MODELO":"PALIO FIRE 1.0"},
    {"ID_VEICULO":119,"PLACA":"FPA-2740","MODELO":"PALIO FIRE 1.0"},
    {"ID_VEICULO":81,"PLACA":"FPG-4616","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":96,"PLACA":"FPJ-2600","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":127,"PLACA":"FPK-6128","MODELO":"CG 125 CARGO KS "},
    {"ID_VEICULO":94,"PLACA":"FPT-0884","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":49,"PLACA":"FQA-8306","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":62,"PLACA":"FQB-8498","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":51,"PLACA":"FQC-7006","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":47,"PLACA":"FQD-1525","MODELO":"UNO VIVACE 1.0 "},
    {"ID_VEICULO":38,"PLACA":"FQE-3454","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":20,"PLACA":"FQI-0023","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":95,"PLACA":"FRE-9441","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":103,"PLACA":"FRF-4227","MODELO":"FIAT UNO VIVACE 1.0"},
    {"ID_VEICULO":67,"PLACA":"FRJ-9688","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":35,"PLACA":"FRK-8004","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":85,"PLACA":"FRR-7310","MODELO":"FIAT UNO VIVACE 1.0"},
    {"ID_VEICULO":86,"PLACA":"FRU-2818","MODELO":"FIAT UNO VICACE 1.0"},
    {"ID_VEICULO":108,"PLACA":"FRX-2681","MODELO":"CG 125 CARGO KS "},
    {"ID_VEICULO":80,"PLACA":"FSK-8300","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":61,"PLACA":"FSM-0408","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":22,"PLACA":"FSQ-9363","MODELO":"PALIO ECONOMY FIRE 1.0"},
    {"ID_VEICULO":28,"PLACA":"FTA-7308","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":59,"PLACA":"FTA-9777","MODELO":"PALIO FIRE ECONOMY 1.0"},
    {"ID_VEICULO":75,"PLACA":"FTE-9590","MODELO":"CG 125 CARGO KS"},
    {"ID_VEICULO":135,"PLACA":"FTX 1889","MODELO":"UNO VIVACE 1.0"},
    {"ID_VEICULO":90,"PLACA":"FWK-9698","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":91,"PLACA":"FWZ-5409","MODELO":"FIAT PALIO FIRE 1.0 "},
    {"ID_VEICULO":97,"PLACA":"FXY-9958","MODELO":"FIAT PALIO FIRE 1.0"},
    {"ID_VEICULO":117,"PLACA":"FZN-8100","MODELO":"PALIO FIRE 1.0"}
  ];

  $scope.load = false;
  $scope.iniciar = "Iniciar";

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
    alert("err: "+err);
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


    $scope.addCorrida = function(){

      $scope.load = true;
      $scope.iniciar = "";

      var deviceStartDate = new Date();

      var user = Scopes.get('loginCtrl').user;
      var run = {
        deviceStartDate: deviceStartDate,
        mileage: $scope.mileage,
        car: $scope.car.ID_VEICULO,
        vehicle: $scope.car.PLACA +" - "+ $scope.car.MODELO,
        user: user,
        city: user.city,
        open:true,
        photo: $scope.imageCamera,
        latitude: $scope.latitude,
        longitude:$scope.longitude
      }

      // console.log(run);
          //console.log($scope.car.IdVeiculo + ($scope.car.Placa + $scope.car.Modelo));


        criarCorridaService.postCorrida(run).success(function(data){
            alert("MSG002 - CORRIDA INICIADA COM SUCESSO!");
            $scope.load = false;
            $scope.iniciar = "Iniciada";
            ionic.Platform.exitApp();
        }).error(function(data, status){
            console.log(run.vehicle);
            salvaPlaca(run);
            alert("MSG003 - FALHA AO INICIAR!");
            $scope.load = false;
            $scope.iniciar = "Iniciar";

        });


  };

});
