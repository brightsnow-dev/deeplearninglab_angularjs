app.controller('LearningBaseCtrl', function($scope,NetworkService,LearningBaseService){
   $scope.networks = [];
   $scope.network = {};

   $scope.nbreNeuronesEntree = 0;
   $scope.nbreNeuronesSortie = 0;

   $scope.items = [];
   $scope.item = {};


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

   $scope.loadNetworkItems = () => {
       LearningBaseService.getAllNetworkItems($scope.network.id).then(
           response => {
               $scope.items = response.data;
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
                console.log(response.data);
                $scope.network = response.data;
                if (response.data && response.data.neuronsParCouches){
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
        $scope.loadNetworkItems();
   }

   createItemRequest = () => {
        return {
            id: $scope.item.id,
            input: $scope.item.input,
            output: $scope.item.output,
            idNetwork: $scope.network.id
        }
   }

   $scope.save = () => {
        let request = createItemRequest();
        if (!$scope.item.id){
            //Ajout d'un item a la base d'entrainement
            LearningBaseService.createNetworkItem(request).then(
                response => {
                    console.log(response.data);
                    if (response.data.code == 'SUCCES'){
                        $scope.clearItemForm();
                        $scope.loadNetworkItems();
                    }
                },
                error => {
                    console.log('Erreur survenue');
                    console.log(error);
                }
            );
        }else{
            //Mise à jour d'un item de la base d'entrainement
            LearningBaseService.updateNetworkItem(request).then(
                response => {
                    console.log(response.data);
                    if (response.data.code == 'SUCCES'){
                        $scope.loadNetworkItems();
                    }
                },
                error => {
                    console.log('Erreur survenue');
                    console.log(error);
                }
            );
        }
   }

   $scope.clearItemForm = () => {
       $scope.item = {};
   }

   $scope.showItem = (idNetwork, idItem) => {
        LearningBaseService.getNetworkItem(idNetwork, idItem).then(
            response => {
                $scope.item = response.data;
            },
            error => {
                console.log('Erreur Survenue');
                console.log(error);
            }
        )
   }

   $scope.deleteItem = (idItem) => {
        if (confirm('Etes vous sur de vouloir supprimer ?')){
            LearningBaseService.deleteNetworkItem(idItem).then(
                response => {
                    console.log(response.data);
                    if (response.data.code == 'SUCCES'){
                        $scope.loadNetworkItems();
                    }
                }
            )
        }
   }


});
