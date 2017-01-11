//  Mastercharts Service

(function (angular) {
    "use strict";

    function manageGLAccountsSvc($resource, $q, $http) {
        var svc = {}, url, deferred, actions, defaults = {},prefix;

        //function getMasterchartGlList() {
        //    url = '/api/budgeting/coa/masterchart/:masterChartID/glaccount';
        //    actions = {
        //        getData: {
        //            method: 'GET',
        //            params: {
        //                masterChartID: 1,
        //                propertyID: 1,
        //                datafilter: {}

        //            }
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}


        //function getPropertyGlList() {
        //    url = '/api/budgeting/coa/masterchart/:masterChartID/property/:propertyID/propertyglaccountlist';
        //    actions = {
        //        getData: {
        //            method: 'GET',
        //            params: {
        //                masterChartID: 1,
        //                propertyID: 1,
        //                datafilter: {}

        //            }
        //        }
        //    };
        //    return $resource(url, defaults, actions);
        //}




        svc.getMasterchartGlList = function (params,data) {
            url =  '/api/budgeting/coa/masterchart/:masterChartID/glaccount';

            var reqUrl = url.replace(':masterChartID', params.masterChartID);
            deferred = $q.defer();

            return $http({
                data: {},
                url: reqUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };


        svc.getPropertyGlList = function (params,data) {
            url = '/api/budgeting/coa/masterchart/:masterChartID/property/:propertyID/propertyglaccountlist';
            var reqUrl = url.replace(':masterChartID', params.masterChartID);
            var fUrl = reqUrl.replace(':propertyID', params.propertyId);
            deferred = $q.defer();

            return $http({
                data: {},
                url: fUrl + data,
                method: 'GET',
                timeout: deferred.promise
            });
        };


        function getAccTypes() {
            url = '/api/budgeting/coa/accounttype/accounttypecombo';
            actions = {
                getAccountTypeList: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions);
        }

        function saveGlAccount() {

            url = '/api/budgeting/coa/masterchart/glaccount';
            actions = {
                save: {
                    method: 'POST'

                }
            };
            return $resource(url, defaults, actions);

        }

        function updateGlAccount() {
            var url = '/api/budgeting/coa/masterchart/glaccount';

            actions = {
                updateGl: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function updatePropertyGlAccount() {
            var url = '/api/budgeting/coa/property/masterchart/glaccount';

            actions = {
                updatePropGlAcc: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }


        function getAccCategory() {

            var url = '/api/budgeting/coa/masterchart/:masterChartID/accounttype/:accountTypeID/accountcategorycombo';

            actions = {
                getAccCategoryList: {
                    method: 'GET',
                    params: {
                        masterChartID: 1,
                        accountTypeID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);
        }

        function updateGLAccountActions() {

            var url = '/api/budgeting/coa/masterchart/glaccountfield';

            actions = {
                updateGlActions: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function deleteGLAccount() {
            url = '/api/budgeting/coa/masterchart/glaccount/delete';
            actions = {
                delete: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }


        function getGlAccountGlById() {

            url = '/api/budgeting/coa/masterchart/:masterChartID/glaccount/:glAccountID';
            actions = {
                getMasterchartGl: {
                    method: 'GET',
                    params: {
                        masterChartID: 1,
                        glAccountID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);

        }
        function getPropertyGlByID() {
            //api/budgeting/coa/masterchart/1/property/1192422/glaccount/101
            url = '/api/budgeting/coa/masterchart/:masterChartID/property/:propertyID/glaccount/:glAccountID';
            actions = {
                getPropertyGl: {
                    method: 'GET',
                    params: {
                        masterChartID: 1,
                        propertyID: 1,
                        glAccountID: 1
                    }
                }
            };
            return $resource(url, defaults, actions);

        }

        function getMasterChartData() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        chartID: 123456
                    }
                }
            };

            return $resource(url, defaults, actions);
        }

        function moveGlToMasterChart() {
            //POST /coa/masterchart/glaccount/movetomasterchart
            url = '/api/budgeting/coa/masterchart/glaccount/movetomasterchart';
            actions = {
                moveToMasterChart: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }

        function updateWizStep() {
            url = '/api/budgeting/common/wizard/wizardstatus';
            actions = {
                post: {
                    method: 'PUT'
                }
            };
            return $resource(url, defaults, actions);
        }



        svc.getAccTypes = getAccTypes().getAccountTypeList;
        svc.saveGlAccount = saveGlAccount().save;
        svc.updateGlAccount = updateGlAccount().updateGl;
        svc.updatePropertyGlAccount = updatePropertyGlAccount().updatePropGlAcc;
        svc.getAccCategory = getAccCategory().getAccCategoryList;
        svc.updateGLAccountActions = updateGLAccountActions().updateGlActions;
        svc.deleteGLAccount = deleteGLAccount().delete;
        svc.getGlAccountGlById = getGlAccountGlById().getMasterchartGl;
        svc.getPropertyGlByID = getPropertyGlByID().getPropertyGl;
        svc.moveGlToMasterChart = moveGlToMasterChart().moveToMasterChart;
        svc.updateWizStep = updateWizStep().post;
        svc.getMasterChartData = getMasterChartData().get;

        return svc;

        //return {
        //    getMasterchartGlList: getMasterchartGlList(),
        //    getPropertyGlList: getPropertyGlList(),
        //    getAccTypes: getAccTypes(),
        //    saveGlAccount: saveGlAccount(),
        //    updateGlAccount: updateGlAccount(),
        //    updatePropertyGlAccount: updatePropertyGlAccount(),
        //    getAccCategory: getAccCategory(),
        //    updateGLAccountActions: updateGLAccountActions(),
        //    deleteGLAccount: deleteGLAccount(),
        //    getGlAccountGlById: getGlAccountGlById(),
        //    getPropertyGlByID: getPropertyGlByID(),
        //    moveGlToMasterChart: moveGlToMasterChart(),
        //    updateWizStep: updateWizStep(),
        //    getMasterChartData: getMasterChartData()
        //};


    }

    angular
        .module("budgeting")
        .factory('manageGLAccountsSvc', ['$resource',
             '$q',
            '$http',
            manageGLAccountsSvc]);
})(angular);
