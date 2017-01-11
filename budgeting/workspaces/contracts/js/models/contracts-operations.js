
(function (angular) {
    "use strict";

    function factory(langTranslate, contractsSVC,grid,exHandling,notifications) {
        var text, state, model;
        var translate;
        translate = langTranslate('contracts').translate;
        model = {};
        
        model.state = {          
            toolTipAlert: false,
            showAlertDialog:false,
            btnText:"",
            dataPopUpID:"",
            dispErr: false
        };

        model.setPopUpID=function(val){
                model.state.dataPopUpID=val;
        };

        model.modelFields={
                delTitle:translate('bdgt_contracts_deleteHeader'),
                delMessage:translate('bdgt_contracts_deleteDesc'),
                delQuestion:translate('bdgt_contracts_deleteConf'),               
                Continue:translate('bdgt_contracts_Continue'),
                cancel:translate('bdgt_contracts_Cancel')
                
        };

         model.toolTip = {
            toolTipText: translate('bdgt_contracts_selectText'),
            del: translate('bdgt_contracts_tootlTip_delete'),
            rem: translate('bdgt_contracts_tootlTip_remove')
        };

         model.updateToolTip = function(btnText){
            if(btnText==="remove"){
                model.toolTip.toolTipText = translate('bdgt_contracts_tootlTip_remove');
            }
            else if(btnText==="delete"){
                model.toolTip.toolTipText = translate('bdgt_contracts_tootlTip_delete');
            }
        };

        model.showHideToolTipAlertlert = function (flag) {
            model.state.toolTipAlert = flag;           
        };

        model.showToolTip = function() {
            model.state.dispErr = true;
        };
        model.hideToolTip = function() {
            model.state.dispErr = false;
        };

        model.showHideToolTip = function () {
            model.showHideToolTipAlertlert(true);           
        };

         model.isToolTipisMenuOn = function () {
            return model.state.toolTipAlert;
        };


         model.setAlertDialogFlag = function (flag) {
            model.state.showAlertDialog = flag;           
        };
       

         model.isshowAlertDialog = function () {
            return  model.state.showAlertDialog;
        };


         model.updateTipisMenuOn = function (flag) {
            model.state.toolTipAlert = flag;
        };

        //removes selected expired vendor contracts
         model.removeSelected = function () {          
            var selectedList = model.getSelContractsList();

            contractsSVC.deleteSelectedContract(selectedList)
                .then(model.showRemSuccessInfo, exHandling.getDelRemException);
        };

        //this will remove all respective expired vendor contracts, visible or not
        model.bulkRemoveContracts = function(paramData, dataFilter) {
            contractsSVC.removeAllContracts(paramData, dataFilter)
                .then(model.showRemSuccessInfo, exHandling.getDelRemException);           
        };

        //deletes selected vendor contracts
         model.deleteSelected = function () {          
            var selectedList = model.getSelContractsList();

            // console.debug("Contracts for deleting: ");
            // console.debug(selectedList);

            contractsSVC.deleteSelectedContract(selectedList)
                .then(model.showDelSuccessInfo, exHandling.getDelRemException);           
        };

        //this will delete all respective vendor contracts, visible or not
        model.bulkDeleteContracts = function(paramData, dataFilter) {
            contractsSVC.deleteAllContracts(paramData, dataFilter)
                .then(model.showDelSuccessInfo, exHandling.getDelRemException);           
        };

        model.showRemSuccessInfo=function(){
                notifications.showSuccessNotification("Contract Notification removed successfully");
                grid.load();
                                
        };

          model.showDelSuccessInfo=function(){
                notifications.showSuccessNotification("Contract deleted successfully");
                grid.load();
                                
        };


        model.getSelContractsList = function () {
            var chekedRows = grid.getSelectedRecords();
            return model.buildDataToPost(chekedRows);
        };

        model.buildDataToPost = function (chekedRows) {
            var PostData = [];
            angular.forEach(chekedRows, function (item) {               
                var data = model.buildJsonDataToPost(item.vendorContractID);
                PostData.push(data);
            });
            return PostData;
        };

        model.buildJsonDataToPost = function (vendorContractID) {
            var data = {
                "vendorContractID": vendorContractID,
                "vendorID": 0,
                "vendorName": "",
                "description": "",
                "note": ""
            };
            return data;
        };
      


        return model;
    }

    angular
        .module("budgeting")
        .factory('contractOperations', [
                'appLangTranslate',
                'contractsSvc',
                'contractsGridFactory',
                'contractsErrorHandling',
                'contractsNotifications',
                factory
        ]);
})(angular);
