(function (angular) {
    "use strict";
    var fn = angular.noop;

    function BdgtImprtGlMri($scope, $filter, $state, $stateParams, $location, model, httpSvc, appTranslate, selectMenuModel, dialogSvc, wiznav, breadcrumbs) {
        var vm, chartID, grid, headers, filters, pagination, pgData, watch1, translate;
        translate = appTranslate('import').translate;
        vm = this;

        //Yet Implement this Page

        //vm.init = function () {
        //    chartID = $stateParams.chartID;
        //    //if (!chartID) {
        //    //    logc("ChartID not found");

        //    //    return;
        //    //}
        //    vm.model = model;
        //    httpSvc = httpSvc();
        //    vm.loadMriCharts();
        //    vm.loadAssgnTypes();
        //};
        //vm.loadMriCharts = function () {
        //    var propertyData;
        //    httpSvc.getData('/api/budgeting/common/osaproperty/combo').success(function (data) {
        //        if (vm.validateResponse(data)) {
        //            // propertyData = [{
        //            // 				"propertyID":0,
        //            // 				"propertyName":translate('bdgt_import_propertyNameDef')
        //            // 				}];
        //            // propertyData=propertyData.concat(data.records);
        //            var propertyData = [{
        //                "value": 0,
        //                "name": "-- Select Chart --"
        //            }];
        //            data.records.forEach(function (item) {
        //                var newItem = { "value": item.propertyID, "name": item.propertyName };
        //                propertyData.push(newItem);
        //            });
        //            vm.selctedChartId = 0;
        //            vm.selCharts = selectMenuModel().setOptions(propertyData);
        //        }
        //    }).error(function (data, status) {
        //        httpSvc.onError(data, status);
        //    });
        //};
        //vm.validateResponse = function (resp) {
        //    if (resp.exception && resp.exception.confirmAction === true) {
        //        if (resp.exception.reasonFailed === "OSA_SETUP_NOT_FOUND") {
        //            var dialog = dialogSvc();
        //            dialog.update({
        //                type: 'error',
        //                showCancel: true,
        //                showContinue: false,
        //                title: "Cannot import G/L accounts",
        //                question: '',
        //                cancelButtonText: 'Close',
        //                info: "Accounting Entity and Location Ids are not mapped for the selected property.Please map Entity and Location Ids before attempting to import."
        //            });
        //            dialog.show();
        //            return false;
        //        }
        //        else {
        //            var dialogFail = dialogSvc();
        //            dialogFail.update({
        //                type: 'error',
        //                showCancel: true,
        //                showContinue: false,
        //                title: "Error",
        //                question: '',
        //                cancelButtonText: 'Close',
        //                info: resp.exception.reasonFailed
        //            });
        //            dialogFail.show();
        //            return false;
        //        }
        //    }
        //    else {
        //        return true;
        //    }
        //};
        //vm.loadAssgnTypes = function () {
        //    var srcoptions = [{
        //        "name": "-- Select Assign Type --",
        //        "value": ""
        //    }, {
        //        "name": "Asset",
        //        "value": "Asset"
        //    }, {
        //        "name": "Liability",
        //        "value": "Liability"
        //    }, {
        //        "name": "Income",
        //        "value": "Income"
        //    }, {
        //        "name": "Expense",
        //        "value": "Expense"
        //    }];
        //    vm.selAssgnType = "";
        //    vm.srcAelAssgnType = selectMenuModel().setOptions(srcoptions);
        //    vm.impCashAcc = false;
        //    vm.impBalSheetAcc = false;
        //    vm.impRetainLedgerPrefix = false;
        //};
        //vm.loadMRIGls = function () {
        //    vm.showDelBtn = true;
        //    httpSvc.getData('/api/budgeting/coa/accounttype/list').success(function (accTypes) {
        //        if (vm.validateResponse(accTypes)) {
        //            vm.filterOptions = [{
        //                "name": "All",
        //                "value": ""
        //            }];
        //            vm.filterOptions = vm.filterOptions.concat(accTypes.records);
        //            vm.model = model.updateGrid(vm.filterOptions);
        //            grid = vm.model.grid;
        //            headers = grid.headersModel;
        //            filters = grid.filtersModel;
        //            pagination = grid.pagination;
        //            pgData = pagination.data;
        //            pgData.pages.resultsPerPage = 100;
        //            pagination.data.filterBy = { glAccountNumber: "" };
        //            pagination.data.sortBy = { GLAccountNumber: "asc" };
        //            watch1 = pagination.events.update.subscribe(vm.updateGridPagingAccCsv);
        //            grid.busy(true);
        //            vm.showDataGrid = true;
        //            //httpSvc.postData('/api/budgeting/coa/glaccountstaginglist/' + chartID, pagination.data).success(function (GlAccs) {
        //            //if (vm.validateResponse(GlAccs)) {
        //            var GlAccs = {
        //                "totalRecords": 2,
        //                "records": [
        //                  {
        //                      "glAccountID": 59,
        //                      "glAccountNumber": "0001-00",
        //                      "description": "testing",
        //                      "glAccountType": "Asset",
        //                      "category": "Asset",
        //                      "accountLevel": "",
        //                      "narrative": "description",
        //                      "normalBalance": "Credit",
        //                      "masterChartID": 63,
        //                      "dataSource": null,
        //                      "totalRecords": 2,
        //                      "selectedBit": false
        //                  },
        //                  {
        //                      "glAccountID": 60,
        //                      "glAccountNumber": "0002-00",
        //                      "description": "testing2",
        //                      "glAccountType": "Liability",
        //                      "category": "Liability",
        //                      "accountLevel": "Detail",
        //                      "narrative": "test description",
        //                      "normalBalance": "Debit",
        //                      "masterChartID": 63,
        //                      "dataSource": null,
        //                      "totalRecords": 2,
        //                      "selectedBit": false
        //                  }
        //                ]
        //            };
        //            vm.data = GlAccs;
        //            filters.events.filter.subscribe(vm.loadFilterDataAccCsv);
        //            grid.flushRows().setData(vm.data).build().busy(false);
        //            //}
        //            //}).error(function (data) {
        //            //    httpSvc.onError(data, status);
        //            //});
        //        }
        //    }).error(function (data, status) {
        //        httpSvc.onError(data, status);
        //    });
        //};
        //vm.updateGridPagingAccCsv = function () {
        //    //httpSvc.abort().postData('/api/budgeting/coa/glaccountstaginglist/' + chartID, pagination.data).success(function (GlAccs) {
        //    //    if (vm.validateResponse(GlAccs)) {
        //    //        vm.data = GlAccs;
        //    //        grid.flushRows().addData(vm.data).build().busy(false);
        //    //    }
        //    //}).error(function (data, status) {
        //    //    httpSvc.onError(data, status);
        //    //});
        //};
        //vm.loadFilterDataAccCsv = function (filt) {
        //    //if (filt.glAccountType && filt.glAccountType !== "" && angular.isNumber(filt.glAccountType)) {
        //    //    filt.glAccountType = $filter('filter')(vm.filterOptions, { value: filt.glAccountType }, false)[0].name;
        //    //}
        //    //pagination.reset().data.filterBy = filt;
        //    //httpSvc.abort().postData('/api/budgeting/coa/glaccountstaginglist/' + chartID, pagination.data).success(function (GlAccs) {
        //    //    if (vm.validateResponse(GlAccs)) {
        //    //        vm.data = GlAccs;
        //    //        grid.flushRows().setData(vm.data).build().busy(false);
        //    //    }
        //    //}).error(function (data, status) {
        //    //    httpSvc.onError(data, status);
        //    //});
        //};
        //vm.saveGlAccounts = function () {
        //    httpSvc.getData('/api/budgeting/coa/glaccountstaging/copy/' + chartID + '/mri').success(function (data) {
        //        if (vm.validateResponse(data)) {
        //            var dialog = dialogSvc();
        //            dialog.update({
        //                type: 'info',
        //                showCancel: false,
        //                showContinue: true,
        //                title: "Successful",
        //                question: '',
        //                info: "GL Accounts got imported successfully"
        //            });
        //            dialog.show();
        //            return true;
        //        }
        //    }).error(function (data, status) {
        //        httpSvc.onError(data, status);
        //    });
        //};
        //vm.toggleAssignType = function () {
        //    vm.model.form.toggleAsgnType.state.open = !vm.model.form.toggleAsgnType.state.open;
        //};
        //vm.assignTypeSave = function () {

        //};
        //vm.delGlAccounts = function () {
        //    //if(selection.hasChanges()){
        //    vm.selectedGls = $filter('filter')(vm.data.records, { selectedBit: 'true' });
        //    vm.selGls = [];
        //    angular.forEach(vm.selectedGls, function (item) {
        //        var newItem = { "glAccountID": item.glAccountID };
        //        vm.selGls.push(newItem);
        //        vm.data.records = $filter('filter')(vm.data.records, { "glAccountNumber": "!" + item.glAccountNumber });
        //    });
        //    if (vm.selGls.length > 0) {
        //        httpSvc.putData('/api/budgeting/coa/glaccountstaging/delete', vm.selGls).success(function (respSuc) {
        //            var dialog = dialogSvc();
        //            dialog.update({
        //                type: 'info',
        //                showCancel: false,
        //                showContinue: true,
        //                title: "Successful",
        //                question: '',
        //                info: "GL Accounts got deleted successfully"
        //            });
        //            dialog.show();
        //        }).error(function (data, status) {
        //            httpSvc.onError(data, status);
        //        });
        //    }
        //    grid.busy(true);
        //    grid.flushRows().addData(vm.data).build().busy(false);
        //    //}
        //};
        //vm.init();
    }
    angular
        .module("budgeting")
        .controller('BdgtImprtGlMri', ['$scope', '$filter', '$state', '$stateParams', '$location', 'importGlAccModel', 'httpServiceCall', 'appLangTranslate', 'rpSelectMenuModel', 'rpDialogModel', 'rpWizardNavModel', 'rpBreadcrumbsModel', BdgtImprtGlMri]);
})(angular);
