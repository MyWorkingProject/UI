//  Home Controller

(function (angular) {
    "use strict";

    function BdgtImportGlAccountCtrl($scope, tableHeadModel, dataTableModel, appLangTranslate, selectMenu) {
        var imp, translate, options;
        imp = this;
        translate = appLangTranslate('admin').translate;
        imp.init = function () {
            imp.updateTopNav();
            imp.updateSource();
        };
        //var topnavmodel;
        imp.updateTopNav = function () {
            imp.topnavmodel = {
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
        imp.updateSource = function () {
            options = [{
                "name": "--Select Source--",
                "value": "select"
            }, {
                "name": "OneSite Accounting",
                "value": "OneSite Accounting"
            }, {
                "name": "OneSite Leasing & Rents",
                "value": "OneSite Leasing & Rents"
            }, {
                "name": "MRI",
                "value": "MRI"
            }, {
                "name": "Yardi",
                "value": "Yardi"
            }, {
                "name": "CSV File",
                "value": "CSV File"
            }];

            imp.source = {
                options: options,
                selected: options[0],
                updateLabel: true
            };
        };
        $scope.$watch('imp.source.selected', function (value) {
            if (value) {
                if (value.name === '--Select Source--') {
                    return;
                }
                if (value.name === 'OneSite Accounting') {
                    imp.loadProperties();
                }
            }
        });
        imp.loadProperties = function () {
            var propertyData = [{
                "value": "123456",
                "name": "South Duff Community Park"
				}, {
                "value": "789012",
                "name": "Big Sky Apartments"
				}];
            // imp.propertyData={}
        };
        imp.onSourceChange = function () {
            //service call to get properties data;
        };
        imp.publish = function () {
            alert('Hi Change event fired');
        };
        imp.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtImportGlAccountCtrl', ['$scope', 'rpTableHeadModel', 'rpDataTableModel', 'appLangTranslate', 'rpSelectMenuModel', BdgtImportGlAccountCtrl]);
})(angular);
