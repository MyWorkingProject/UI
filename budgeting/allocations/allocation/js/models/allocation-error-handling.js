//Recall Distributed Allocation Error Handling
(function (angular) {
    'use strict';
    function factory(notificationModel) {
        var translate, model;
        model = {};
        //translate = recallDistAllocationsContent;
        model.showAllocationSuccess = function () {
            notificationModel.success("Allocation saved successfully.");
        };
        model.showAllocationError = function (message) {
            notificationModel.error(message);
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('allocationErrorHandling', [
           'notificationService',
            factory
        ]);
})(angular);