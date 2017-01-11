//  payroll employee  Controller

(function (angular) {
    "use strict";

    function PayrollByCtrl(
        $q,
        $scope,
        $state,
        $stateParams,
        scrollingTabsMenu,
        budgetDetails,
        payrollByContent,
        payrollItemState,
        payrollBaseModel,
        payrollByModel,
        asideModal,
        modal,
        svc,
        notifSvc) {

        var vm = this,
            model,
            tabsMenu = scrollingTabsMenu(),
            unSubscribeEvent = angular.noop,
            unSubscribeTabChangeEvent = angular.noop,
            selectedTab,
            budgetModel,
            accessPrivilages,
            empSelectorAside,
            alertModal,
            confirmModal,
            tabs,
            employeeDetailAside,
            jobPositionDetailAside;

        // Redirect user if payrollbyid is not there
        if (!$stateParams.payrollByID || $stateParams.payrollByID <= 0) {
            $state.go("home");
            return;
        }

        vm.init = function () {
            accessPrivilages = budgetDetails.getAccessPrivileges();
            unSubscribeEvent();
            vm.activatePayrollItemView = false;
            vm.fieldLabels = payrollByContent;

            tabs = payrollItemState
                .onUpdate(vm.update)
                .setPayrollState($stateParams.distID, $stateParams.isEdit, !accessPrivilages.allowEdit)
                .getTabs();

            unSubscribeTabChangeEvent = tabsMenu
                .setData(tabs)
                .subscribe("change", vm.setActiveTab);
            vm.tabsMenu = tabsMenu;
            vm.setSelectedTab(tabs.first());

            vm.model = model = payrollByModel()
                .readonly(!accessPrivilages.allowEdit)
                .edit($stateParams.isEdit);

            empSelectorAside = asideModal("payrollEmpSelector")
                .done(vm.onSelectedPayroll);

            alertModal = modal
                .alert()
                .setContent({
                    title: payrollByContent.warningNavTitleText,
                    message: payrollByContent.warningNavMessageText,
                    btnOkText: payrollByContent.warningNavBtnOkText
                });

            jobPositionDetailAside = asideModal('jobPositionDetail')
                .done(vm.onPayrollDetailClose);
            employeeDetailAside = asideModal('employeeDetail')
                .done(vm.onPayrollDetailClose);

            confirmModal = modal
                .confirm()
                .setContent({
                    title: payrollByContent.confirmDeleteTitleText,
                    message: payrollByContent.confirmDeleteMessageText,
                    btnAcceptText: payrollByContent.confirmDeleteYesText,
                    btnRejectText: payrollByContent.confirmDeleteNoText
                })
                .accept(vm.onConfirm)
                .reject(vm.onReject);

            vm.changePayrollBy($stateParams.payrollID, $stateParams.payrollBy, $stateParams.payrollByID);

            vm.destWatch = $scope.$on("$destroy", vm.destroy);

            return vm;
        };

        vm.viewDetails = function () {
            var resolveData,
                payrollByInfo = payrollItemState.get().details;
            if (payrollItemState.getIsEmployee()) {
                resolveData = {
                    empDetailParam: function () {
                        return {
                            payrollID: payrollByInfo.payrollID,
                            employeeID: payrollByInfo.employeeID,
                            employeePropertyID: payrollByInfo.employeePropertyID,
                            newEmployee: false,
                            record: payrollByInfo
                        };
                    }
                };
                employeeDetailAside
                    .resolve(resolveData)
                    .show();
            } else {
                resolveData = {
                    jobPosition: function () {
                        return {
                            state: "edit",
                            id: payrollByInfo.jobPositionID
                        };
                    }
                };
                jobPositionDetailAside
                    .resolve(resolveData)
                    .show();
            }
        };

        vm.changeState = function (payrollID, payrollBy, payrollByID) {
            return $state.go("payroll.payrollBy", {
                distID: $state.params.distID,
                payrollID: payrollID,
                payrollBy: payrollBy.toLowerCase(),
                payrollByID: payrollByID
            }, {
                location: "replace",
                inherit: false,
                relative: $state.$current,
                notify: false
            });
        };

        vm.onSelectedPayroll = function (selectedPayroll) {
            vm
                .changeState(selectedPayroll.payrollID, selectedPayroll.payrollBy, selectedPayroll.payrollByID)
                .then(function () {
                    vm.changePayrollBy(selectedPayroll.payrollID, selectedPayroll.payrollBy, selectedPayroll.payrollByID);
                });
        };

        vm.onPayrollDetailClose = function () {
            var payrollByInfo = payrollItemState.get();
            vm.changePayrollBy(payrollByInfo.payrollID, payrollByInfo.payrollBy, payrollByInfo.payrollByID);
        };

        vm.changePayrollBy = function (payrollID, payrollBy, payrollByID) {
            svc.getPayrollBasicDetails({
                distID: $stateParams.distID,
                payrollBy: payrollBy,
                payrollByID: payrollByID
            }).then(function (response) {
                model
                    .setPayRates(response.records);

                payrollItemState
                    .setPayRates(response.records)
                    .setPayrollBy(payrollID, payrollBy, payrollByID);

                //if (response.records.length !== 1 || !payrollItemState.canAddNewPayRate()) {
                //    vm.activatePayRate(response.records.first());
                //} else {
                //    payrollItemState
                //        .setPayrollBy(payrollID, payrollBy, payrollByID);
                //}
            }).catch(vm.error);
            //vm.getPayrollComments(payrollID);
        };

        vm.getPayrollComments = function (payrollID) {
            svc
                .getPayrollCommentCount({
                    distID: $stateParams.distID,
                    payrollID: payrollID
                })
                .then(function (response) {
                    payrollItemState.setComments(response.records);
                })
                .catch(vm.error);
        };

        vm.formatRate = function (payrollBy) {
            return model.formatRate(payrollBy);
        };

        vm.formatNoPayRateCount = function (payrollBy) {
            return model.formatNoPayRateCount(payrollBy);
        };

        vm.isActivePayRate = function (payrollBy) {
            return payrollItemState.isActivePayRate(payrollBy);
        };

        vm.setActivePayRate = function (payrollBy) {
            if (!model.getIsReadonly() && !payrollItemState.hasPayroll()) {
                alertModal
                    .show();
            } else {
                vm.activatePayRate(payrollBy);
            }
        };

        vm.activatePayRate = function (payrollBy) {
            if (!payrollItemState.isActivePayRate(payrollBy)) {
                var payrollByID = payrollItemState.getPayrollByID(payrollBy);
                vm
                    .changeState(payrollBy.payrollID, payrollBy.payrollBy.toLowerCase(), payrollByID)
                    .then(function () {
                        vm.activatePayrollItemView = false;
                        payrollItemState
                            .setPayrollBy(payrollBy.payrollID, payrollBy.payrollBy.toLowerCase(), payrollByID);
                        vm.getPayrollComments(payrollBy.payrollID);
                    });
            }
        };

        vm.addNewPayRate = function () {
            if (!model.getIsReadonly() && !payrollItemState.canAddNewPayRate()) {
                alertModal
                    .show();
            } else {
                vm.activatePayRate(payrollItemState.copyLastPayRate());
            }
        };

        vm.deletePayRate = function (payrollBy, index) {
            if (payrollBy.payrollID > 0) {
                confirmModal.setResult({
                    accept: {
                        payrollBy: payrollBy,
                        index: index
                    },
                    reject: {}
                }).show();
            } else {
                vm.removePayRate(payrollBy, index);
            }
        };

        vm.removePayRate = function (payrollBy, index) {
            if (payrollItemState.hasPayRate()) {
                var nextPayrollBy = payrollItemState.getNextPayRate(index);
                payrollItemState.removePayRate(index);
                vm.activatePayRate(nextPayrollBy);
            } else {
                $state.go("payroll.summary", {
                    distID: $state.params.distID
                });
            }
        };

        vm.onConfirm = function (result) {
            vm.removePayRate(result.payrollBy, result.index);
            var params = {
                payrollID: result.payrollBy.payrollID
            };
            svc.deleteJobPosition(params)
                .then(vm.deleteSuccess);
        };

        vm.cleanUnSavedPayRates = function () {
            if (!payrollItemState.canAddNewPayRate()) {
                vm.removePayRate(payrollItemState.getLastPayRate(), payrollItemState.getLastPayRateIndex());
            }
        };

        vm.deleteSuccess = function () {
            notifSvc.success(payrollByContent.deletePayRateMsg);
        };

        vm.setSelectedTab = function (tab) {
            selectedTab = tab;
            vm.activeTab = payrollItemState
                .setCurrentTab(selectedTab)
                .getCurrentTab();

            vm.activatePayrollItemView = true;
        };

        vm.update = function (payrollByInfo) {
            model
                .setPayrollBy(payrollItemState.getIsEmployee(), payrollByInfo.details);
            //if (!payrollItemState.hasPayroll()) {
            //    selectedTab.isActive = false;
            //    selectedTab = tabs.first();
            //}
            selectedTab.isActive = true;
            vm.setSelectedTab(selectedTab);
        };

        vm.setActiveTab = function (tab) {
            // if (!model.getIsReadonly() && !tab.isDefault && !payrollItemState.hasPayroll()) {
            //     tab.isActive = false;
            //     tab = tabs.first();
            //     tab.isActive = true;
            //     alertModal
            //         .show();
            // }
            vm.setSelectedTab(tab);
            return vm;
        };

        vm.showSearchEmployees = function () {
            empSelectorAside.show();
        };

        vm.save = function () {
            var payrollItems = payrollItemState.getCurrentTab().payrollItems;
            var payload = {
                payroll: payrollItemState.get().details
            };
            for (var i = 0; i < payrollItems.length; i++) {
                var payrollItem = payrollItems[i];
                if (payrollItems[i].model) {
                    if (!payrollItems[i].model.validate()) {
                        return;
                    }
                    var json = payrollItem.model.save();
                    for (var key in json) {
                        if (payload.hasOwnProperty(key) && key === "bonusItems") {
                            payload[key].bonusItem.push(json[key].bonusItem.first());
                        } else {
                            payload[key] = json[key];
                        }
                    }
                }
            }
            svc
                .savePayrollDetails(payload)
                .then(function (response) {
                    notifSvc.success(payrollByContent.saveSuccessMessage);
                    var payrollByID = payrollItemState.getPayrollByID(payload.payroll);
                    vm
                        .changeState(response.messageId, payload.payroll.payrollBy.toLowerCase(), payrollByID)
                        .then(function () {
                            payrollItemState
                                .notifySaveSucess(response.messageId, payload.payroll)
                                .toggle(false);
                            model.edit(false);
                        });

                }).catch(function () {
                    notifSvc.error(payrollByContent.saveErrorMessage);
                });

        };

        vm.edit = function () {
            payrollItemState.toggle(true);
            model.edit(true);
        };

        vm.cancel = function () {
            payrollItemState.toggle(false);
            if (payrollItemState.getLastPayRateIndex() > 0) {
                vm.cleanUnSavedPayRates();
            }
            model.edit(false);
        };

        vm.error = function () {
            notifSvc.error(payrollByContent.someThingErrorMessage);
        };

        vm.destroy = function () {
            unSubscribeTabChangeEvent();
            jobPositionDetailAside.destroy();
            employeeDetailAside.destroy();
            payrollItemState.destroy();
            alertModal.destroy();
            empSelectorAside.destroy();
            model.destroy();
            tabsMenu.destroy();
            vm = undefined;
        };

        if (payrollBaseModel.ready) {
            vm.init();
        } else {
            unSubscribeEvent = payrollBaseModel.events.onPayrollItemUpdate.subscribe(vm.init);
        }
    }

    angular
        .module("budgeting")
        .controller("PayrollByCtrl", [
            '$q',
            '$scope',
            '$state',
            '$stateParams',
            'rpScrollingTabsMenuModel',
            'budgetDetails',
            'payrollByContentModel',
            'payrollItemStateModel',
            'payrollBaseModel',
            'payrollByModel',
            'rpBdgtAsideModalService',
            'rpBdgtModalService',
            'payrollByService',
            "notificationService",
            PayrollByCtrl
        ]);
})(angular);
