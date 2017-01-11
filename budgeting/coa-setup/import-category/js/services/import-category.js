//  Import Category Service

(function (angular) {
    "use strict";

    function importCategoryService($resource) {
        var defaults = {};

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

        function getCategories() {
            var url, actions;
            url = '/api/budgeting/coa/property/:propID/osa/accountcategoryimport';
            actions = {
                get: {
                    method: 'GET',
                    params: {
                        propID: 0
                    }
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function loadFileData() {
            var url, actions;
            url = '/api/budgeting/coa/csv/masterchart/:chartID/accountcategory';
            actions = {
                put: {
                    method: 'PUT',
                    params: {
                        chartID: 1234789
                    },
                    transformRequest: angular.identity,
                    headers: {
                        'content-type': undefined
                    }
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function getCsvTemplate() {
            var url, actions;
            url = '/api/budgeting/common/csvtemplate/GetAccountCategoryTemplate';
            actions = {
                get: {
                    method: 'GET'
                }
            };
            return $resource(url, defaults, actions).get;
        }

        function saveCategories() {
            var url, actions;
            url = '/api/budgeting/coa/masterchart/:chartID/source/:type/accountcategoryimport';
            actions = {
                put: {
                    method: 'PUT',
                    params: {
                        chartID: 123456789,
                        type: 'osa'
                    }
                }
            };
            return $resource(url, defaults, actions).put;
        }

        function updateCrumbs() {
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

        return {
            getProps: getProps(),
            getCategories: getCategories(),
            loadFileData: loadFileData(),
            getCsvTemplate: getCsvTemplate(),
            saveCategories: saveCategories(),
            updateCrumbs: updateCrumbs()
        };
    }

    angular
        .module("budgeting")
        .factory('importCategoryService', ['$resource', importCategoryService]);
})(angular);
