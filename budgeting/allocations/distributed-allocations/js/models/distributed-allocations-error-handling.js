(function (angular) {
    'use strict';
    function factory(langTranslate, notificationModel) {
        var translate, model;
        model = {};
        translate = langTranslate('allocations.distributed-allocations').translate;
        model.showRecallDistAllocationSuccess = function () {
            notificationModel.success("Alloction recalled successfully");
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('distErrorHandling', [
           'appLangTranslate',
           'notificationService',
            factory
        ]);
})(angular);