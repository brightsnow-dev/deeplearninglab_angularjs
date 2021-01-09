app.factory('NetworkService', function(Config, $http){
   var service = {};
   service.getAllNetworks = () => {
       let url = `${Config.urlBack}operation=enum&type=networks`;
       return $http.get(url);
   }
   service.getNetwork = (id) => {
        let url = `${Config.urlBack}operation=enum&type=network&idNetwork=${id}`;
        return $http.get(url);
   }

   service.createNetwork = (network) => {
        let url = `${Config.urlBack}operation=create&type=network`;
        return $http.post(url,network);
   }

   service.updateNetwork = (network) => {
       let url = `${Config.urlBack}operation=update&type=network`;
       return $http.post(url,network);
   }

   service.deleteNetwork = (id) => {
       let url = `${Config.urlBack}operation=delete&type=network&id=${id}`;
       return $http.get(url);
   }

   return service;
});
