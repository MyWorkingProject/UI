//  Custom Worksheet Service

(function(angular) {
    'use strict';

    function customWorksheetsSVC($resource) {
        var svc = {},
            baseUrl = "/api/budgeting";

        function accountTypeResources() {
            var url = baseUrl + '/coa/accounttype/accounttypecombo';
            return $resource(url, {}, {});
        }

        function accountCategoriesResource() {
            var url = baseUrl + '/coa/masterchart/:masterChartID/accounttype/:accountTypeID/accountcategorycombo';
            return $resource(url, {}, {});
        }

        function getAccountTypes() {
            return accountTypeResources().get().$promise;
        }

        function getAccountCategories(params) {
            return accountCategoriesResource().get(params).$promise;
        }

        svc.getAccountTypes = getAccountTypes;
        svc.getAccountCategories = getAccountCategories;
        svc.getCustomWorksheets = function() {
            return {
                records: [{
                    itemDescription: 'Adminstration Fee',
                    glAccountName: '45060 Lease',
                    period1: 0,
                    period2: 0,
                    period3: 0,
                    period4: 0,
                    period5: 0,
                    period6: 0,
                    period7: 0,
                    period8: 0,
                    period9: 0,
                    period10: 0,
                    period11: 0,
                    period12: 0,
                    total: 0,
                    accountTypeID: 1,
                    accountCategoryID: 823
                }, {
                    itemDescription: 'Application Fee Income',
                    glAccountName: '45010 Application',
                    period1: 0,
                    period2: 0,
                    period3: 0,
                    period4: 0,
                    period5: 0,
                    period6: 0,
                    period7: 0,
                    period8: 0,
                    period9: 0,
                    period10: 0,
                    period11: 0,
                    period12: 0,
                    total: 0,
                    accountTypeID: 1,
                    accountCategoryID: 823
                }, {
                    itemDescription: 'Concessions',
                    glAccountName: '40160 Rent Concessions',
                    period1: 0,
                    period2: 0,
                    period3: 0,
                    period4: 0,
                    period5: 0,
                    period6: 0,
                    period7: 0,
                    period8: 0,
                    period9: 0,
                    period10: 0,
                    period11: 0,
                    period12: 0,
                    total: 0,
                    accountTypeID: 1,
                    accountCategoryID: 823
                }, {
                    itemDescription: 'Asset Management Fee',
                    glAccountName: '68050 Asset Management',
                    period1: 0,
                    period2: 0,
                    period3: 0,
                    period4: 0,
                    period5: 0,
                    period6: 0,
                    period7: 0,
                    period8: 0,
                    period9: 0,
                    period10: 0,
                    period11: 0,
                    period12: 0,
                    total: 0,
                    accountTypeID: 3,
                    accountCategoryID: 803
                }, {
                    itemDescription: 'Carpet Cleaning - Turn Cost',
                    glAccountName: '57720 Contract/Services',
                    period1: 0,
                    period2: 0,
                    period3: 0,
                    period4: 0,
                    period5: 0,
                    period6: 0,
                    period7: 0,
                    period8: 0,
                    period9: 0,
                    period10: 0,
                    period11: 0,
                    period12: 0,
                    total: 0,
                    accountTypeID: 3,
                    accountCategoryID: 803
                }, {
                    itemDescription: 'Domo/Sales Force',
                    glAccountName: '52240 Computer Support',
                    period1: 0,
                    period2: 0,
                    period3: 0,
                    period4: 0,
                    period5: 0,
                    period6: 0,
                    period7: 0,
                    period8: 0,
                    period9: 0,
                    period10: 0,
                    period11: 0,
                    period12: 0,
                    total: 0,
                    accountTypeID: 3,
                    accountCategoryID: 803
                }]
            };
        };

        return svc;
    }

    angular
        .module('budgeting')
        .factory('customWorksheetsSVC', [
            '$resource',
            customWorksheetsSVC
        ]);
})(angular);
