(function(angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function workSheetDetails() {
            var url = baseUrl + '/leasingrents/distribute/:distID/noofperiods/:noOfPeriods/servicegroupid/:serviceGroupID/occupancyleaserenwalserviceworksheet',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function ServiceGroupDetails() {
            var url = baseUrl + '/budgetmodel/propertymodelsetup/distribute/:distributedID/servicegrouplist',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function postworkSheetDetails() {
            var url = baseUrl + '/leasingrents/distribute/:distributedID/saveoccupancyvacanyworksheet',
                defaults = {},
                actions = {
                    'update': {
                        method: 'PUT'
                    }
                };
            return $resource(url, defaults, actions);
        }

        function postworkSheetInputOccupnacy() {
            var url = baseUrl + '/leasingrents/saveoccupancyvacanyservicesettings',
                defaults = {},
                actions = {
                    'update': {
                        method: 'PUT'
                    }
                };
            return $resource(url, defaults, actions);
        }

        function getSgWorksheetDetails(params) {
            return workSheetDetails().get(params).$promise;
        }

        function getSgServiceGroupDetails(params) {
            return ServiceGroupDetails().get(params).$promise;
        }

        function saveWorksheetDetails(params, data) {
            return postworkSheetDetails().update(params, data).$promise;
        }

        function saveInoutoccupancy(data) {
            return postworkSheetInputOccupnacy().update(data).$promise;
        }
        svc.getSgWorksheetDetails = getSgWorksheetDetails;
        svc.getSgServiceGroupDetails = getSgServiceGroupDetails;
        svc.saveWorksheetDetails = saveWorksheetDetails;
        svc.saveInoutoccupancy = saveInoutoccupancy;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("sgworksheetService", [
            "$resource",
            factory
        ]);
})(angular);