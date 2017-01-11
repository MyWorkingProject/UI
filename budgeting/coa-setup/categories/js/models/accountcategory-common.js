(function (angular, und) {
    "use strict";

    function factory(langTranslate, dialogSvc, $filter, accountCategoryRowModel, newMasterchartModel, $location) {
        var model, translate,
            options = {};
        translate = langTranslate('categories').translate;
        model = {};

        model.updateGLCatOption = function (item) {
            accountCategoryRowModel.updateGLCatOption(item);
        };

        model.isRefCategory = function (data) {
            if (model.getRowType(data) === "REF-CATEGORY") {
                return true;
            }
            return false;
        };

        model.updateData = function (categoriesData, uniqID, groupNumber) {
            var returnData = {};
            categoriesData.records.forEach(function (item) {
                uniqID++;
                item.id = uniqID;
                if (item.groupNumber !== "" && parseInt(item.groupNumber) > parseInt(groupNumber)) {
                    groupNumber = item.groupNumber;
                }
                model.updateGLCatOption(item);
            });
            returnData.uniqID = uniqID;
            returnData.groupNumber = groupNumber;
            //model.updateCOARowLevels(categoriesData);
            return returnData;
        };

        model.hideRows = function (seq, categoriesData, category) {
            var footerRow = $filter('filter')(categoriesData.records, function (d) {
                return d.groupNumber === category.groupNumber && d.rowType === "SUB-TOTAL";
            });
            var height = 0,
                minSeq = seq,
                maxSequence = 0;
            if (footerRow !== undefined && footerRow.length > 0) {
                maxSequence = footerRow[0].sequence;
            }
            for (var i = minSeq + 1; i <= maxSequence; i++) {
                var seqRow = $filter('filter')(categoriesData.records, function (d) {
                    return d.sequence === i;
                });
                if (seqRow[0] !== undefined) {
                    model.hideElements(seqRow);
                }
            }
        };

        model.hideElements = function (seqRow) {
            var element = angular.element($('#' + seqRow[0].id));
            element.css('height', '0');
            element.css('overflow', 'hidden');
            element.css('display', 'none');
        };

        model.showElements = function (seqRow) {
            var element = angular.element($('#' + seqRow[0].id));
            element.css('height', '');
            element.css('overflow', '');
            element.css('display', '');
        };

        model.hideChildRows = function (category, data) {
            if (!model.isStateOpen(category) && model.getRowType(category) === "HEADER") {
                model.hideRows(model.getSequence(category), data, category);
            }
        };

        model.showRowClickMsg = function () {
            var dialog = dialogSvc();
            dialog.update({
                type: 'warn',
                showCancel: true,
                showContinue: false,
                title: translate('bdgt_categories_Row_Click_msg'),
                question: '',
                info: translate('bdgt_categories_Row_Click_msg')
            });
            dialog.show();

        };

        model.showDelMsg = function (isRefr) {
            var dialog = dialogSvc();
            dialog.update({
                type: 'warn',
                showCancel: true,
                showContinue: false,
                title: translate('bdgt_categories_Cannot_Del_msg'),
                question: '',
                info: isRefr ? translate('bdgt_categories_Row_Ref_msg') : translate('bdgt_categories_Row_Use_msg')
            });
            dialog.show();
        };

        model.toggle = function (category, accountCategoryList) {
            var groupNumber = category.groupNumber;
            var footerRow = $filter('filter')(accountCategoryList.records, function (d) {
                return d.groupNumber === groupNumber && d.rowType === "SUB-TOTAL";
            });
            var height = 0,
                minSeq = category.sequence,
                maxSequence = 0;
            maxSequence = model.getMaxSeq(footerRow, accountCategoryList);
            for (var i = minSeq + 1; i <= maxSequence; i++) {
                model.updateToggle(accountCategoryList, category, i);
            }
        };

        model.getMaxSeq = function (footerRow, accountCategoryList) {
            var maxSequence = 0;
            if (footerRow !== undefined && footerRow.length > 0) {
                maxSequence = footerRow[0].sequence;
            }
            else {
                maxSequence = accountCategoryList.records.length;
            }
            return maxSequence;
        };

        model.updateToggle = function (accountCategoryList, category, seq) {
            var seqRow = $filter('filter')(accountCategoryList.records, function (d) {
                return d.sequence === seq;
            });
            if (seqRow[0] !== undefined) {
                if (seqRow[0].rowType === "HEADER") {
                    seqRow[0].groupState.open = category.groupState.open;
                }
                if (!category.groupState.open) {
                    model.hideElements(seqRow);
                }
                else {
                    model.showElements(seqRow);
                }
            }
        };

        model.getAccountCategoryRows = function (accountCategoryList) {
            var catRows = $filter('filter')(accountCategoryList.records, function (d) {
                return d.rowType === 'CATEGORY' && d.accountCategoryID > 0;
            });
            var accountCategoryData = {
                options: [{
                    "value": "",
                    "name": '-- Select category --'
                }]
            };
            catRows.forEach(function (item) {
                model.addCatItem(item, accountCategoryData);
            });

            return accountCategoryData;
        };

        model.getInitalAccountCategoryData = function () {
            var accountCategoryData = {
                options: [{
                    "value": "",
                    "name": '-- Select category --'
                }]
            };
            return accountCategoryData;
        };

        model.addCatItem = function (item, accountCategoryData) {
            var catItem = {
                "value": item.accountCategoryID,
                "name": item.displayText
            };
            accountCategoryData.options = accountCategoryData.options.concat(catItem);
        };

        model.getInitalAccountTypeData = function () {
            var accountTypeData = {
                options: [{
                    "value": "",
                    "name": '-- Select type --'
                }]
            };
            return accountTypeData;
        };

        model.isExistinDB = function (coaRow) {
            if (parseInt(coaRow.coaReportRowID) > 0) {
                return true;
            }
            else {
                return false;
            }
        };

        model.getRowType = function (coaRow) {
            return coaRow.rowType;
        };

        model.getGroupNumber = function (coaRow) {
            return coaRow.groupNumber;
        };

        model.isStateOpen = function (coaRow) {
            return coaRow.groupState.open;
        };

        model.setStateOpen = function (coaRow, val) {
            coaRow.groupState.open = val;
        };

        model.toggleStateOpen = function (coaRow) {
            coaRow.groupState.open = !coaRow.groupState.open;
        };

        model.getGroupState = function (coaRow) {
            return coaRow.groupState;
        };

        model.getSequence = function (coaRow) {
            return coaRow.sequence;
        };

        model.getRowID = function (coaRow) {
            return coaRow.id;
        };

        model.setDirtyBit = function (coaRow, val) {
            coaRow.dirtyBit = val;
        };

        model.getaccountTypeID = function (coaRow) {
            return coaRow.accountTypeID;
        };

        model.getaccountCategoryID = function (coaRow) {
            return coaRow.accountCategoryID;
        };

        model.getInUse = function (coaRow) {
            return coaRow.inUse;
        };

        model.isRowClicked = function (lastClickedID) {
            if (lastClickedID > 0 || lastClickedID === -1) {
                return true;
            }
            else {
                model.showRowClickMsg();
                return false;
            }
        };

        model.getNonFormRow = function (rType, uniqID, chartID) {
            var data = {};
            if (rType === "Break") {
                data = accountCategoryRowModel.getPageBreak(uniqID, chartID);
            }
            else {
                data = accountCategoryRowModel.getBlankRow(uniqID, chartID);
            }
            return data;
        };

        model.isGroupStateDefnd = function (category) {
            if (model.getGroupState(category) !== und) {
                return true;
            }
            else {
                return false;
            }
        };

        model.updateState = function () {
            if ($location.absUrl().indexOf('admin/coa/wiz') > 0) {
                newMasterchartModel.edit(true);
            }
            else if (!(newMasterchartModel.getEditState())) {
                newMasterchartModel.edit(false);
            }
            model.updateInEditChart();
        };

        model.updateInEditChart = function () {
            if ($location.absUrl().indexOf('editmasterchart') > 0) {
                newMasterchartModel.updateInEditChart(true);
            }
            else {
                newMasterchartModel.updateInEditChart(false);
            }
        };

        model.getNewChartModelState = function () {
            return newMasterchartModel.getState();
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('accountCategoryCommon', [
            'appLangTranslate', 'rpDialogModel', '$filter', 'accountCategoryRow', 'newMasterchartModel', '$location',
            factory
        ]);
})(angular);
