//Copy comments service
(function (angular) {
    'use strict';
    function copyCommentsSvc($resource) {
        var svc = {}, defaults = {};
        function getModelNames() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/distributed/:distributedID/property/:propertyID/budgetyear/:budgetYear/budgettype/:budgetType/copycommentbudgetmodel';
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        distributedID: 0,
                        propertyID: 0,
                        budgetYear: 0,
                        budgetType: 0
                    }
                }
            };
            return $resource(url, defaults, actions);
        }
        function postCopyComments(sourceDistributedID, destinationDistributedID) {
            var url, actions;
            url = '/api/budgeting/common/copycomments?sourceDistributedID=' + sourceDistributedID + '&destinationDistributedID=' + destinationDistributedID;
            actions = {
                postData: {
                    method: 'POST',
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.copyComments = postCopyComments;
        svc.getModelNames = getModelNames().getData;
        return svc;
    }

    angular
            .module('budgeting')
            .factory('copyCommentsSvc', ['$resource', copyCommentsSvc]);
})(angular);