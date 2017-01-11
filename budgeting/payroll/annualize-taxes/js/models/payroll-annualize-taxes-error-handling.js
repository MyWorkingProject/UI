(function (angular) {
    'use strict';
    function factory(langTranslate, notificationModel) {
        var translate, model;
        model = {};
        translate = langTranslate('annualizeTaxes').translate;
        model.showAnnualTaxSuccess = function () {
            notificationModel.success("Annualize Taxes saved successfully");
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('annualizeTaxesErrorHandling', [
           'appLangTranslate',
           'notificationService',
            factory
        ]);
})(angular);