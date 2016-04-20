'use strict';

angular.module('myApp.view-about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view-about', {
    templateUrl: 'view-about/view-about.html',
    controller: 'View-aboutCtrl'
  });
}])

.controller('View-aboutCtrl', ['$scope', function($scope) {
    
}]);