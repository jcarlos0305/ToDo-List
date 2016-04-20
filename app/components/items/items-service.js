'use strict';

angular.module('myApp.items.service', [])

.service('itemsService',function() {
    var itemType = [
        "GROCERIES",
        "CAR",
        "UNIVERSITY",
        "PAYMENTS"
    ];
    
    this.getTypes = function(){
        return itemType;
    }
    
    this.addType = function(val){
        itemType.push(val);
    }
    
    this.removeType = function(val){
        itemType.slice(itemType.indexOf(val), 1);
    }
    
    var items = [ // date: MM/dd/YYYY
        {type:itemType[0],description:"Buy Milk",isDone:true,date:new Date("06/13/2015"),finalDate:new Date("8/13/2015")},
        {type:itemType[1],description:"Wash Car",isDone:false,date:new Date("12/10/2013")},
        {type:itemType[2],description:"Proy 3 To Do List Homework",isDone:false,date:new Date("12/24/2015")},
        {type:itemType[3],description:"Pay Cenfotec",isDone:false,date:new Date("01/05/2016")},
        {type:itemType[3],description:"Pay PSN Plus",isDone:false,date:new Date("02/14/2014")}
    ];

    this.getItems = function(){
        return items;
    };
});
