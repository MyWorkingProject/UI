//  Other options Service

(function (angular) {
    'use strict';

    function otherOptionsSvc($resource) {
        var svc = {}, url, actions, defaults = {};


        function saveOtherOptions() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/otheroptions'; 
            actions = {
                putData: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions);
        }

        function getOtherOptions() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/distribute/:distributedID/otheroptions';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        distributedID: 0
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        svc.saveOtherOptions = saveOtherOptions().putData;
        svc.getOtherOptions = getOtherOptions().get;
        return svc;

    }

    angular
        .module('budgeting')
        .factory('otherOptionsSvc', ['$resource',
            otherOptionsSvc]);
})(angular);