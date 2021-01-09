app.controller('TrainingCtrl', function($scope,NetworkService){
   $scope.networks = [];
   $scope.network = {};

   $scope.nbreNeuronesEntree = 0;
   $scope.nbreNeuronesSortie = 0;

   $scope.items = [];
   $scope.item = {};

   $scope.neuroneSortiePoidFort = 0;
   $scope.canShowResult = false;

    $scope.resultat = [];


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
       $scope.resultat = [];
       let max = 0.0;
       let currentRand;
       for (let i = 0 ; i < $scope.nbreNeuronesSortie ; i++){
           currentRand = Math.random();
           $scope.resultat.push(currentRand);
           max = currentRand > max ? currentRand : max;
       }
       $scope.neuroneSortiePoidFort = max;
       $scope.canShowResult = true;
   }

});
