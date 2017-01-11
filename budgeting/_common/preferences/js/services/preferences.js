//  Budget Model service

(function (angular) {
    "use strict";

    function preferencesSVC($resource) {
       var svc = {}, url, deferred, actions, defaults = {}, prefix;

       function updatePreferences() {
            var url = '/api/budgeting/common/preference';
 
            actions = {
                update: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getPreferences() {
            url = '/api/budgeting/common/preference/:screenName';
            actions = {
                getPref: {
                    method: 'GET',
                     params: {
                        screenName: "dashBoardModels",
                       
                    }
                }
            };
            return $resource(url, defaults, actions);
        }  

       svc.updatePreferences = updatePreferences().update;
       svc.getPreferences = getPreferences().getPref;
        return svc;
    }

    angular.module("budgeting")
        .factory('preferencesSVC', [
            '$resource',
            preferencesSVC]);
})(angular);