(function(angular) {
    "use strict";

    function factory($resource) {
        var svc = {},
            baseUrl = '/api/budgeting';

        function workSheetDetails() {
            var url = baseUrl + '/leasingrents/distribute/:distID/noofperiods/:noOfPeriods/occupancyleaserenwalsworksheet',
                defaults = {},
                actions = {};
            return $resource(url, defaults, actions);
        }

        function beginingOccupiedUnits() {
            var url = baseUrl + '/leasingrents/budgetmodelid/:budgetModelID/propertyID/:propertyID/beginningoccupiedunits',
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
            var url = baseUrl + '/leasingrents/saveoccupancyvacanyworksheetsettings',
                defaults = {},
                actions = {
                    'update': {
                        method: 'PUT'
                    }
                };
            return $resource(url, defaults, actions);
        }

        function getWorksheetDetails(params) {
            return workSheetDetails().get(params).$promise;
        }

        function getBeginingOccupiedUnits(params) {
            return beginingOccupiedUnits().get(params).$promise;
        }

        function saveWorksheetDetails(params, data) {
            return postworkSheetDetails().update(params, data).$promise;
        }

        function saveInoutoccupancy(data) {
            return postworkSheetInputOccupnacy().update(data).$promise;
        }
        svc.getWorksheetDetails = getWorksheetDetails;
        svc.getBeginingOccupiedUnits = getBeginingOccupiedUnits;
        svc.saveWorksheetDetails = saveWorksheetDetails;
        svc.saveInoutoccupancy = saveInoutoccupancy;
        return svc;
    }

    angular
        .module("budgeting")
        .factory("worksheetService", [
            "$resource",
            factory
        ]);
})(angular);