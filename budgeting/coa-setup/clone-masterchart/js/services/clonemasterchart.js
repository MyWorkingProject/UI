//  import gl accounts List Data Service

(function (angular) {
    "use strict";

    /* function cloneMasterChartSvc($resource) {

         var defaults = {};

         function updateWizStep() {
             var url, actions;
             url = '/api/budgeting/common/wizard/wizardstatus';
             actions = {
                 post: {
                     method: 'PUT'
                 }
             };
             return $resource(url, defaults, actions);
         }

         function getMasterChartPropertyCloneList() {
             var url, actions;
             url = '/api/budgeting/coa/masterchart/clone/masterchartpropertyclonelist';
             actions = {
                 get: {
                     method: 'GET',
                     params: {
                         datafilter: {}
                     }
                 }
             };

             return $resource(url, defaults, actions);
         }

         function cloneMasterChart() {
             var url, actions;
             url = '/api/budgeting/coa/masterchart/clone/propertymasterchart';
             actions = {
                 post: {
                     method: 'PUT'
                 }
             };

             return $resource(url, defaults, actions);
         }

         return {
             getMasterChartPropertyCloneList: getMasterChartPropertyCloneList(),
             cloneMasterChart: cloneMasterChart(),
             updateWizStep: updateWizStep()
         };
     }  */

    function cloneMasterChartSvc($q, $http,$resource) {
        var svc, getUrl, postUrl, wizUrl;
        var defaults = {};
        svc = {};
        getUrl = '/api/budgeting/coa/masterchart/clone/masterchartpropertyclonelist';
        postUrl = '/api/budgeting/coa/masterchart/clone/propertymasterchart';
        wizUrl = '/api/budgeting/common/wizard/wizardstatus';
        svc.abortGet =
             function () {
                 if (svc.getReq) {
                     svc.getReq.resolve();
                     svc.getReq = undefined;
                 }
                 return svc;

             };

        svc.get = function (data) {
            svc.getReq = $q.defer();

            return $http({
                data: {},
                method: 'GET',
                url: getUrl + data,
                timeout: svc.getReq.promise
            });
        };

        function updateWizStep() {
            var url, actions;
            url = '/api/budgeting/common/wizard/wizardstatus';
            actions = {
                post: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function cloneMasterChart() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/clone/propertymasterchart';
            actions = {
                post: {
                    method: 'PUT'
                }
            };

            return $resource(url, defaults, actions);
        }

        svc.updateWizStep = updateWizStep().post;
        svc.cloneMasterChart = cloneMasterChart().post;

     /*   svc.abortPut =
        function () {
            if (svc.putReq) {
                svc.putReq.resolve();
                svc.putReq = undefined;
            }
            return svc;

        };

        svc.post = function (data) {
            svc.putReq = $q.defer();

            return $http({
                data: data,
                method: 'PUT',
                url: postUrl,
                timeout: svc.putReq.promise
            });
        };

        svc.updateWizStep = function (data) {
            svc.wizReq = $q.defer();

            return $http({
                data: data,
                method: 'PUT',
                url: wizUrl,
                timeout: svc.wizReq.promise
            });
        }; */


        return svc;
    }

    angular
        .module("budgeting")
        .factory('cloneMasterChartSvc', ['$q', '$http','$resource', cloneMasterChartSvc]);
})(angular);