app.factory('LearningBaseService', function(Config, $http){
    let service = {};
    service.getAllNetworkItems = (idNetwork) => {
        let url = `${Config.urlBack}operation=enum&type=learning_base_items&idNetwork=${idNetwork}`;
        return $http.get(url);
    }

    service.getNetworkItem = (idNetwork, idItem) => {
        let url = `${Config.urlBack}operation=enum&type=learning_base_item&idNetwork=${idNetwork}&id=${idItem}`;
        return $http.get(url);
    }

    service.createNetworkItem = (request) => {
        let url = `${Config.urlBack}operation=create&type=learning_base`;
        return $http.post(url, request);
    }

    service.updateNetworkItem = (request) => {
        let url = `${Config.urlBack}operation=update&type=learning_base`;
        return $http.post(url, request);
    }

    service.deleteNetworkItem = (idItem) => {
        let url = `${Config.urlBack}operation=delete&type=learning_base&id=${idItem}`;
        return $http.get(url);
    }

    return service;
});
