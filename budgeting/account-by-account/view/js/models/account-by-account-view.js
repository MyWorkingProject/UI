//AccountByAccountView Model


(function (angular) {
    "use strict";

    function accountByAccountView(formConfig, accountByAccountSVC, budgetDetails, preferences, base, eventStream, $location, $stateParams, $modal, langTranslate, $filter) {
        var model = {}, event = eventStream(),
            selectedRow, translate;
        translate = langTranslate('account-by-account-view').translate;
        model.form = {};
        model.loadedConfig = false;
        model.emptyData = {          
                        allCategories: [{ 
                                        "name": "All Categories", 
                                        "value": ""
                                    }],
                         allTypes: [{ 
                                        "name": "All Types", 
                                        "value": ""
                                    }],
            glSearch: {
                budgetModelID: budgetDetails.getModelDetails().budgetModelID,
                siteID: budgetDetails.getModelDetails().propertyID,
                glAccountNumber: "",
                glAccountDescription: "",
                source: "accountbyaccount"
                                 },
            categories: "",
            types: "",
            columnOptions: "",
            modelAdvaceActuals: false,
            modelCopyComments: false,
            rowOptions: {
                hideZeroRows: false,
                hasReferenceData: false,
                rowHeightClass: "small",
                gridViewType: "monthly",
                forecastUseData: false,
                firstReferenceData: false,
                rollingActual: false,
                varianceAmount: true,
                variancePercent: true,
                perUnit: true,
                perSqFT: true
                            },
            periodModel: {},
            modelDetails: "",
            activateComments: false,
            initialRowOptions: "",
                      initialPeriodOptions: "",
            glAccountData: ""
           
                };

     
        
        model.init = function () {
            angular.copy(model.emptyData, model.form);
            model.event = event;
            return model;
        };

        model.loadInitialFunctions = function (data) {
            model.setAccountType(data);
            model.loadAccountCategory(0);
            model.setOptionsForSelect();
            model.AssignBudgetDetails();
        };



        model.AssignBudgetDetails = function () {
            model.form.modelDetails = base.getBudgetModelDetails();
            //if(model.form.modelDetails !==""){
            //     model.setPageHeaders();
            // }
        };

        model.loadInfoOnEvent = function () {
            model.form.modelDetails = base.getBudgetModelDetails();
            //  model.setPageHeaders();
             model.loadAccountCategory(0);  
        };

        
        model.getPeriodModel = function () {

          /*  var year= base.getBudgetYear();
            var startMonth= base.getStartMonth();
            var noOfPeriods= base.getNoOfPeriods(); */
            var year, startMonth, noOfPeriods;

             model.form.periodModel = {
                noOfPeriods: base.getNoOfPeriods(),
                months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                year: base.getBudgetYear(),
                startMonth: base.getStartMonth()    
            };
            return model.form.periodModel;
        };

       
    
        model.chageColumnOptions = function (type) {
            switch (type) {
                case "Summary":
                    model.setSummaryType(true);
                    break;
                case "Quarterly":
                    model.setQuarterlyType(true);
                    break;
                case "Monthly":
                    model.setMonthlyType(true);
                    break;
            }
        };

       

        model.setHideZeroRows = function (option) {
            model.form.rowOptions.hideZeroRows = model.stringToBoolean(option);
        };

        model.getHideZeroRows = function () {
            return model.form.rowOptions.hideZeroRows;
        };

        model.setHasReferenceData = function (option) {
            model.form.rowOptions.hasReferenceData = model.stringToBoolean(option);
        };

        model.getHasReferenceData = function () {
            return model.form.rowOptions.hasReferenceData;
        };

        model.setRowHeightClass = function (option) {
            model.form.rowOptions.rowHeightClass = option;
        };

        model.getRowHeightClass = function () {
            return model.form.rowOptions.rowHeightClass;
        };

        model.setGridViewType = function (option) {
            model.form.rowOptions.gridViewType = option;
        };

        model.getGridViewType = function () {
            return model.form.rowOptions.gridViewType;
        };

    
        model.setForecastUseData = function (option) {
            var budgetType = base.getBudgetType();
            if (budgetType === "Forecast") {
                model.form.rowOptions.forecastUseData = model.stringToBoolean(option);
            }
            else {
                model.form.rowOptions.forecastUseData = false;
            }
            
        };

        model.getForecastUseData = function () {
            return model.form.rowOptions.forecastUseData;
        };

        model.setFirstReferenceData = function (option) {
            model.form.rowOptions.firstReferenceData = model.stringToBoolean(option);
        };

        model.getFirstReferenceData = function () {
            return model.form.rowOptions.firstReferenceData;
        };

        model.setRollingActual = function (option) {
            model.form.rowOptions.rollingActual = model.stringToBoolean(option);
        };

        model.getRollingActual = function () {
            return model.form.rowOptions.rollingActual;
        };

        model.setVarianceAmount = function (option) {
            model.form.rowOptions.varianceAmount = model.stringToBoolean(option);
        };

        model.getVarianceAmount = function () {
            return model.form.rowOptions.varianceAmount;
        };


        model.setVariancePercent = function (option) {
            model.form.rowOptions.variancePercent = model.stringToBoolean(option);
        };

        model.getVariancePercent = function () {
            return model.form.rowOptions.variancePercent;
        };

        model.setPerUnit = function (option) {
            model.form.rowOptions.perUnit = model.stringToBoolean(option);
        };

        model.getPerUnit = function () {
            return model.form.rowOptions.perUnit;
        };

        model.setPerSqFT = function (option) {
            model.form.rowOptions.perSqFT = model.stringToBoolean(option);
        };

        model.getPerSqFT = function () {
            return model.form.rowOptions.perSqFT;
        };

        model.setDefaultRowOptions = function () {
               model.setHideZeroRows(false);
            model.setHasReferenceData(false);
               model.setRowHeightClass("small");
               model.setGridViewType("monthly");
               model.setForecastUseData(true);
            model.setFirstReferenceData(true);
               model.setRollingActual(true);
        };

        model.setOptionsForSelect = function () {
              formConfig
                .setOptions("allCategories", model.form.allCategories)
                .setOptions("allTypes", model.form.allTypes);
        };

        model.setAccountType = function (data) {
            model.form.allTypes = model.form.allTypes.concat(data.records);
        };


        

        model.loadAccountCategory = function (value) {
            if (value !== undefined) {
                model.getAccCategory(value).then(model.updateAccCategory);
            }
            else {
                model.restAccountCategory();
            }
        };

        model.getAccCategory = function (val) {
            var params = {
                masterChartID: budgetDetails.getModelDetails().masterChartID,
                accountTypeID: val
            };
            return accountByAccountSVC.getAccCategory(params).$promise;
        };

        model.updateAccCategory = function (resp) {
            model.updateAccCategory(resp);
        };

         model.updateAccCategory = function (data) {        
            formConfig.allCategories.options = model.restAccountCategory();
            formConfig.allCategories.options = formConfig.allCategories.options.concat(data.records);
        };

        model.restAccountCategory = function () {
            return [{
                        "name": "All Categories", 
                        "value": ""
                    }];   
        };

         model.getAccTypes = function () {
            return accountByAccountSVC.getAccTypes().$promise;
        };

        model.assignColumnOptions = function (data) {           
            var columnOptions = model.getColumnOptionsByPreferences(data);
            model.form.columnOptions = columnOptions;
           // model.manageSummaryViewType(model.form.columnOptions);
        };

        model.copyInitialPeriodOptions = function (columnOptions) {
            
            model.form.initialPeriodOptions = angular.copy(columnOptions);
        };

        model.removeTotalFieldForColumnOptions = function (options) {
            var foundItem = $filter('filter')(options.columns.data, { key: 'total' }, true)[0];
            var index = options.columns.data.indexOf(foundItem);

            if (foundItem !== undefined) {
                options.columns.data.remove(index);
            }
            return options;
        };

        model.manageSummaryViewType = function () {
            //if (model.form.rowOptions.gridViewType === "summary") {
            //    delete model.form.columnOptions.columns.data[1];
            //}
            var data = model.removeTotalFieldForColumnOptions(model.form.columnOptions);
            model.copyInitialPeriodOptions(data);
        };

        model.getColumnOptionsByPreferences = function (data) {
            var firstRefData, rollingPeriods;
            if (!model.getFirstReferenceData()) {
                firstRefData = {
                            width: 80,
                            key: "firstReferenceData",
                            label: "First Reference Data",
                            state: {
                                active: false,
                                locked: false
                            },
                            isDataColumn: true,
                            classNames: "toggle-text"
                        };
                data.columns.data.push(firstRefData);
            }
            if (!model.getRollingActual()) {
                rollingPeriods = {
                                    width: 80,
                                    key: "rollingActual",
                                    label: "Rolling Actual",
                                    state: {
                                        active: false,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                };
                 data.columns.data.push(rollingPeriods);
             }

           return data;
       };
      

        model.prepareReqObjectForSVC = function () {
            return {
                distributedID: base.getDistributedID(),
                budgetModelID: base.getBudgetModelID(),
                propertyID: base.getPropertyID(),
                hasReferenceRows: model.getHasReferenceData(),
                hideZeroRows: model.getHideZeroRows(),
                gridViewType: model.getGridViewType(),
                forecastUseData: model.getForecastUseData(),
                firstReferenceData: model.getFirstReferenceData(),
                rollingActual: model.getRollingActual(),
                accountTypeID: model.form.types === "" ? 0 : model.form.types,//model.form.types,
                accountCategoryID: model.form.categories === "" ? 0 : model.form.categories,//808,//model.form.categories,
                masterChartID: base.getMasterChartID()
                   };
        };

        model.getCategories = function () {
           // return model.form.categories==""?0:model.form.categories;
        };

        model.getColumnOptions = function () {
            return model.form.columnOptions.columns.data;
        };

        model.changeRadioOptions = function (type) {
            model.form.rowOptions.gridViewType = type;
        };

        model.refresh = function () {
            model.event.publish();
        };

        model.navigateToDetailView = function (glAccount, isCatRestricted, desc) {
            if (!isCatRestricted) {
                $location.path("/account-by-account/" + $stateParams.distID + "/edit/" + glAccount);
            }
            else {
              $modal({
                    animation: 'am-fade-and-slide-top',
                    templateUrl: 'app/templates/alert.tmpl.html',
                    title: model.getLangValue('bdget_accByAcc_restrict_gl_title'), 
                    content: model.getLangValue('bdget_accByAcc_restrict_gl') + desc,
                    show: true
                });
            }
              
        };

        model.navigateToDetailViewBySearch = function (glAccount) {
            var glObject = $filter('filter')(model.form.glAccountData, { glAccountNumber: glAccount }, true)[0];
           model.navigateToDetailView(glAccount, glObject.isCatRestricted, glObject.description);
        };

        model.setSelectedRow = function (row) {
            selectedRow = row;
        };

        model.updateCommentCountForGLAccount = function (commentModelInfo) {
            selectedRow.data.commentCount = commentModelInfo.glGeneralCommentsCount;
            selectedRow.data.reviewerCommentCount = commentModelInfo.glReviewerCommentsCount;
        };

        model.getLangValue = function (key) {
            return translate(key);
        };

        model.preserveSettings = function () {
            model.form.initialRowOptions = angular.copy(model.form.rowOptions);
        };

        model.revertChangesOnCancel = function () {
            model.form.rowOptions = angular.copy(model.form.initialRowOptions);
            model.form.initialPeriodOptions = angular.copy(model.form.columnOptions);
        };


        model.isColumnOptionChanged = function () {
            return !angular.equals(model.form.initialRowOptions.gridViewType, model.form.rowOptions.gridViewType);
        };

        model.isRowOptionChanged = function () {
            var hideZeroRows = angular.equals(model.form.initialRowOptions.hideZeroRows, model.form.rowOptions.hideZeroRows);
            var hasRefData = angular.equals(model.form.initialRowOptions.hasReferenceData, model.form.rowOptions.hasReferenceData);
            if (hideZeroRows && hasRefData) {
                return false;
            }
            return true;
        };

        model.isPeriodOptionsChnaged = function () {
            var firRefData = angular.equals(model.form.initialRowOptions.firstReferenceData, model.form.rowOptions.firstReferenceData);
            var forecastData = angular.equals(model.form.initialRowOptions.forecastUseData, model.form.rowOptions.forecastUseData);
            var rollingPeriods = angular.equals(model.form.initialRowOptions.rollingActual, model.form.rowOptions.rollingActual);
            if (firRefData && forecastData && rollingPeriods) {
                return false;
            }
            return true;
        };

        model.applyPeriodChanges = function (gridData) {
            angular.forEach(gridData.columns.config, function (confData) {
                var objConfig = $filter('filter')(model.form.initialPeriodOptions.columns.data, { key: confData.key }, true)[0];
                var objData = $filter('filter')(gridData.columns.data, { key: confData.key }, true)[0];
          
                if (objConfig !== undefined) {
                    confData.state.active = objConfig.state.active;
                } 
                if (objData !== undefined) {
                    objData.state.active = objConfig.state.active;
                }     
            });
            if (!gridData.columns.config.firstReferenceData.state.active) {
                gridData.columns.config.variancePercent.state.active = false;
                gridData.columns.config.varianceAmount.state.active = false;
    
            }
                     
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        model.copyGridData = function (data) {
            model.form.glAccountData = data;
        };

        model.stringToBoolean = function (string) {
            if (string === true || string === false) {
                return string;
            }
            else {
                switch (string.toLowerCase().trim()) {
                    case "true": return true;
                    case "false": case null: return false;
                    default: return Boolean(string);
                }
            }           
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('accountByAccountView', [ 
                                            'account-by-account-config', 
                                            'accountByAccountSVC',
                                            'budgetDetails',
                                            'preferences', 
                                            'accountByAccountBase',
                                            'eventStream',                                            
                                            '$location',
                                            '$stateParams',
                                            '$modal',
                                            'appLangTranslate',
                                            '$filter',
                                            accountByAccountView]);
})(angular);
