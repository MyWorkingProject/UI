//  Mastercharts Service

(function (angular) {
    "use strict";

    function rentOptionsSvc( $q, $http,$resource) {
        var svc = {}, url, deferred, actions, defaults = {}, prefix;

     

         function getRentOptions() {
            var url, actions, defaults;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/distribute/:distributedID/rentoptionmodel';
            defaults = {};   
            actions = {
                getData: {
                    method: 'GET',
                    params: {
                        distributedID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

         function saveRentOptions() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/propertymodelsetup/rentoptionmodel';
            actions = {
                save: {
                    method: 'PUT'

                }
            };
            return $resource(url, defaults, actions);
        }

      


        svc.getRentOptions = getRentOptions().getData;
        svc.saveRentOptions = saveRentOptions().save;
      


        return svc;

    }

    angular
        .module("budgeting")
        .factory('rentOptionsSvc', [
             '$q',
            '$http','$resource',
            rentOptionsSvc]);
})(angular);
