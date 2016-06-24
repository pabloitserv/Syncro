angular.module('app.services', [])

.factory('userServiceToken', function($http) {

  var _postToken = function(parametros){
      return $http.post(SERVICE_URL+"/session",parametros);
  };

  return{
      postToken: _postToken
  }
})



.factory('userServiceLogin', function($http) {
  var _getLogin = function(token){
      return $http.get(SERVICE_URL+"/session/user?token="+token);
  };

  return{
    getLogin: _getLogin
  }
})


.factory('userServicePass', function($http) {
 return {
    putPassword: function(_id,_password){

      var parametros = {
        id:_id,
        password:_password
      };
      var _url=  SERVICE_URL+"/user";
      return $http.put(_url,parametros).then(function(response){
              console.log("executou");
            return response;
            }, function(error){
              console.log("erro!");
            });
     }
  }
})



.factory('veiculoService', function($http) {
 return {
    getVeiculos: function(){
        var _url="http://www.itserv.com.br/ITServ/api/Veiculo";
        return $http.get(_url).then(function(response){
            return response;
        }, function(error){

            });
        }
 }
})


.factory('verificaCorridaService', function($http) {
 return {
    getCorrida: function(_token){

       var _url=  SERVICE_URL+"/run?token="+_token;
       return $http.get(_url).then(function(response){
          return response;
       }, function(error){

    });
  }
 }
})



.factory('criarCorridaService', function($http) {
      var _postCorrida = function(run){
          return  $http.post(SERVICE_URL+"/run", run);
      };
      return{
        postCorrida: _postCorrida
      }
})




.factory('Scopes', function ($rootScope) {
    var mem = {};

    return {
      store: function (key, value) {
        mem[key] = value;
      },
      get: function (key) {
         return mem[key];
       }
    };
})



.service('BlankService', [function(){

}]);
