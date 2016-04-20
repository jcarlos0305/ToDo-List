'use strict';

angular.module('myApp.items.directive', [])

 .directive('itemSwitch', [function() {
	return {
        restrict: 'A',
        scope: {
            item: '=',
            itemIndex: "="
        },
        templateUrl: 'templates/itemSwitchTemplate.html',
        link: function($scope){
            $scope.edit = function(item,itemIndex){  
                $scope.$emit("EDIT",item,itemIndex);
            };
            $scope.delete = function(item){
                $scope.$emit("DELETE",item);
            };
            
            $scope.categoryPercentage = function(item){
                $scope.$emit("CHANGE",item);
            };
        }
    }
}]);

