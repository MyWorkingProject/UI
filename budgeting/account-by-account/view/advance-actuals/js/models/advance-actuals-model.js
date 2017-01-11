//  Advance actuals model

(function (angular) {
    'use strict';
    function advanceActuals(
        budgetDetails,
        content
            ) {
        var model = {};
        model.form = {};
        var translate;
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        model.emptyData = {
            advanceActuals: [],
            isVisible: false,
            adActuals: '',
            isVisibleAdvanceActuals: '',
            isFinal: true,
            isAllowActualThrough: true,
            isAdvanceActaulsEditable: true,
            lblAdvanceActualsYear: '',
            lblAdvanceActualsMonth: ''

        };

        model.init = function () {
            angular.copy(model.emptyData, model.form);
            return model;
        };

        model.setAdvanceActuals = function () {
            model.form.adActuals = budgetDetails.getModelDetails().actualThrough;
            model.form.advanceActuals = [];
            model.isAdvanceActaulsFormEditable();

        };

        model.isAdvanceActaulsFormEditable = function () {
            model.form.isFinal = budgetDetails.getModelDetails().isFinal;
            model.form.isAllowActualThrough = budgetDetails.getModelDetails().allowActualThrough;
            if (!model.form.isFinal && model.form.isAllowActualThrough) {
                model.form.isAdvanceActaulsEditable = true;
                model.form.adActuals = budgetDetails.getModelDetails().actualThrough;
            }
            else {
                model.form.isAdvanceActaulsEditable = false;
                model.assignAdvanceActualsForLabel();
            }
        };

        model.getAdvanceActuals = function () {
            var _startMonth, _startYear, _noofPer, _startMonthIndex, fromMonth, toMonth,
            advanceActuals = [];

            _startMonth = parseInt(budgetDetails.getModelDetails().startMonth - 1);
            _startYear = parseInt(budgetDetails.getModelDetails().budgetYear);
            _noofPer = parseInt(budgetDetails.getModelDetails().noOfPeriods);
            _startMonthIndex = 0;
            fromMonth = new Date(_startYear, -(11 - new Date().getMonth()), 1, 0);
            for (var j = 0; j < monthNames.length; j++) {
                if (monthNames[j] == monthNames[_startMonth]) {
                    _startMonthIndex = j;
                    break;
                }
            }
            toMonth = new Date(_startYear, _startMonthIndex + _noofPer - 1, 1, 0);
            while (toMonth >= fromMonth) {
                advanceActuals.push({ name: fromMonth.getFullYear() + ' ' + monthNames[fromMonth.getMonth()], value: fromMonth.getFullYear() + ' ' + monthNames[fromMonth.getMonth()] });
                fromMonth.setMonth(fromMonth.getMonth() + 1);
            }

            return advanceActuals;
        };

        model.assignAdvanceActualsForLabel = function () {
            model.form.lblAdvanceActualsYear = budgetDetails.getModelDetails().useActualThroughYear;
            model.form.lblAdvanceActualsMonth = monthNames[parseInt(budgetDetails.getModelDetails().useActualThroughMonth - 1)];
        };

        model.getFormDetails = function () {
            var selectedYM, selectedYear, selectedMonth;
            selectedYM = new Date(model.form.adActuals);
            selectedYear = selectedYM.getFullYear();
            selectedMonth = selectedYM.getMonth() + 1;
            var returnObj = {
                budgetModelID: budgetDetails.getModelDetails().budgetModelID,
                propertyID: budgetDetails.getModelDetails().propertyID,
                useActualThroughYear: selectedYear,
                useActualThroughMonth: selectedMonth,
                oldUseActualThroughYear: budgetDetails.getModelDetails().useActualThroughYear,
                oldUseActualThroughMonth: budgetDetails.getModelDetails().useActualThroughMonth,
            };
            return returnObj;
        };



        return model.init();
    }

    angular
        .module('budgeting')
        .factory('advanceActualsModel', [
            'budgetDetails',
            advanceActuals]);
})(angular);

