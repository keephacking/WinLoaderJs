angular.module("app", ['winLoaderModule'])
    .controller("loaderCtrl", ["$scope", "winLoadingService", function($scope, winLoadingService) {
        $scope.start = function() {
            winLoadingService.start();
        };
        $scope.stop = function() {
            winLoadingService.end();
        };
    }]);