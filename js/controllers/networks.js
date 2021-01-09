app.controller('NetworkCtrl', function($scope, NetworkService){
    $scope.networks = [];
    $scope.network = {};

    $scope.loadNetworks = () => {
        NetworkService.getAllNetworks().then(
            response => {
                console.log(response.data);
                $scope.networks = response.data;
            },
            error => {
                console.log('Erreur survenue');
                console.log(error);
            });
    }

    $scope.showNetwork = (id) => {
        NetworkService.getNetwork(id).then(
            response => {
                console.log(response.data);
                $scope.network = response.data;
            },
            error => {
                console.log('Erreur survenue');
                console.log(error);
            }
        )
    }

    $scope.deleteNetwork = (id) => {
        if (confirm('Etes vous sur de vouloir supprimer ?')){
            NetworkService.deleteNetwork(id).then(
                response => {
                    console.log(response.data);
                    if (response.data.code == 'SUCCES'){
                        console.log('Suppression effectuée avec succes !');
                        $scope.loadNetworks();
                    }
                },
                error => {
                    console.log('Erreur Survenue');
                    console.log(error);
                }
            );
        }
    }

    createNetworkRequest = () => {
        return {
            idNetwork: $scope.network.id,
            label: $scope.network.label,
            neuronsParCouches: $scope.network.neuronsParCouches,
            tauxApprentissage: $scope.network.tauxApprentissage,
            fonctionTransfert: $scope.network.fonctionTransfert,
            typeReseau: $scope.network.typeReseau
        };
    }

    $scope.save = () => {
        let request = createNetworkRequest();
        if (!$scope.network.id){
            //Création d'un reseau
            NetworkService.createNetwork(request).then(
                response => {
                    console.log(response.data);
                    if (response.data.code == 'SUCCES'){
                        $scope.loadNetworks();
                        $scope.clearNetworkForm();
                    }
                },
                error => {
                    console.log('Erreur survenue');
                    console.log(error);
                }
            )
        }else{
            //Modification d'un reseau
            NetworkService.updateNetwork(request).then(
                response => {
                    console.log(response.data);
                    if (response.data.code == 'SUCCES'){
                        $scope.loadNetworks();
                    }
                },
                error => {
                    console.log('Erreur survenue');
                    console.log(error);
                }
            )
        }
    }

    $scope.clearNetworkForm = () => {
        $scope.network = {};
    }
});
