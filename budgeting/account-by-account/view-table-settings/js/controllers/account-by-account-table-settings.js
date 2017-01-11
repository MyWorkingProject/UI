//  SampleCg Controller

(function (angular) {
    "use strict";

    function AccountByAccountTableSettingsCtrl($scope,model,accountByAccountView,tableSettingsModel,modelInstace) {
        var vm = this;
        
       
        vm.init = function () {
            vm.model=model;  
            vm.accountByAccountView=accountByAccountView;        
        };

        vm.close=function(flag){
             tableSettingsModel.allowApply=flag;
             modelInstace.done(tableSettingsModel);
        };

        vm.changeViewType=function(){
            logc(accountByAccountView.form.rowOptions.gridViewType);
        };

        vm.chageRowOptions=function(column){
            model.changeRowOptions(column);
        };

        vm.getLangValue = model.getLangValue;

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("AccountByAccountTableSettingsCtrl", [
            "$scope", 
            "accountByAccountTableSettings",
            "accountByAccountView", 
            "tableSettingsModel",
            "rpBdgtAsideModalInstance",
             AccountByAccountTableSettingsCtrl
         ]);
})(angular);
