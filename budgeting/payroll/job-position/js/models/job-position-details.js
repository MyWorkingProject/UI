// Job Position Details Model

(function (angular) {
    "use strict";

    function factory($filter) {
        var defaultData = {
            distributedID: 0,
            propertyID: 0,

            jobPositionID: 0,
            jobPositionTitle: "",
            department: "",
            workerClass: "",
            employeesCount: null,
            isLockCount: false, //value dependes on selected job position title

            jobPositionList: []
        };


        return function(bmDetails, jobPositionID) {
            var model = angular.copy(defaultData);

            model.distributedID = bmDetails.distributedID;
            model.propertyID = bmDetails.propertyID;

            if(jobPositionID !== null || jobPositionID !== undefined) {
                model.jobPositionID = jobPositionID;
            }

            model.setJobPosDetails = function(id) {
                var label = $filter("filter")(model.jobPositionList, { jobPositionID: id }, true);

                model.setDetails(label[0]);
            };

            model.setJobPositionList = function(list) {
                model.jobPositionList = list;
            };

            model.setDetails = function(jobDetails) {    
                model.jobPositionTitle = jobDetails.title;
                model.department = jobDetails.department;
                model.workerClass = jobDetails.workerClassName;
                model.employeesCount = jobDetails.positionCount;
                model.isLockCount = jobDetails.isLockCount;
            };

            model.getResponseData = function() {
                return {
                    jobPositionID: model.jobPositionID,
                    jobPositionTitle: model.jobPositionTitle,
                    department: model.department,
                    workerClass: model.workerClass,
                    employeesCount: model.employeesCount,
                    isLockCount: model.isLockCount
                };
            };

            model.destroy = function() {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory("jobPosDetailsModel", [
            "$filter",
            factory
        ]);

})(angular);