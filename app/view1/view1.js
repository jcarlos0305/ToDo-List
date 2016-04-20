'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','itemsService',function($scope,itemsService) {
	$scope.items = itemsService.getItems();
    $scope.itemType = itemsService.getTypes();
	$scope.classMap = {GROCERIES:"success",CAR:"danger",UNIVERSITY:"warning",PAYMENTS:"info"};
    $scope.reverse = false;
    $scope.sortOption = "";
    $scope.filterText = "";
    $scope.category = "";
    $scope.typeCompleted = 0;
    $scope.showOptions = false;
    $scope.color = "";
    $scope.completed = [];

    $scope.selectFilter = function(opt){
        if(opt == ""){
            $scope.filterText = "";
            $("#txtFilter").removeClass("hidden");
            $("#lblIsDone").addClass("hidden");
        }else{
            $("#txtFilter").addClass("hidden");
            $("#lblIsDone").removeClass("hidden");
        }
    };
    
    $scope.filterToggle = function(){
        $scope.filterText = $("#chkIsDone").is(":checked");
    }
    
    var itemIndex = -1;
    var itemClass = null;
    
    $scope.setAddition = function(){
        $scope.item = {};
        $('#datetimepicker').data("DateTimePicker").date(null);
        if($("#btnCreating").text() == "Add item" ){
            $scope.showCreate = true;
            $("#btnCreating").html('Cancel addition');
            $("#btnAdd").removeClass("hidden");
            $("#btnCreating").removeClass("btn-default");
            $("#btnCreating").addClass("btn-danger");
            $scope.creating = true;
        }else{
            $scope.showCreate = false;
            $("#btnAdd").addClass("hidden");
            $("#btnCreating").html('Add item');
            $("#btnCreating").addClass("btn-default");
            $("#btnCreating").removeClass("btn-danger");
            $scope.creating = false;
        }                
    };
    
    $scope.setUpdate = function(){
        $scope.showCreate = false;
        $("#btnUpdate").addClass("hidden");
        $("#btnCreating").html('Add item');
        $("#btnCreating").addClass("btn-default");
        $("#btnCreating").removeClass("btn-danger");                
    };
    
    $scope.sortOptions = function(){
        if($("#btnSorting").text() == "Sorting options" ){
            $scope.showOptions = true;
            $("#btnSorting").html('Hide options');
            $("#btnSorting").removeClass("btn-default");
            $("#btnSorting").addClass("btn-danger");
        }else{
            $scope.showOptions = false;
            $("#btnSorting").html('Sorting options');
            $("#btnSorting").addClass("btn-default");
            $("#btnSorting").removeClass("btn-danger");
        }      
    };
    
    $scope.showCategories = function(){
        if($("#btnCategory").text() == "Add category" ){
            $scope.showCategory = true;
            $("#btnCategory").html('Cancel addition');
            $("#btnCategory").removeClass("btn-default");
            $("#btnCategory").addClass("btn-danger");
        }else{
            $scope.showCategory = false;
            $("#btnCategory").html('Add category');
            $("#btnCategory").addClass("btn-default");
            $("#btnCategory").removeClass("btn-danger");
        }
    };
    
    $scope.$on("EDIT",function(event,obj,index){
        $scope.itemIndex = index;
        var originalItem = {type: obj.type, description:obj.description, date:obj.date};
        $('#datetimepicker').data("DateTimePicker").date(obj.date);
        $scope.item = originalItem;
        $scope.showCreate = true;
        $("#btnUpdate").removeClass("hidden");
        $("#btnCreating").html('Cancel update');
        $("#btnCreating").addClass("btn-danger");        
    });
    
    $scope.$on("DELETE",function(event,itemIndex){
        swal({   
            title: "Are you sure?",
            text: "You will not be able to recover this task!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, 
        function(isConfirm){
            if (isConfirm){
                $scope.items.splice(itemIndex,1);
                $scope.item = {};
                $scope.$apply();
                swal("Deleted!", "Your task has been deleted.", "success");
            }else{
                swal("Cancelled", "Your task is safe.", "error");
            }
        });        
    });
    
    $scope.$on("CHANGE",function(changedItem){
        var totalItems = 0;
        var doneItems = 0;
        $scope.items.forEach(function(item){
            if(item.type == changedItem.targetScope.item.type){
                totalItems++;
                if(item.isDone)
                    doneItems++;
            }
        });
        var typeIndex = $scope.itemType.indexOf(changedItem.targetScope.item.type);
        var item1 = {
                type : $scope.itemType[typeIndex],
                percentage : doneItems*100/totalItems
            }
        $scope.completed[typeIndex] = item1;
    });
    
    $scope.categoryPercentage = function(){
        var typeIndex = 0;
        $scope.itemType.forEach(function (type){
            var totalItems = 0;
            var doneItems = 0;
            $scope.items.forEach(function(item){
                if(item.type == type){
                    totalItems++;
                    if(item.isDone)
                        doneItems++;
                }
            });
            var item = {
                type : $scope.itemType[typeIndex],
                percentage : doneItems*100/totalItems
            }
            $scope.completed[typeIndex] = item;
            typeIndex++;
        });         
    };
    
    $scope.addItem = function(){
        var date = moment($('#datetimepicker').data("DateTimePicker").date()).format("MMM DD, YYYY");
        $scope.item.date = date;
        $scope.items.push($scope.item);
        $scope.setAddition();
        swal({
            title: "Task created!",
            text: "",
            type:"success",
            timer: 1000,
            showConfirmButton: false
        });
    };
    
    $scope.updateItem = function(){
        var date = moment($('#datetimepicker').data("DateTimePicker").date()).format("MMM DD, YYYY");
        $scope.items[$scope.itemIndex].type = $scope.item.type;
        $scope.items[$scope.itemIndex].description = $scope.item.description;
        $scope.items[$scope.itemIndex].date = date;  
        $scope.setUpdate();
        swal({
            title: "Task updated!",
            text: "",
            type:"success",
            timer: 1000,
            showConfirmButton: false
        });
    };
    
    $scope.addCategory = function(category){
        $scope.color = $('#colorPicker').colorpicker('getValue');
        $("<style type='text/css'> .notice-"+category+"{ border-color:"+$scope.color+";} .notice-"+category+">strong{ color:"+$scope.color+";} </style>").appendTo("head");
        itemsService.addType(category);
        $scope.itemType = itemsService.getTypes();        
        $scope.classMap[category] = category;
        $scope.showCategories();
        $('#colorPicker').val('');
        $('#txtCategory').val('');
    };
    
    $scope.showError = function(){
        alert("ERROR");
    };
    
    angular.element(document).ready(function () {
        $('#datetimepicker').datetimepicker({
            format: 'll'
        });
        $('#colorPicker').colorpicker();
        
        $scope.categoryPercentage();
    });

    $scope.sortOrder = function(){
        $scope.reverse = !$scope.reverse;
        $('#btnSortOrder').text($scope.reverse? "ASC":"DES");
    };
}]);