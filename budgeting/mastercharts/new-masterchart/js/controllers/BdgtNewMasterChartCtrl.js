//  Home Controller

(function (angular) {
    "use strict";

    function BdgtNewMasterChartCtrl($scope, tableHeadModel, dataTableModel, appLangTranslate) {
        var page, translate;
        page = this;
        translate = appLangTranslate('admin').translate;
        page.init = function () {
            page.updateTopNav();
        };
        //var topnavmodel;
        page.updateTopNav = function () {
            page.topnavmodel = {
                "topnavlinks": {
                    "topTitle": "OneSite Settings",
                    "topLinks": [{
                        "linkName": translate('bdgt_cmpny_admin_header'),
                        "linkKey": "",
                        "href": "/app/admin"
								}, {
                        "linkName": translate('bdgt_admin_header'),
                        "linkKey": "",
                        "href": "#/admin"
								}, {
                        "linkName": translate('bdgt_admin_masterchart'),
                        "linkKey": "",
                        "href": "#/mastercharts/masterchartslist"
								}],
                    "topHighlight": {
                        "linkName": translate('bdgt_admin_newmasterchart'),
                        "linkKey": "",
                        "href": ""
                    }
                }
            };
        };
        page.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtNewMasterChartCtrl', ['$scope', 'rpTableHeadModel', 'rpDataTableModel', 'appLangTranslate', BdgtNewMasterChartCtrl]);
})(angular);
