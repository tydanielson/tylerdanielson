(function(){

var app = angular.module('TyDanielson', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue');

});

app.controller('AppCtrl', ['$scope', function($scope){


}]);
})();