app.factory('TrainingService', function(Config, $http){
   var service = {};

   service.trainNetwork = (idNetwork, input) => {
       let url = `${Config.urlBack}operation=train_network`;
       const request = {
           idNetwork: idNetwork,
           input: input
       };
       console.log(request);
       return $http.post(url, request);
   }

   return service;
});
