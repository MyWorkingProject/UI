
(function (angular) {
    'use strict';

    function factory(rpGridModel, gridConfig, ruleModel, ruleSVC, $filter,exHandling,formConfig) {
        var model, translate, grid, filterState,gridModel = null;
        model = {};
        model.filterState= false;
        model.gridData = {
            records: ""
        };
       
        var noResultsMsg ="No results were found";
        model.crtria = [{
                                    text: '+',
                                    value: 'Above'
                                    }, {
                                    text: '-',
                                    value: 'Below'
                                    }, {
                                    text: '+ or -',
                                    value: 'AboveORBelow'
                                }];
                  
        model.type = [{
                                    text: '$',
                                    value: 'Dollor'
                                    }, {
                                    text: '%',
                                    value: 'Percent'
                                    }];
                   
       
        model.init = function () {
            model.grid = gridModel = rpGridModel();
            gridModel.setConfig(gridConfig).setEmptyMsg(noResultsMsg);

            return model;
        };

       

        model.initStates = function() {
            //grid.contractID = id || 0;            
            gridModel.ruleState = ruleModel.getState(); //used by grid templates
          //  gridModel.crtOptions = model.crtria;
          //  gridModel.typeOptions = model.type;
            
            formConfig
                .setOptions("type", model.type)
                .setOptions("crtria", model.crtria);
             gridModel.formConfig=formConfig;
           
        };

        model.setSrc = function (controller) {
            gridConfig.setSrc(controller);
        };

        
        model.load = function (distID) {
            var params = {distributedID:distID};
            var data = gridModel.busy(true).flushData().getQuery();
            ruleSVC.getRuleBaseComments(params,data).success(model.setGridData,exHandling.onGetError);//;, exHandling.getBdgtWorkflowStatusException);
        };

       /* model.paginate = function () {
            var data = grid.getQuery();
            return bwsModel.getBudgetWorkFlowStatusList(data).success(model.addGridData, exHandling.getBdgtWorkflowStatusException);
        };*/

        model.setGridData = function (response) {
           // model.setSelectColumn(response);
            var gridData = { records: [] };
            //angular.forEach(response.records.modelCommentRules, function (item) {
            //    item.operator = item.operator === "AboveORBelow" ? "Above OR Below" : item.operator;
            //});
            gridData.records = response.records.modelCommentRules;
            ruleModel.updateModelData(response);
            gridModel.setData(gridData).busy(false);
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
                item.statusPer = Math.floor((Math.random() * 100) + 1);
            });
        };

        model.reset = function() {
            gridModel.flushData();
            gridModel.ruleState = null; 
            //grid.propertiesList = null;
            //grid.selectedProps = null;
        };
        
        
        model.getSelectedRecords = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };

         model.selectAll = function(val) {
            gridModel.selectAll(val);
        };

        return model.init();
    }
    angular
        .module('budgeting')
        .factory('budgetCommentsRulesFactory', [
            'rpGridModel',
            'budgetCommentsRulesConfig',
            'budgetCommentsRules',
            'commentsRuleSvc',
            '$filter',
            'CommentsRulesError','comments-rule-config',
            factory
        ]);
})(angular);