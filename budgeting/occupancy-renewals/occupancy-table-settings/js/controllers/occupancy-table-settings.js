//  SampleCg Controller

(function (angular) {
    "use strict";

    function OccupancyTableSettingsCtrl($scope, model, occupancySettingsInfo, modelInstace) {
        var vm = this;
        
       
        vm.init = function () {
            vm.model=model;  
            vm.occupancySettings = occupancySettingsInfo;
        };

        vm.close=function(flag){
            occupancySettingsInfo.applyChanges = flag;
            modelInstace.done(occupancySettingsInfo);
        };

        vm.changeViewType=function(){
           // logc(accountByAccountView.form.rowOptions.gridViewType);
        };

        vm.chageRowOptions=function(column){
            model.changeRowOptions(column);
        };

        vm.getLangValue = model.getLangValue;

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("OccupancyTableSettingsCtrl", [
            "$scope", 
            "occupancyTableSettings",         
            "occupancySettingsInfo",
            "rpBdgtAsideModalInstance",
             OccupancyTableSettingsCtrl
         ]);
})(angular);
