//  Grid

(function (angular) {
    "use strict";

    function factory(langTranslate,
                    $filter,
                    commentsSvc,
                    gridModel,
                    adjustmentsError,
                    gridConfig,
                    $window,
                    defaultAdjustments,
                    budgetDetails) {
        var text, grid,
            model, translate;

        translate = langTranslate('defaultsAdjustments').translate;     
        text = {
            pageHeading: translate('bdgt_defaultAdjustments_pageHeading'),
            pageHeadingTitle: translate('bdgt_defaultAdjustments_pageHeadingTitle'),
            assignBtnText: translate('bdgt_defaultAdjustments_assignBtnText'),
            recordsSelected:  translate('bdgt_defaultAdjustments_recordsSelected'),
            showfilterText:  translate('bdgt_defaultAdjustments_showfilterText'),
            accountType:  translate('bdgt_defaultAdjustments_accountType'),
            accountGroup:  translate('bdgt_defaultAdjustments_accountGroup'),
            defaultPercentage:  translate('bdgt_defaultAdjustments_defaultPercentage'),            
            overwriteDefaultAdjustment:  translate('bdgt_defaultAdjustments_overwriteDefaultAdjustment'),
            selectAnyChkBox:translate('bdgt_defaultAdjustments_selectAnyChkBox'),
            applyAdjustmentBtnText:  translate('bdgt_defaultAdjustments_applyAdjustmentBtnText'),
            cancelBtnText:  translate('bdgt_defaultAdjustments_cancelBtnText'),
            modelHeadingtxt:  translate('bdgt_defaultAdjustments_modelHeadingtxt'),
            modelHeadingTitle:  translate('bdgt_defaultAdjustments_modelHeadingTitle'),
            modelTxtBoxPlaceHolder:  translate('bdgt_defaultAdjustments_modelTxtBoxPlaceHolder'),
            modelAssignBtnTxt:  translate('bdgt_defaultAdjustments_modelAssignBtnTxt'),
            modelSelectCheckBoxErrorMsg:  translate('bdgt_defaultAdjustments_modelSelectCheckBoxErrorMsg'),
            modelEnterValueErrorMsg:  translate('bdgt_defaultAdjustments_modelEnterValueErrorMsg'),
            filterAccountTypeText:  translate('bdgt_defaultAdjustments_filterAccountTypeText'),
            filterAccountGroupText:  translate('bdgt_defaultAdjustments_filterAccountGroupText'),
            erroPopText:  translate('bdgt_defaultAdjustments_erroPopText'),
            invalid_param: translate('bdgt_defaultAdjustments_invalid_param'),
            selectAllText:translate('bdgt_defaultAdjustments_selectAll'),
            noneText:translate('bdgt_defaultAdjustments_none'),
            unknown_error: translate('bdgt_defaultAdjustments_unknown_error'),
            toolTip:translate('bdgt_defaultAdjustments_toolTip')
        };
        model = {
            text: text,
            reLoad: false
        };
        model.state = {
            toolTipAlert: false,
            toolTipHelp: false
        };
        model.form = {
            visible: false,
            toolTip:text.toolTip
        };
 
        model.init = function () {          
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.sort);
            grid.subscribe('filterBy', model.filterCilentSidePage);
            grid.subscribe('paginate', model.paginate);            
            grid.setConfig(gridConfig).setEmptyMsg(translate('bdgt_defaultAdjustments_getEmptyMsg'));
            model.showHideToolTip(false);
            model.showHideToolTipHelp(false);
            return model;
        };

        model.isToolTipisMenuOn = function () {
            return model.state.toolTipAlert;
        };
        model.updateTipisMenuOn = function (flag) {
            model.state.toolTipAlert = flag;
        };
        model.showHideToolTipAlertlert = function (flag) {
            model.state.toolTipAlert = flag;            
        };
        model.showHideToolTip = function (flag) {
            model.showHideToolTipAlertlert(flag);         
        };
        model.showSelectionChanges = function () {
            var data = model.getSelectedRecords();
            model.count = data.length;
            if (model.count > 0) {
                angular.element('#assignDefaults').modal('show');
                model.showHideToolTip(false);
            }
            else {
                angular.element('#assignDefaults').modal('hide');
                model.showHideToolTip(true);
            }
        };
        
        model.isToolTipisMenuOnHelp = function () {
            model.state.toolTipHelp = true;
            return model.state.toolTipHelp;
        };
        model.updateHelpTipisMenuOn = function (flag) {
            model.state.toolTipHelp = flag;
        };
        model.showHideToolTipAlertlertHelp = function (flag) {
            model.state.toolTipHelp = flag;
        };
        model.showHideToolTipHelp = function (flag) {
            model.showHideToolTipAlertlertHelp(flag);
        };
  
 
        model.selectAllStatus = function (flag) {        
            grid.selectAll(flag);
        };
        model.selectAll = function (flag) {
            grid.selectAll(flag);
        };
        model.load = function (param) {
            model.selectAllStatus(false);        
            var data = grid.busy(true).flushData().getQuery();            
            return defaultAdjustments.getCommentData().success(model.setGridData, adjustmentsError.getDefaultAdjustmentsError);
        };
       
        model.sort = function () {           
            var data, validData, sortBy, sortByValue, reverse, activeRecords = [];
            data = grid.busy(true).getQuery();
            data = data.replace("?datafilter=", "");
            data = $window.atob(data);
            validData = JSON.parse(data);             
            angular.forEach(validData.sortBy, function (value, key) {
                sortBy = key;
                sortByValue = value;
            });
            if (sortByValue === "ASC") {
                reverse = true;
            }
            else{
                reverse = false;
            }
            activeRecords = grid.getData();
            data = $filter('orderBy')(activeRecords.records, sortBy, reverse);
            model.grid.setData({ records: data }).busy(false);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return defaultAdjustments.getCommentData(data).success(model.addGridData, adjustmentsError.getDefaultAdjustmentsError);
        };
        model.getSelectedRecords = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };

        model.setGridData = function (response) {      
            var temp;
             angular.forEach(response.records, function (item) {                        
                        if(item.adjPercent===null || item.adjPercent===undefined || item.adjPercent==='') {
                            item.adjPercent='-100.00';
                        }
                        else{
                            temp = parseFloat(item.adjPercent).toFixed(2);
                            item.adjPercent = temp;
                        }
                    });             
             grid.setData(response).busy(false);
             model.gridData = angular.copy(response);
             model.total = response.records.length;          
        }; 
        
         model.filterCilentSidePage = function () {
             var data = $filter('filter')(model.gridData.records, {
                 accountType: model.grid.filtersModel.filterData.accountType,
                name: model.grid.filtersModel.filterData.name
             });
             model.total = data.length;
            model.grid.setData({records: data}).busy(false);
        };
        model.assignAdjustDefaults = function () {           
            if (model.adjPercent !== '' && model.adjPercent!== 'undefined'){
            var selectedRecords = model.getSelectedRecords();
                    angular.forEach(selectedRecords, function (value, key) {
                        value.adjPercent = model.adjPercent;
                    });         
            }
            model.adjPercent = "";
            angular.element('#assignDefaults').modal('hide');
            };
        model.getSelectedDefaultAdjustmentsCount = function () {           
            if (model.getSelectedRecords().length > 0) {
                model.form.visible = true;
            }
            else{
                model.form.visible = false;
            }                
            return model.getSelectedRecords().length;
        };

        model.saveDefaultAdjustments = function (params) {            
            var taskData, data;          
                taskData = grid.getData();
                data = taskData.records;         
                //var newFiledsAssign = model.getDetails();
                data.forEach(function (key) {
                    if (key.budgetModelID === 0 || key.propertyID === 0) {                 
                        key.budgetModelID = budgetDetails.getModelDetails().budgetModelID;
                        key.propertyID = budgetDetails.getModelDetails().propertyID;         
                    }
                });                   
                params.budgetYear = budgetDetails.getModelDetails().budgetYear;
                commentsSvc.saveDefaultAdjustments(params, data).$promise.then(model.saveDefaultAdjustmentsSuccess, adjustmentsError.saveDefaultAdjustmentsError);           
        };
        model.saveDefaultAdjustmentsSuccess = function (response) {                   
            adjustmentsError.saveDefaultAdjustmentsSuccess();
            model.overWrite = false;
            model.load();
        };

        model.saveDefaultAdjustmentsError = function () {
            adjustmentsError.saveDefaultAdjustmentsError();
        };
        
        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };

        model.reset = function(){

        };

        return model.init();
    }
    angular
        .module("budgeting")
        .factory('budgetCommentsGridFactory', [
                'appLangTranslate', 
                '$filter', 
                'commentsSvc', 
                'rpGridModel', 
                'adjustmentsError', 
                'commentsConfig',               
                '$window',
                'defaultAdjustments',
                'budgetDetails',
            factory
        ]);
})(angular);
