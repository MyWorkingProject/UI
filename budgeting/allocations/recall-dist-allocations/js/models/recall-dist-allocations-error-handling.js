//Recall Distributed Allocation Error Handling
(function (angular) {
    'use strict';
    function factory(recallDistAllocationsContent, notificationModel) {
        var translate, model;
        model = {};
        translate = recallDistAllocationsContent;
        model.showRecallDistAllocationSuccess = function () {
            notificationModel.success(translate.SuccessMessage);
        };
        model.showRecallDistAllocationError = function (message) {
            notificationModel.error(message);
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('recallDistErrorHandling', [
           'recallDistAllocationsContent',
           'notificationService',
            factory
        ]);
})(angular);