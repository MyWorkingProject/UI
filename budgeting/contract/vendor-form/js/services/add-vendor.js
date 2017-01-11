//  Mastercharts Service

(function (angular) {
    'use strict';

    function factory($resource) {
        var svc = {}, defaults = {};
        function getStatesData() {
            var url, actions;
            url = '/api/budgeting/common/state/pmcstates';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }
        function addVendorDetails() {
            var url, actions;
            url = '/api/budgeting/expenses/vendor';
            actions = {
                    postData: {
                    method: 'POST'
                }
            };
            return $resource(url, defaults, actions);
        }
        svc.getStatesData=getStatesData().get;
        svc.addVendorDetails = addVendorDetails().postData;
        return svc;
    }
    angular
        .module('budgeting')
        .factory('addVendorSVC', ['$resource', factory]);
})(angular);



