//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, session, svc, $location, $stateParams, $filter,formConfig,glAccountError) {
        var state, model, prev;
      //  model.glAccountError = glAccountError;
        var translate;
        translate = langTranslate('glAccountFind').translate;
        model = {};
        model.data = [];
        model.selectGlAccount = [];
        model.masterChartList = [];             
        model.accountCategoryName = [];
        model.text = {
            select: translate('bdgt_glFind_selectBtn'),
            cancel: translate('bdgt_glFind_cancelBtn'),
            headerTxt: translate('bdgt_glFind_header')
        };
        model.defaultFormValues = {
            glAccount:"",
            searchKey: "",
            masterChartID: {
                options: []
            }           
        };
        model.getQuery = function (selectedGlAccountData) {
            var query = [];
            angular.forEach(selectedGlAccountData, function (value, key) {
                query.push("request." + key + "=" + value);
            });
            query.push("request.resultsPerPage=0");            
            return "?" + query.join("&");
        };

        model.findGlAccountDetails = function (selectedGlAccountData) {
            model.propertyID = selectedGlAccountData.propertyID;            
            model.selectGlAccount = selectedGlAccountData;            
            model.source = selectedGlAccountData.source;
            model.searchKey = "";
            model.findGlAccountDetailsSvc(model.getQuery(selectedGlAccountData)).then(model.assignProperties);
           
        };
        model.findGlAccountDetailsSvc = function (query) {
            return svc.abortGetGlAccountDetails().getGlAccountDetailsList(query);
        };

        model.assignProperties = function (response) {           
            model.data = response.data.records;
            model.getMasterChartList();
        };

        model.getMasterChartList = function () {
            if (model.propertyID > 0) {               
                svc.getMasterChartListWithPropertyID({ propertyID: model.propertyID }, model.setMasterChartList).$promise.then(model.getMasterChartListSuccess, model.getMasterChartListError);
            }
            else
            {              
                svc.getMasterChartList({}, model.setMasterChartList).$promise.then(model.getMasterChartListSuccess, model.getMasterChartListError);
            }

            return model;
        };
        //options
        model.setMasterChartList = function (response) {
            console.log(response);
            model.masterChartList = response.records;
            response.records.forEach(function (chooseGlAcc) {
                model.defaultFormValues.masterChartID.options.push({
                    "value": chooseGlAcc.masterChartID,
                    "name": chooseGlAcc.masterChartName
                });
            });
            model.setOptions();
        };
  

        model.form = angular.extend({}, model.defaultFormValues);

        model.setOptions = function () {            
                formConfig                    
                    .setOptions("glAccount", model.form.masterChartID.options);
        };
        model.getMasterChartListSuccess = function () {
            console.log("Success");
        };
        model.getMasterChartListError = function (data) {
            glAccountError.getMasterChartListError(data);
        };        
        model.onSelectedGlAccount = function () {
            var params = {   
                masterchartID: model.form.glAccount,
                propertyID: model.propertyID,               
                source:model.source
            };
            model.findGlAccountDetails(params);            
        };
        model.newGrouping = function (group_list, group_by, index) {
            if (index > 0) {
                prev = index - 1;
                if (group_list[prev][group_by] !== group_list[index][group_by]) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        };

        model.reset = function () {
          //  angular.copy(model.emptyData, model.baseParams);
              var params = {   
                masterchartID:"",
                propertyID: "",
                glAccountNumber: "",
                source:""

              };
              model.form.glAccount = "";
              model.form.searchKey = "";
              model.masterChartList = [];
           
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory('findGlAccount', [
                'appLangTranslate',
                 'sessionInfo',
                 'findGlAccountSvc',
                 '$location',  
                 '$stateParams',
                 '$filter',
                 'find-gl-account-config',
                 'glAccountFindError',
                factory
        ]);
})(angular);
