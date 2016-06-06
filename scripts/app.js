/*global angular */
(function () {
    'use strict';

    angular.module('TyDanielson', ['ngMaterial'])
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('green')
                .accentPalette('blue');

        }).controller('AppCtrl', ['$scope', function ($scope) {


        }]);
}());