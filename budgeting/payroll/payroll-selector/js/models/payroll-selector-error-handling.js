(function (angular) {
    'use strict';
    function factory(langTranslate, notificationModel) {
        var translate, model;
        model = {};
        translate = langTranslate('payrollEmpSelector').translate;
       
        return model;
    }
    angular
        .module('budgeting')
        .factory('payrollEmpSelectorErrorHandling', [
           'appLangTranslate',
           'notificationService',
            factory
        ]);
})(angular);