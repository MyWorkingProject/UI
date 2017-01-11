(function (angular) {
    "use strict";

    function EditAccountByAccountCtrl(
        $scope,
        $q,
        $state,
        $stateParams,
        glAccountModel,
        glGridOptionConfig,
        glEditContent,
        budgetDetails,
        glGridConfig,
        calcuStateModel,
        asideModal,
        modal,
        glAccountDetailsSVC,
        glAccountReferenceDataSVC,
        notifSvc) {
        var vm = this,
            model,
            defaultAdjustmentAside,
            commentAside,
            glAccountFindAside,
            glHistoryAside,
            calculatorAside,
            gridSettingAside,
            budgetModel,
            accessPrivilages,
            alertModal,
            isForecastModel;

        vm.init = function () {
            budgetModel = budgetDetails.getModelDetails();
            accessPrivilages = budgetDetails.getAccessPrivileges();
            isForecastModel = angular.lowercase(budgetModel.budgetType) === "forecast";
            var gridConfig = glGridConfig(vm,
                budgetModel.budgetYear,
                budgetModel.startMonth - 1,
                budgetModel.noOfPeriods,
                isForecastModel,
                budgetModel.useActualThroughYear,
                budgetModel.useActualThroughMonth - 1);

            vm.fieldLabels = glEditContent;
            vm.isEditable = accessPrivilages.allowEdit;
            vm.model = model = glAccountModel(gridConfig, accessPrivilages.allowEdit);

            glGridOptionConfig
                .setData(model.getColumns())
                .loadPreference()
                .then(function (data) {
                    glGridOptionConfig.restorePreference(data.records);
                    vm.load($stateParams.distID, $stateParams.glAccountNumber);
                });

            defaultAdjustmentAside = asideModal('defaultAdjustment')
                .done(model.applyDefaultAdjustment);
            glAccountFindAside = asideModal('glAccountFind')
                .done(vm.changeGLAccount);
            commentAside = asideModal('glComment')
                .done(model.updateCommentCount);
            glHistoryAside = asideModal('glAccountHistory');
            calculatorAside = asideModal("calculator")
                .done(vm.applyCalculatorChanges);
            gridSettingAside = asideModal('gridSettings')
                .done(vm.applyGridSettings);
            alertModal = modal.alert();

            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };

        vm.showComments = function () {
            var resolve = {
                commentInfoModel: model.getCommentModel
            };
            commentAside
                .resolve(resolve)
                .show();
        };

        vm.showHistory = function () {
            var resolve = {
                glHistoryParamData: function () {
                    return {
                        glAcctNumber: model.getGAccountNumber(),
                        glAcctDescription: model.getGLDescription(),
                        year: budgetModel.budgetYear,
                        type: 'Actual'
                    };
                }
            };

            glHistoryAside
                .resolve(resolve)
                .show();
        };

        vm.findGlAccount = function (data) {
            var resolve = {
                selectedGlAccountData: function () {
                    return {
                        masterchartID: budgetModel.masterchartID,
                        propertyID: budgetModel.propertyID,
                        glAccountNumber: model.getGAccountNumber(),
                        glAccountName: model.getGLDescription(),
                        source: "AccountByAccount"
                    };
                }
            };

            glAccountFindAside
                .resolve(resolve)
                .show();

        };

        vm.showCalculator = function () {
            var calculatorState = {
                sourceDropdownData: model.getSourceData(),
                activePeriod: model.getSelectedRow(),
                startMonth: budgetModel.startMonth,
                startYear: budgetModel.budgetYear,
                noOfPeriods: budgetModel.noOfPeriods,
                errMsgRequired: glEditContent.calcRequireRowMessage
            };

            if (isForecastModel) {
                calculatorState.dateRange = {
                    startDate: new Date(budgetModel.useActualThroughYear, budgetModel.useActualThroughMonth - 1, 1),
                    endDate: new Date(budgetModel.budgetYear, budgetModel.startMonth + budgetModel.noOfPeriods - 1, 1)
                };
            }

            var resolveData = {
                calculatorParamData: function () {
                    return new calcuStateModel(calculatorState);
                }
            };

            calculatorAside
                .resolve(resolveData)
                .show();
        };

        vm.applyCalculatorChanges = function (calculatedData) {
            model.applyCalculatorChanges(calculatedData);
        };

        vm.showSearchGLAccount = function () {
            vm.isSearchGLAccountVisible = true;
        };

        vm.hideSearchGLAccount = function () {
            vm.isSearchGLAccountVisible = false;
        };

        vm.showAdjustment = function () {
            var resolve = {
                selectedDefaultAdjModel: model.getDefaultAdjustment
            };
            defaultAdjustmentAside
                .resolve(resolve)
                .show();
        };

        vm.navigateTo = function (column, row) {
            var routeName = '',
                params = {};
            switch (row.getData().workSheetType.toLowerCase()) {
                case "marketrent_unit":
                case "marketrent_unit type":
                case "marketrent_unit_student":
                case "marketrent_unit type_student":
                case "marketrent_unit type_student":
                case "marketrent_program":
                case "marketrent_program_student":
                case "marketrent_service group":
                    routeName = 'rentalincome.marketrent';
                    params.distID = $stateParams.distID;
                    params.rent = "marketrent";
                    break;
                case "schedulerent_unit":
                case "schedulerent_unit type":
                case "schedulerent_unit_student":
                case "schedulerent_unit type_student":
                case "schedulerent_unit type_student":
                case "schedulerent_program":
                case "schedulerent_program_student":
                case "schedulerent_service group":
                    routeName = 'rentalincome.marketrent';
                    params.distID = $stateParams.distID;
                    params.rent = "actualrent";
                    break;
                default:
                    // routeName = 'home';
                    break;
            }
            if (routeName !== "") {
                $state.go(routeName, params);
            }
        };

        vm.showHistoryByPeriod = function (column, row) {
            var rowData = row.getData();
            var resolve = {
                glHistoryParamData: function () {
                    return {
                        glAcctNumber: model.getGAccountNumber(),
                        glAcctDescription: model.getGLDescription(),
                        month: column.config.month + 1,
                        periodValue: rowData[column.config.key],
                        year: rowData.dataRefYear,
                        type: rowData.dataRefType,
                        dataType: (
                            rowData.dataRefType.toLowerCase() == 'actual' ||
                            rowData.dataRefType.toLowerCase() == 'audit' ||
                            (rowData.dataRefType.toLowerCase() == 'forecast' &&
                                column.config.period <= rowData.actualThroughPeriod)) ? 'Actual' : 'BudgetModel'
                    };
                }
            };

            glHistoryAside
                .resolve(resolve)
                .show();
        };

        vm.showTableSettings = function () {
            var resolve = {
                rpBdgtGridSettings: function () {
                    return glGridOptionConfig;
                }
            };
            gridSettingAside
                .resolve(resolve)
                .show();
        };

        vm.applyGridSettings = function (settings) {
            model
                .setGridSize(glGridOptionConfig.getGridRowSize())
                .toggleReferenceData(glGridOptionConfig.getActiveLevel())
                .updateColumnVisibility(glGridOptionConfig.getColumnOptions());
        };

        vm.onSelectedGLaccount = function (selectedGLAccount) {
            vm.isSearchGLAccountVisible = false;
            vm.changeGLAccount(selectedGLAccount.glAccountNumber);
        };

        vm.changeGLAccount = function (glAccountNumber) {
            $state.go("accountByAccount.edit", {
                distID: $stateParams.distID,
                glAccountNumber: glAccountNumber
            }, {
                location: "replace",
                inherit: false,
                relative: $state.$current,
                notify: false
            })
                .then(function () {
                    vm.load($stateParams.distID, glAccountNumber);
                });
        };

        vm.getReferenceDiffPerType = function (column, row, rows) {
            return model.getReferenceDiffPerType(column, row, rows, budgetModel.noOfUnits);
        };

        vm.getTotalReferenceDiffPerType = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getRowTotal = function (column, row, rows) {
            return model.getRowTotal(column, row, rows);
        };

        vm.getGLTotal = function (column, row, rows) {
            return model.getGLTotal(column, row, rows);
        };

        vm.addItemizationRow = function (column, row) {
            model.addItemizationRow(column, row);
        };

        vm.removeItemizationRow = function (column, row) {
            model.removeItemizationRow(column, row);
        };

        vm.updateItemization = function (column, row) {
            model.updateItemization(column, row);
        };

        vm.selectRow = function (column, row) {
            model.selectRow(column, row);
        };

        vm.applyRuleBasedValidation = function (column, row, rows) {
            return model.applyRuleBasedValidation(column, row, rows);
        };

        vm.load = function (distID, glAccountNumber) {
            var params = {
                glAccountNumber: glAccountNumber,
                distID: distID,
                propertyID: budgetModel.propertyID,
                masterChartID: budgetModel.masterChartID,
                noOfPeriods: budgetModel.noOfPeriods,
                budgetType: budgetModel.budgetType,
                budgetModelID: budgetModel.budgetModelID
            };
            //Todo: Catch should be last, Hack code to avoid undefined, Need a way to cancel $resource request
            $q.all([glAccountDetailsSVC.getGLAccountDetails(params),
                glAccountReferenceDataSVC.getGLAccountReferenceData(params)
            ]).catch(vm.error).then(function (data) {
                model
                    .setGLSearch(budgetModel, data[0].records.glAccountDetails)
                    .setDefaultAdjustment(data[0].records.adjustments, data[1].records, budgetModel.isFinal)
                    .setGridData(budgetModel.budgetType, data[0].records, data[1].records);
                vm.applyGridSettings();
            });
            return model;
        };

        vm.error = function (response) {
            if (response.status === 404) {
                $state.go("error", {
                    errorCode: "404",
                    templateUrl: 'app/templates/gl-account-not-found.tpl.html',
                    model: {
                        statusCode: '404',
                        title: glEditContent.glNotFoundTitleText,
                        message: glEditContent.glNotFoundMessageText,
                        btnBackText: glEditContent.previousBtnText,
                        routeName: 'accountByAccount.view',
                        params: {
                            distID: $stateParams.distID
                        }
                    }
                });
            } else {
                $state.go("error", {
                    errorCode: response.status
                });
            }
        };

        vm.save = function () {
            if (model.isValid()) {
                glAccountDetailsSVC
                    .saveGLAccountDetails(model.getPostData(budgetModel.distributedID,
                        budgetModel.budgetModelID,
                        budgetModel.propertyID,
                        budgetModel.budgetType,
                        budgetModel.assettype))
                    .then(vm.savedGLAccountDetails);
            } else {
                alertModal
                    .setContent({
                        title: glEditContent.requiredCommentTitle,
                        message: model.getcommentRuleMessage(
                            glEditContent.requiredCommentMessage,
                            glEditContent.dollorOperatorText,
                            glEditContent.percentageOperatorText,
                            glEditContent.greaterThanText,
                            glEditContent.lessThanText
                        ),
                        btnOkText: 'OK'
                    })
                    .show();
            }
        };

        vm.savedGLAccountDetails = function () {
            notifSvc.success(glEditContent.glAccountSavedMessage);
            vm.load($stateParams.distID, model.glAccountDetail.glAccountNumber);
        };

        vm.cancel = function () {
            $state.go("accountByAccount.view");
        };

        vm.destroy = function () {
            glGridOptionConfig.updatePreference();
            glGridOptionConfig.reset();
            model.destroy();
            model = undefined;
            defaultAdjustmentAside.destroy();
            glAccountFindAside.destroy();
            commentAside.destroy();
            glHistoryAside.destroy();
            calculatorAside.destroy();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("EditAccountByAccountCtrl", [
            "$scope",
            '$q',
            '$state',
            '$stateParams',
            "accountByAccountEditModel",
            "glGridOptionConfigModel",
            'glEditContentModel',
            'budgetDetails',
            'glGridConfigModel',
            'calculatorStateModel',
            'rpBdgtAsideModalService',
            'rpBdgtModalService',
            'glAccountDetailsSVC',
            'glAccountReferenceDataSVC',
            "notificationService",
            EditAccountByAccountCtrl
        ]);
})(angular);
