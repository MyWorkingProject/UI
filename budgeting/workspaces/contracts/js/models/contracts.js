//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, listSVC,session) {
        var text, state, model;
        var translate;
        translate = langTranslate('contracts').translate;
        model = {};
        model.form={};

        model.text = {
            PageHeaderText: translate('bdgt_contracts_PageHeaderText'),
            hideFilters: translate('bdgt_contracts_hideFilters'),
            showFilters: translate('bdgt_contracts_showFilters'),
            print: translate('bdgt_contracts_print'),
            importGLAccount: translate('bdgt_contracts_importGLAccount'),
            addContract: translate('bdgt_contracts_addContract'),
            deleteContract: translate('bdgt_contracts_deleteContract'),
            removeContract: translate('bdgt_contracts_removeContract'),
            deleteHeader:translate('bdgt_contracts_deleteHeader'),
            deleteDesc:translate('bdgt_contracts_deleteDesc'),
            Continue:translate('bdgt_contracts_Continue'),
            delConfMsg:translate('bdgt_contracts_deleteConf'),
            Cancel:translate('bdgt_contracts_Cancel')

        };
        model.state = {
            tableFilter: {
                filter: false
            },
            isSelectAll: false,
            selectType: "visible" // all/visible
        };
        model.emptyData = {
            subscribed: false,
            allcontracts: {
                isActive:  false,
                text: 'All'
            },
            expiringcontracts: {
                isActive:true,
                text: 'Expiring'
            },
            includeFile:undefined
            
        };

        model.orgImportState = { active:false,open:false };
     
        model.init=function(){
            // model.form = angular.extend({}, model.emptyData);
            angular.copy(model.emptyData,model.form);
             model.importState = angular.extend({}, model.orgImportState);
             return model;
        };
       

        model.getContractData = function (pg) { 
             var params = {
                propertyID: session.getPropertyID()  
            };
            if (model.getAllContractsStatus()) {
                return listSVC.getContractsList(params, pg);
            }
            else {
                return listSVC.getExpiredContractsList(params, pg);
            }

        };

        model.setData=function(data){
            if(data=="allcontracts"){
                model.form.allcontracts.isActive=true;
                model.form.expiringcontracts.isActive=false;

            }
            else if(data=="expiringcontracts"){
                model.form.expiringcontracts.isActive=true;
                model.form.allcontracts.isActive=false;

            }
        };

         

        model.getAllContractsStatus = function () {
            return model.form.allcontracts.isActive;
        };

        model.getExpContractsFlag = function () {
            return model.form.expiringcontracts;
        };

        model.getAllContractsFlag = function () {
            return model.form.allcontracts;
        };

        model.reset = function () {
            //angular.extend(model.form,model.emptyData);
            angular.copy(model.emptyData,model.form);

            model.importState = angular.extend({}, model.orgImportState);
            //model.importState.state = false;
        };

       model.importContract = function(){
            model.importState.state = !model.importState.state;
            model.importState.open = !model.importState.open;
           if(model.importState.open) {
              model.form.includeFile= "'workspaces/contracts-csv/index.html'";  
           }
           else{
              model.form.includeFile = undefined;  
           } 
       };

       model.setSelectState = function(flag) {
            model.state.isSelectAll = flag;
       };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('contractsModel', [
                'appLangTranslate',
                'contractsSvc',
                 'sessionInfo',
                factory
        ]);
})(angular);
