app.controller('TrainingCtrl', function($scope,NetworkService, TrainingService){
   $scope.networks = [];
   $scope.network = {};

   $scope.nbreNeuronesEntree = 0;
   $scope.nbreNeuronesSortie = 0;

   $scope.items = [];
   $scope.item = {};

   $scope.neuroneSortiePoidFort = 0;
   $scope.resultatTraining = '';
   $scope.canShowResult = false;

    $scope.resultat = {};


   $scope.loadNetworks = () => {
       NetworkService.getAllNetworks().then(
           response => {
                console.log(response.data);
                $scope.networks = response.data;
           },
           error => {
               console.log('Erreur survenue !');
               console.log(error);
           }
       )
   }

   $scope.selectNetwork = () => {
       NetworkService.getNetwork($scope.network.id).then(
            response => {
                $scope.network = response.data;
                if (response.data && response.data.neuronsParCouches){
                    $scope.network = response.data;
                    let tab = response.data.neuronsParCouches.split(',');
                    $scope.nbreNeuronesEntree = tab[0];
                    $scope.nbreNeuronesSortie = tab[tab.length - 1];
                }
            },
           error => {
                console.log('Erreur survenue');
                console.log(error);
           }
       );
   }

   $scope.clearTrainForm = () => {
       $scope.item = {};
       $scope.canShowResult = false;
   }

   $scope.train = () => {
       TrainingService.trainNetwork($scope.network.id, $scope.item.input).then(
           response => {
               console.log(response.data);
               if (!response.data.code){
                   $scope.resultat = response.data;
                   $scope.canShowResult = true;
               }else{
                   $scope.resultat = {};
                   $scope.canShowResult = false;
                   alert(`${response.data.code}::${response.data.message}`);
               }
           },
           error => {
               console.log('Erreur survenue');
               console.log(error);
           }
       );
   }

});
