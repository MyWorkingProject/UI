//  BdgtGlAccountCategoryCtrl Controller
(function (angular, und) {
    "use strict";

    function BdgtGlAccountCategoryCtrl(wiznav, $stateParams, categoryModel, categoriesSVC, $scope, timeout, commonModel, impCatModel, categoryDataModel, categoryFormModel, accountCategoryRowModel, formManager) {
        var vm = this,
            chartID, uniqID = 0,
            body, btnClick, selectacctypelist, selectaccountcategorylist, accountCategoryData;
        var reportRowType = "",
            isNewRow = false,
            translate, moveCalled = false;
        var lastClickedID = 0,
            groupNumber = 0;
        chartID = $stateParams.chartID;
        $scope.impCatModel = impCatModel;
        $scope.state = commonModel.getNewChartModelState();

        vm.init = function () {
            categoryDataModel.resetDelCategoryList();
            vm.model = categoryModel;
            vm.dataModel = categoryDataModel;
            vm.formModel = categoryFormModel;
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            vm.accountTypeList();
            vm.getCOAReportRows();
            categoryModel.updateShowPageHeader();
            commonModel.updateState();
            moveCalled = false;
            vm.watchForm();
            vm.updateWiz();
        };

        vm.updateWiz = function () {
            if (categoryModel.getShowPageHeader()) {
                vm.setCompletedSteps();
            }
        };

        vm.watchForm = function () {
            vm.formWatch = $scope.$watch('categoryForm', vm.setForm);
        };

        vm.setForm = function (form) {
            vm.formWatch();
            vm.form = formManager().setForm(form);
            vm.form.setKeys(['accountType', 'categoryOrheaderDesc', 'accountCategory']);
        };

        $scope.$watch('impCatModel.postCalled', vm.callImportCategory);

        vm.callImportCategory = function () {
            if (impCatModel.getPostCalled()) {
                vm.init();
                impCatModel.setPostCalled(false);
                categoryModel.toggleImpCategory();
            }
        };
        vm.setCompletedSteps = function () {
            wiznav.complete('step1', true);
            wiznav.complete('step2', true);
            wiznav.complete('step3', false);
            wiznav.complete('step4', false);
        };

        vm.backClick = function () {
            wiznav.complete('step2', false);
            wiznav.prev();
        };

        vm.nextClick = function (isNext) {
            categoryDataModel.saveCoaRows(isNext, chartID);
        };

        vm.getCOAReportRows = function () {
            var promise = vm.getCoaRowPromise();
            promise.then(vm.getCOARowSuccess, categoryModel.getCOARowsFailure);
        };

        vm.getCoaRowPromise = function () {
            return categoriesSVC.getCOARowData(categoryDataModel.getParamData(chartID)).$promise;
        };

        vm.getCOARowSuccess = function (categoriesData) {
            var returnData = categoryDataModel.updateUniqGroupData(categoriesData, uniqID, groupNumber);
            vm.assignUniqGroupNumber(returnData);
            vm.dataModel = categoryDataModel;
        };

        vm.assignUniqGroupNumber = function (data) {
            uniqID = data.uniqID;
            groupNumber = data.groupNumber;
        };

        vm.deactivate = function (category) {
            categoryDataModel.deactive(category);
            uniqID = categoryDataModel.moveSectionRows(category, moveCalled, uniqID);
            moveCalled = false;
            categoryDataModel.updateSeqLevel();
            if (commonModel.getGroupState(category)) {
                timeout(function () {
                    vm.hideChildRows(category);
                }, 100);
            }
        };

        vm.hideChildRows = function (category) {
            commonModel.hideChildRows(category, categoryDataModel.getAccountCategoryList());
        };

        vm.activate = function (category) {
            categoryDataModel.activate(category);
        };

        vm.move = function (category) {
            categoryDataModel.move(category);
            moveCalled = true;
        };

        vm.edit = function (category) {
            isNewRow = false;
            lastClickedID = commonModel.getRowID(category);
            reportRowType = accountCategoryRowModel.getReportRowType(category);
            if (accountCategoryRowModel.isEditable(reportRowType)) {
                categoryFormModel.updateEditData(category);
                categoryModel.updateEditData(category, reportRowType);
                vm.bindCategoryData(category);
            }
        };

        vm.showFormErrors = function () {
            vm.form.setTouched();
        };

        vm.hideFormErrors = function () {
            vm.form.setPristine().setUntouched();
        };

        vm.bindCategoryData = function (category) {
            categoryFormModel.bindCategoryData(category, categoryDataModel.getAccountCategoryList());
            if (commonModel.isRefCategory(category)) {
                categoryFormModel.loadAccountCategory(categoryDataModel.getAccountCategoryList());
            }
        };

        vm.resetFormData = function (resetType) {
            if (resetType) {
                reportRowType = "";
                isNewRow = false;
                categoryModel.updateSlideState(false);
            }
            categoryFormModel.resetFormData(resetType, categoryDataModel.getAccountCategoryList());
        };

        vm.saveRow = function () {
            if (categoryFormModel.isDataValid(reportRowType)) {
                var newdata = {};
                var obj = {
                    isNewRow: isNewRow,
                    uniqID: uniqID,
                    chartID: chartID,
                    groupNumber: groupNumber,
                    reportRowType: reportRowType,
                    groupState: categoryModel.getGroupState(),
                    categoryRecords: categoryDataModel.getAccountCategoryRecords(),
                    lastClickedID: lastClickedID,
                    newdata: newdata
                };
                var returnData = categoryFormModel.saveRow(obj);
                vm.assignUniqGroupNumber(returnData);
                vm.saveNewRow(isNewRow, returnData.newRow);
            }
            else {
                vm.showFormErrors();
            }
        };

        vm.saveNewRow = function (isNewRow, newData) {
            if (isNewRow) {
                vm.addRow(newData);
            }
            categoryDataModel.updateSeqLevel();
            vm.resetFormData(true);
            vm.hideFormErrors();
        };

        vm.addRow = function (data) {
            if (commonModel.isRowClicked(lastClickedID)) {
                var lastClickedRow = categoryDataModel.getLastClickedRow(lastClickedID);
                categoryDataModel.addSectionRow(data, lastClickedRow, reportRowType);
                vm.checkHeaderRow(data);
            }
        };

        vm.checkHeaderRow = function (data) {
            if (accountCategoryRowModel.isHeader(commonModel.getRowType(data))) {
                vm.addSubTotalRow(data);
            }
        };

        vm.addSubTotalRow = function (data) {
            uniqID++;
            var newdata = angular.copy(data);
            categoryFormModel.updateHeaderRow(newdata, uniqID, chartID);
            categoryDataModel.addSubTotalRow(data, newdata);
        };

        vm.onRowClick = function (category) {
            lastClickedID = category.id;
        };

        vm.delcat = function (ReportRow) {
            if (accountCategoryRowModel.isCategory(commonModel.getRowType(ReportRow)) && commonModel.getInUse(ReportRow)) {
                commonModel.showDelMsg(false);
            }
            else if (accountCategoryRowModel.isCategory(commonModel.getRowType(ReportRow))) {
                vm.deleteCatRow(ReportRow);
            }
            else {
                vm.deleteOtherRows(ReportRow);
            }
        };

        vm.deleteOtherRows = function (ReportRow) {
            var delRowType = commonModel.getRowType(ReportRow);
            if (accountCategoryRowModel.isHeader(commonModel.getRowType(ReportRow))) {
                commonModel.setStateOpen(ReportRow, false);
                vm.toggle(ReportRow);
            }
            vm.removeFromList(ReportRow);
        };

        vm.deleteCatRow = function (ReportRow) {
            if (!categoryDataModel.isReferd(ReportRow)) {
                vm.removeFromList(ReportRow);
            }
        };

        vm.removeFromList = function (ReportRow) {
            categoryDataModel.removeFromList(ReportRow);
            lastClickedID = 0;
        };

        vm.addNonFormRow = function (rType) {
            uniqID++;
            categoryModel.updateSlideState(false);
            var data = commonModel.getNonFormRow(rType, uniqID, chartID);
            vm.addRow(data);
            categoryDataModel.updateSeqLevel();
        };

        vm.toggle = function (category) {
            commonModel.toggleStateOpen(category);
            commonModel.toggle(category, categoryDataModel.getAccountCategoryList());
        };

        vm.showRowMenuOptions = function () {
            categoryModel.toggleMenuIsOn();
            timeout(vm.callTimeout);
        };

        vm.callTimeout = function () {
            if (categoryModel.isMenuIsOn()) {
                vm.bindMenuClick();
            }
        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.hideMenu = function () {
            $scope.$apply(function () {
                categoryModel.setMenuIsOn(false);
                vm.unbindMenuClick();
            });
        };

        vm.accountTypeList = function () {
            var promise = vm.getAccntTypePromise();
            promise.then(vm.bindAccountTypeData, categoryModel.getAccntTypeFailure);
        };

        vm.getAccntTypePromise = function () {
            return categoriesSVC.getAccountTypeList().$promise;
        };

        vm.bindAccountTypeData = function (acctype) {
            categoryFormModel.updateAccountTypeData(acctype);
        };

        vm.hideCategoryForm = function () {
            categoryModel.updateSlideState(false);
            vm.resetFormData(true);
            vm.hideFormErrors();
        };

        vm.viewCategoryOptions = function (selType) {
            reportRowType = selType;
            isNewRow = true;
            lastClickedID = categoryDataModel.getLastClickedID(lastClickedID);
            if (commonModel.isRowClicked(lastClickedID)) {
                vm.viewRowOptions(selType);
            }
        };

        vm.viewRowOptions = function (selType) {
            categoryModel.viewCategoryOptions(selType);
            categoryFormModel.updateIntialFormData(selType);
            vm.resetFormData(false);
            categoryModel.updateText(true, false);
            categoryFormModel.fillFormObjects(selType);
        };

        vm.toggleImportCategory = function () {
            categoryModel.toggleImportCategory(chartID);
        };

        vm.init();
    }

    angular.module("budgeting")
        .controller('BdgtGlAccountCategoryCtrl', [
            'rpWizardNavModel',
            '$stateParams', 'accountCategoryModel',
            'categoriesSVC', '$scope', '$timeout', 'accountCategoryCommon', 'importCategoryModel', 'accountCategoryData', 'accountCategoryForm', 'accountCategoryRow', 'rpFormManager',
            BdgtGlAccountCategoryCtrl]);
})(angular);
