//  Default Adjustment List Service

(function (angular) {
    "use strict";

    function defaultAdjustmentList($q, $http, $resource) {
        var defaults = {};
        var svc = {}, getUrl;
        getUrl = '/api/budgeting/coa/masterchart/:chartID/categorydefaultadjestment';

        svc.abortGetCategoryData = function () {
            if (svc.getReq) {
                svc.getReq.resolve();
                svc.getReq = undefined;
            }
            return svc;

        };

        svc.getCategoryData = function (params,data) {
            var reqUrl = getUrl.replace(':chartID', params.chartID);
            svc.getReq = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: reqUrl + data,
                timeout: svc.getReq.promise
            });
        };

        function getChartName() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        chartID: 123456789
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function getAccTypes() {
            var url, actions;
            url = '/api/budgeting/coa/accounttype/accounttypecombo';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }

       /* function getCategoryData() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/categorydefaultadjestment';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        chartID: 1234789
                    }
                }
            };
            return $resource(url, defaults, actions);
        }*/

        function getBdgtModel() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/budgetmodelyear';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }

        function getModels() {
            var url, actions;
            url = '/api/budgeting/budgetmodel/budgetyear/:year/budgettype/:type/budgetmodelcombo';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        year: 2016,
                        type: 'Budget'
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function saveDefPer() {
            var url, actions;
            url = '/api/budgeting/coa/categorydefaultadjestment';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function applyBdgtmodel() {
            var url, actions;
            url = '/api/budgeting/coa/categorydefaultadjestment/apply';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }


        svc.getChartName = getChartName().get;
        svc.getAccTypes = getAccTypes().get;
        //getCategoryData: getCategoryData(),
        svc.getBdgtModel = getBdgtModel().get;
        svc.getModels = getModels().get;
        svc.saveDefPer = saveDefPer().put;
        svc.applyBdgtmodel = applyBdgtmodel().put;
        return svc;
    }

    angular
        .module("budgeting")
        .factory('defaultAdjustmentList', ['$q', '$http', '$resource', defaultAdjustmentList]);
})(angular);
