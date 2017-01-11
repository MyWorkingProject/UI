
(function (angular) {
    'use strict';

    function copyComments(budgetDetails,
        notificationModel,
        $filter,
        content) {
        var model = {};
        model.form = {};

        model.emptyData = {
            copyCommentsModelType: 'Budget',
            copyCommentsModelName: [],
            cpyModelName: '',
            modelNames: [
                {
                    'name': content.selectModelName,
                    'value': ''
                }
            ],
            isVisible: false,
            models: [
                        {
                            'name': content.selectBudget,
                            'value': 'Budget'
                        },
                        {
                            'name': content.selectProforma,
                            'value': 'Proforma'
                        },
                        {
                            'name': content.selectForecast,
                            'value': 'Forecast'
                        }
            ],
            distributedID: 0,
            propertyID: 0,
            budgetYear: '',
            budgetType: ''
        };

        model.init = function () {
            angular.copy(model.emptyData, model.form);
            model.form.distributedID = budgetDetails.getModelDetails().distributedID;
            model.form.propertyID = budgetDetails.getModelDetails().propertyID;
            model.form.budgetYear = budgetDetails.getModelDetails().budgetYear;
            model.form.budgetType = model.getBudgetType();
            return model;
        };

        model.getBudgetType = function () {
            return model.form.copyCommentsModelType;
        };

        model.assignModelNames = function (response) {

            angular.copy(model.emptyData.modelNames, model.form.modelNames);

            if (response.records && response.records.length > 0) {
                response.records.forEach(function (item) {
                    model.form.modelNames.push({ name: item.modelName, value: item.distributedID });
                });
            }

            return model.form.modelNames;
        };

        model.showSuccessMsg = function () {
            var found, selected, msg;
            found = $filter('filter')(model.form.modelNames, { value: model.form.cpyModelName });
            selected = found[0].name;
            msg = content.lblSuccessMsg + ' ' + selected; //from' + model.form.modelNames;
            notificationModel.success(msg);
        };

        return model.init();
    }

    angular
        .module('budgeting')
        .factory('copyCommentsModel', [
            'budgetDetails',
            'notificationService',
            '$filter',
            'copyCommentsContentModel',
             copyComments]);
})(angular);
