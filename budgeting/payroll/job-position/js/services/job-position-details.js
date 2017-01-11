(function () {
    "use strict";

    function service($resource) {
        var svc = {},
            rootUrl = "/api/budgeting";

        svc.url = {
            jobPositionList: rootUrl + "/expenses/payroll/distribute:distributeID/property/:propertyID/propertyjobposition",
            jobPositionDetails: rootUrl + "/expenses/payroll/jobposition/:jobPositionID/property/:propertyID/propertyjobposition",
            updateJobPosition: rootUrl + "/expenses/payroll/jobposition/:jobPositionID/property/:propertyID/positioncount/:employeeCount/propertyjobposition"
        };

        svc.requests = {
            jobPositionList: null,
            jobPositionDetails: null,
            updateJobPosition: null
        };

        svc.getJobPositionListReq = function(distributeID, propertyID) {
            var params = {
                    distributeID: distributeID,
                    propertyID: propertyID
                },
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(svc.url.jobPositionList, params, actions).get();            
        };
        svc.getJobPositionList  = function (distributeID, propertyID) {
            svc.requests.jobPositionList = svc.getJobPositionListReq(distributeID, propertyID);
            return svc.requests.jobPositionList.$promise;
        };

        svc.getJobPositionDetailsReq = function(propertyID, jobPositionID) {
            var params = {
                    propertyID: propertyID,
                    jobPositionID: jobPositionID
                },
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(svc.url.jobPositionDetails, params, actions).get();            
        };
        svc.getJobPositionDetails = function (propertyID, jobPositionID) {
            svc.requests.jobPositionDetails = svc.getJobPositionDetailsReq(propertyID, jobPositionID);
            return svc.requests.jobPositionDetails.$promise;
        };

        svc.setJobPositionDetailsReq = function(propertyID, jobPosDetails) {
            var params = {
                    propertyID: propertyID,
                    jobPositionID: jobPosDetails.jobPositionID,
                    employeeCount: jobPosDetails.employeesCount                    
                },
                actions = {
                    put: {
                        method: "PUT",
                        cancellable: true
                    }
                };

            return $resource(svc.url.updateJobPosition, params, actions).put();            
        };
        svc.setJobPositionDetails = function (propertyID, jobPosDetails) {
            svc.requests.updateJobPosition = svc.setJobPositionDetailsReq(propertyID, jobPosDetails);
            return svc.requests.updateJobPosition.$promise;
        };


        svc.cancelRequests = function() {
            angular.forEach(svc.requests, function(currReq) {
                if(currReq !== null) {
                    currReq.$cancelRequest();
                    currReq = null;
                }
            });
        };
        
        
        return svc;
    }

    angular
        .module("budgeting")
        .factory("jobPosDetailsSvc", [
            "$resource",
            service
        ]);
})();
