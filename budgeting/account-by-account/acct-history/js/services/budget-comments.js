(function () {
    "use strict";

    function glHistorySvc($resource, $window) {
        var svc = {};

        svc.url = {
            budgetComments: "/api/budgeting/common/distribute/:distributedID/commentSource/AccountByAccount/commentsourceid/:commentSourceID/budgetcomments"
        };

        svc.requests = {
            budgetComments: null
        };

        svc.getCommentsReq = function(paramData) {
            var params = {
                distributedID: paramData.distributedID, //136,
                commentSourceID: paramData.glAcctNumber //"4010.000",
            };

            var url = svc.url.budgetComments,
                actions = {
                    get: {
                        method: "GET",
                        cancellable: true
                    }
                };

            return $resource(url, params, actions).get();
        };
        
        svc.getComments = function (paramData) {
            svc.requests.budgetComments = svc.getCommentsReq(paramData);
            return svc.requests.budgetComments.$promise;
        };
       

        svc.cancelRequests = function() {
            //cancel budget comment request
            if(svc.requests.budgetComments !== null) {
                svc.requests.budgetComments.$cancelRequest();
                svc.requests.budgetComments = null;
            }
        };
        
        
        return svc;
    }

    angular
        .module("budgeting")
        .factory("glHistoryBudgetCommentsSvc", [
            "$resource",
            "$window",
            glHistorySvc
        ]);
})();
