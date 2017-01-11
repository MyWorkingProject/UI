(function (angular) {
    'use strict';

    function PayrollEmployeeDetailsCtrl(
        $scope,
        model,
        budgetDetails,
        gridTransformSvc,
        formConfig,
        asideModal,
        asideModalInstance,
        $stateParams,
        empDetailParam,
        employeePayrollContent,
        modal,
        employeeDetailsSvc) {
        var vm = this,
            alertModal,
            confirmModal,
            payrollByModel,
            selectedWidget,
            addPropertiesAside,
            onChangeUnSubscribe,
            onSuccessSaveUnSubscribe,
            onStateChangeUnSubscribe;
        formConfig.setMethodsSrc(vm);
        vm.init = function () {
            vm.model = model;
            vm.formConfig = formConfig;
            vm.fieldLabels = employeePayrollContent;
            vm.loadData();
            formConfig.setMethodsSrc(vm);

            addPropertiesAside = asideModal('addPropertiesOptions')
                .done(vm.selectedProperties);

            alertModal = modal.alert().ok(vm.onOkClick);

            confirmModal = modal.confirm()
                .accept(vm.onConfirm)
                .reject(vm.onReject);

            $scope.$on("$destroy", vm.destroy);
        };

        vm.loadData = function () {
            model.reset();
            vm.dates = {
                startMonth: budgetDetails.getModelDetails().startMonth,
                noOfPeriods: budgetDetails.getModelDetails().noOfPeriods,
                budgetYear: budgetDetails.getModelDetails().budgetYear,
            };
            if (empDetailParam.newEmployee === false) {
                model.loadEmployeePayRollData(empDetailParam.employeeID);
                model.loadEmployeePropertiesData(empDetailParam.employeeID);
                model.setFormFlag(empDetailParam.newEmployee);
            }
            if (empDetailParam.newEmployee === true) {
                model.setFormFlag(empDetailParam.newEmployee);
                model.onEmployeePayRollDataSuccess();
            }
            model.form.empStatus = empDetailParam.newEmployee;
            model.form.payrateType = empDetailParam.payrateType;
            model.form.dates = vm.dates;
            model.loadJobPositionsRightsInfo();
        };
        vm.onChangeStartDate = function () {
            model.onChangeStartDate();
        };
        vm.selectedProperties = function (data) {
            model.addSeletedProperties(data);
        };
        vm.stateHoverIn = function () {
            model.stateHoverIn();
        };

        vm.stateHoverOut = function () {
            model.stateHoverOut();
        };

        vm.close = function () {
            asideModalInstance.cancel();
        };

        vm.cancel = function () {
            if (model.form.records.employeeID > 0) {
                model.cancel(false);
            }
            else {
                vm.close();
            }
        };

        vm.save = function (form) {
            if (vm.model.form.records.employeeID > 0) {
                vm.savePayrollEmployeeDetails(form);
            }
            else {
                vm.saveNewEmployeeDetails(form);
            }
        };

        vm.showForm = function () {
            model.showForm(true);
        };

        vm.initialLoad = function (data) {
            vm.destWatch = $scope.$on("$destroy", vm.destroy);
        };
        //--------------------------------------------------------------------------------------------------
        vm.addPropertiesAsideModel = function () {
            var resolveData = {
                displayProperties: function () {
                    return {
                        mastarChart: false,
                        dataFilter:''
                    };
                },
                addPropertiesSvc: function () {
                    return employeeDetailsSvc;
                }
            };
            addPropertiesAside
                .resolve(resolveData)
                .show();
        };
        //--------------------------------------------------------------------------------------------------
        vm.editWidget = function (widget) {
            if (widget) {
                widget.isEdit = false;
            }
            selectedWidget = widget;
            selectedWidget.isEdit = true;
            model.setOptions(widget);
        };
        vm.savePayrollEmployeeDetails = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                if (model.form.properties.length > 0) {
                    model.savePayrollEmployeeDetails(empDetailParam);
                    form.$setPristine();
                }
                else {
                    vm.propertryRequiredAlert();
                }
            }
        };
        vm.saveNewEmployeeDetails = function (form) {
            if (form.$invalid) {
                form.$setSubmitted();
            }
            else {
                if (model.form.properties.length > 0) {
                    model.saveNewEmployeeDetails(empDetailParam);
                    form.$setPristine();
                }
                else {
                    vm.propertryRequiredAlert();
                }
            }
        };
        vm.propertryRequiredAlert = function () {
            alertModal.setContent({
                title: vm.fieldLabels.add_employee_title,
                message: vm.fieldLabels.add_employee_message,
                btnOkText: vm.fieldLabels.cancelBtn
            }).show();
        };
        vm.saveWidgetDetails = function (item) {
            model.saveWidgetDetails(item);
        };
        vm.toggleWidget = function (widget) {
            selectedWidget = widget;
            selectedWidget.isEdit = false;
        };
        vm.toggleWidgetSave = function (widget, formName) {
            if (formName.$invalid) {
                formName.$setSubmitted();
            }
            else {
                if (model.checkDatesValidation(widget)) {
                    selectedWidget = widget;
                    selectedWidget.isEdit = false;
                }
            }
        };

        vm.toggleNewWidget = function (widget, index) {
            selectedWidget = widget;
            selectedWidget.isEdit = false;
        };
        //----------------------------------------------------------------------------------------------------
        vm.deleteWidgetDetails = function (index, item) {
            vm.deleteWidget = {
                indexValue: index,
                item: item
            };
            if (vm.deleteWidget.item.employeePropertyID > 0) {
                employeeDetailsSvc.deleteEmployeeProperty({
                    employeePropertyID: item.employeePropertyID
                }).$promise.then(vm.onEmployeePropertyDeleteSuccess, vm.onEmployeePropertyDeleteError);
            }
            else {
                model.deleteWidget(vm.deleteWidget);
            }

        };

        vm.onEmployeePropertyDeleteSuccess = function (resp) {
            if (resp.messageText.toLowerCase() === "success") {
                confirmModal.setContent({
                    title: vm.fieldLabels.confirmTitle,
                    message: vm.fieldLabels.confirmmMessage1 + "'" + vm.deleteWidget.item.propertyName + "'" + vm.fieldLabels.confirmmMessage2,
                    btnAcceptText: vm.fieldLabels.deleteBtn,
                    btnRejectText: vm.fieldLabels.cancelBtn
                }).show();
            }
        };

        vm.onEmployeePropertyDeleteError = function () {
            alertModal.setContent({
                title: vm.fieldLabels.property_title,
                message: vm.fieldLabels.property_message1 + "'" + vm.deleteWidget.item.propertyName + "'" + vm.fieldLabels.property_message2,
                btnOkText: vm.fieldLabels.cancelBtn
            }).show();
        };

        vm.onConfirm = function () {
            model.deleteWidget(vm.deleteWidget);
            vm.onReject(); //to clear the object
        };
        vm.onReject = function () {
            vm.deleteWidget = {
                indexValue: '',
                item: ''
            };
        };
        vm.onOkClick = function () {};
        vm.destroy = function () {
            asideModalInstance.done();
            addPropertiesAside.destroy();
            alertModal.destroy();
            confirmModal.destroy();
            model.reset();
        };

        vm.init();
    }

    angular
        .module('budgeting')
        .controller('PayrollEmployeeDetailsCtrl', [
            "$scope",
            'payrollEmployeeModel',
            'budgetDetails',
            "rpGridTransform",
            "payrollEmployeeConfig",
            "rpBdgtAsideModalService",
            "rpBdgtAsideModalInstance",
            '$stateParams',
            'empDetailParam',
            'employeePayrollContent',
            'rpBdgtModalService',
            'payrollEmployeeSvc',
            PayrollEmployeeDetailsCtrl
        ]);
})(angular);
