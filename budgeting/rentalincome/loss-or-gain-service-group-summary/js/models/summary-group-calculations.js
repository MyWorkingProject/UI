(function(angular) {
    'use strict';

    function factory(budgetDetails, $filter, worksheetData, constantModel) {
        var model = {},
            modelDetails;
        model.totals = {};
        model.rowValues = {};

        model.getValue = function(data, name, index) {
            var obj = model.getDataObject(data, name);
            return obj["period" + index];
        };

        model.getDataObject = function(data, name) {
            return $filter('filter')(data, { itemDescription: name }, true)[0];
        };

        model.getBudgetDetails = function() {
            modelDetails = budgetDetails.getModelDetails();
        };

        model.getObjectValueByPeriod = function(data, index, name) {
            var obj = $filter('filter')(data, { periodNumber: index }, true)[0];
            return obj[name];
        };

        model.RoundNumber = function(number, places) {
            if (isNaN(number)) {
                return 0;
            }
            if (Number.POSITIVE_INFINITY === number || Number.NEGATIVE_INFINITY === number) {
                return 0;
            }
            if (places === null) {
                places = 0;
            }
            var value = Math.round(number * Math.pow(10, places)) / Math.pow(10, places);

            return value;
        };

        return model;

    }

    angular
        .module('budgeting')
        .factory('sgworksheetCalculations', ['budgetDetails',
            '$filter',
            'sgworksheetData',
            'sgworksheetConstantModel', factory
        ]);
})(angular);