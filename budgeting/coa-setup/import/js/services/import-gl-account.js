//  Import Gl Account Service

(function (angular) {
    "use strict";

    function importGlService($resource, $http, $q) {
        var defaults = {};

        function getChartData() {
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
            return $resource(url, defaults, actions).get;
        }

        function delStagingData() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/glaccountstaging';
            actions = {
                delete: {
                    method: 'DELETE',
                    params: {
                        chartID: 123456789
                    }
                }
            };
            return $resource(url, defaults, actions).delete;
        }

        function updateWizStep() {
            var url, actions;
            url = '/api/budgeting/common/wizard/wizardstatus';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function getProps() {
            var url, actions;
            url = '/api/budgeting/common/osapropertycombo';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function getGlAccs() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/property/:propID/osa/glaccount';
            actions = {
                post: {
                    method: 'POST',
                    params: {
                        chartID: 123456789,
                        propID: 0
                    }
                }
            };
            return $resource(url, defaults, actions).post;
        }

        function getAccTypes() {
            var url, actions;
            url = '/api/budgeting/coa/accounttype/accounttypecombo';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        var getStagingData = function () {
            var svc;
            svc = {};
            svc.abort =
                 function () {
                     if (svc.deferred) {
                         svc.deferred.resolve();
                         svc.deferred = undefined;
                     }
                     return svc;

                 };

            svc.get = function (chartID, data) {
                svc.deferred = $q.defer();

                return $http({
                    data: {},
                    method: 'GET',
                    url: '/api/budgeting/coa/masterchart/' + chartID + '/glaccountstaging' + data,
                    timeout: svc.deferred.promise
                });
            };


            return svc;
        };

        function saveGls() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/glaccountstaging/datasource/:src';
            actions = {
                post: {
                    method: 'POST',
                    params: {
                        chartID: 123456789,
                        src: 'osa'
                    }
                }
            };
            return $resource(url, defaults, actions).post;
        }

        function delGls() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/glaccountstaging/delete';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function getCsvTemp() {
            var url, actions;
            url = '/api/budgeting/common/csvtemplate/GetGLAccountTemplate';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function loadCSV() {
            var url, actions;
            url = '/api/budgeting/coa/csv/masterchart/:chartID/glaccount';
            actions = {
                put: {
                    method: 'PUT',
                    params: {
                        chartID: 123456789
                    },
                    transformRequest: angular.identity,
                    headers: {
                        'content-type': undefined
                    }
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function getYardiProp() {
            var url, actions;
            url = '/api/budgeting/rpx/system/:name/foreginproperty';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        name: 'yardi'
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function getYardiGls() {
            var url, actions;
            url = '/api/budgeting/coa/yardi/glaccount';
            actions = {
                post: {
                    method: 'POST'
                }
            };
            return $resource(url, defaults, actions).post;
        }

        function updateAccType() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/glaccountstaging/accounttype';
            actions = {
                put: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function getLrCharts() {
            var url, actions;
            url = '/api/budgeting/coa/lrmasterchart';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        var getLrProps = function () {
            var svc;
            svc = {};
            svc.abort =
                 function () {
                     if (svc.deferred) {
                         svc.deferred.resolve();
                         svc.deferred = undefined;
                     }
                     return svc;

                 };

            svc.get = function (selPropID) {
                svc.deferred = $q.defer();

                return $http({
                    data: {},
                    method: 'GET',
                    url: '/api/budgeting/coa/lrmasterchart/' + selPropID + '/lrmasterchartproperty',
                    timeout: svc.deferred.promise
                });
            };

            return svc;
        };

        function saveLrGls() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/lrmasterchart/:selPropID';
            actions = {
                put: {
                    method: 'PUT',
                    params: {
                        chartID: 123456789,
                        selPropID: ""
                    }
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function getImpStatus() {
            var url, actions;
            url = '/api/budgeting/coa/lrproperties/:props/importstatus';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        props: ''
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function getActiveImportOptions() {
            var url, actions;
            url = '/api/budgeting/common/companyfeatures';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        return {
            getChartData: getChartData(),
            delStagingData: delStagingData(),
            updateWizStep: updateWizStep(),
            getProps: getProps(),
            getGlAccs: getGlAccs(),
            getAccTypes: getAccTypes(),
            getStagingData: getStagingData,
            saveGls: saveGls(),
            delGls: delGls(),
            getCsvTemp: getCsvTemp(),
            loadCSV: loadCSV(),
            getYardiProp: getYardiProp(),
            getYardiGls: getYardiGls(),
            updateAccType: updateAccType(),
            getLrCharts: getLrCharts(),
            getLrProps: getLrProps,
            saveLrGls: saveLrGls(),
            getImpStatus: getImpStatus(),
            getActiveImportOptions: getActiveImportOptions()
        };
    }

    angular
        .module("budgeting")
        .factory('importGlService', ['$resource', '$http', '$q', importGlService]);
})(angular);
