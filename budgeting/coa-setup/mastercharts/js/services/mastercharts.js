//  Mastercharts Service

(function (angular) {
    "use strict";

    function masterChartsListSvc($resource, $q, $http) {
        var  url,  defaults = {};


        var svc = {},
           deferred, prefix;

        prefix = '/api/budgeting/coa/';



        svc.getMasterchartList = function (data) {
            url = '/api/budgeting/coa/masterchartlist';


            deferred = $q.defer();

            return $http({
                data: {},
                url: url + data,
                    method: 'GET',
                timeout: deferred.promise
            });
            };

        function deleteMasterChart() {
            var defaults, actions,
            url = '/api/budgeting/coa/masterchart/:masterchartId';

            defaults = {};
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        masterchartId: 1
                    }
                }
            };

            return $resource(url, defaults, actions);
        }


        function copyMasterChart() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:masterChartID/:isAlternativeCOA';
            actions = {
                putData: {
                    method: 'POST',
                    params: {
                        masterChartID: 1,
                        isAlternativeCOA: false
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        svc.deleteMasterChart = deleteMasterChart().delete;
        svc.copyMasterChart = copyMasterChart().putData;


        return svc;


        //function getMasterchartList() {
        //    var url, actions;
        //    url = '/api/budgeting/coa/masterchartlist';
        //    actions = {
        //        getData: {
        //            method: 'GET',
        //            params: {
        //                datafilter: {}
        //            }
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}

        //function deleteMasterChart() {
        //    var url, actions;
        //    url = '/api/budgeting/coa/masterchart/:masterchartId';
        //    actions = {
        //        delete: {
        //            method: 'DELETE',
        //            params: {
        //                masterchartId: 1
        //            }
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}



        //function copyMasterChart() {
        //    var url, actions;
        //    url = '/api/budgeting/coa/masterchart/:masterChartID/:isAlternativeCOA';
        //    actions = {
        //        putData: {
        //            method: 'POST',
        //            params: {
        //                masterChartID: 1,
        //                isAlternativeCOA: false
        //            }
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}

        //return {
        //    getMasterchartList: getMasterchartList(),
        //    deleteMasterChart: deleteMasterChart(),
        //    copyMasterChart: copyMasterChart()
        //};
    }

    angular
        .module("budgeting")
        .factory('masterChartsListSvc', ['$resource', '$q', '$http', masterChartsListSvc]);
})(angular);
