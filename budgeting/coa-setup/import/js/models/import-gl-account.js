// GL Import Source Control Model

(function (angular) {
    "use strict";

    function factory(langTranslate, breadcrumbs, impGlSvc, $location, $filter) {
        var model, translate;
        translate = langTranslate('import').translate;
        model = {};

        model.text = {
            sourceTxt: translate('bdgt_import_src'),
            heading: translate('bdgt_import_heading'),
            next: translate('bdgt_import_next'),
            back: translate('bdgt_import_back')
        };

        model.emptyData = {
            chartID: 0,
            wizard: false,
            selVal: "",
            source: {
                options: [{
                        "name": translate('bdgt_import_select_src'),
                        "value": ""
                    }, {
                        "name": translate('bdgt_import_select_accounting'),
                        "value": "OneSite Accounting"
                    }, {
                        "name": translate('bdgt_import_select_lrc'),
                        "value": "OneSite Leasing & Rents"
                    }, {
                        "name": translate('bdgt_import_select_mri'),
                        "value": "MRI"
                    }, {
                        "name": translate('bdgt_import_select_yardi'),
                        "value": "Yardi"
                    }, {
                        "name": translate('bdgt_import_select_csv'),
                        "value": "CSV File"
                    }]
            },
            importFrom: {
                "OneSite Accounting": "/acc",
                "OneSite Leasing & Rents": "/lr",
                "MRI": "/mri",
                "Yardi": "/yardi",
                "CSV File": "/csv"
            },
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: ''
            }
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        model.setChartID = function (id) {
            model.form.chartID = id;
        };

        model.getChartID = function () {
            return model.form.chartID;
        };

        model.isWizardUpdate = function (path) {
            if (path.indexOf('admin/coa/wiz') > 0) {
                model.form.wizard = true;
            }
            else {
                model.form.wizard = false;
            }
        };

        model.getBreadcrumbs = function (id) {
            var params = {
                chartID: id
            };
            return impGlSvc.getChartData(params).$promise;
        };

        model.updateBreadCrumb = function (resp) {
            breadcrumbs.updateCurrent({
                text: resp.records[0].name
            });
        };

        model.getActiveImportOptions = function () {
            return impGlSvc.getActiveImportOptions().$promise;
        };

        model.getReqData = function () {
            return {
                "wizardType": "MasterChart",
                "referenceID": model.getChartID(),
                "stepID": 2
            };
        };

        model.updateActiveImportOptions = function (resp) {
            var notActiveItems = model.getNotActiveOptions(resp.records);
            angular.forEach(notActiveItems, function (item) {
                if (model.isItemAccounting(item.featureCode)) {
                    model.updateSrcOptions("!OneSite Accounting");
                }
                else if (model.isItemMri(item.featureCode)) {
                    model.updateSrcOptions("!MRI");
                }
                else if (model.isItemYardi(item.featureCode)) {
                    model.updateSrcOptions("!Yardi");
                }
            });
        };

        model.getNotActiveOptions = function (data) {
            return $filter('filter')(data, {
                active: false
            }, false);
        };

        model.isItemAccounting = function (feature) {
            if (feature === "Accounting") {
                return true;
            }
            return false;
        };

        model.isItemMri = function (feature) {
            if (feature === "MRI") {
                return true;
            }
            return false;
        };

        model.isItemYardi = function (feature) {
            if (feature === "Yardi") {
                return true;
            }
            return false;
        };

        model.updateSrcOptions = function (srcOption) {
            model.form.source.options = $filter('filter')(model.form.source.options, {
                value: srcOption
            }, false);
        };

        model.updateWizStep = function (data) {
            return impGlSvc.updateWizStep(data).$promise;
        };

        model.delStagingData = function () {
            var params = {
                chartID: model.getChartID()
            };
            return impGlSvc.delStagingData(params).$promise;
        };

        model.getselectedVal = function () {
            return model.form.selVal;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        model.loadNextView = function () {
            model.goToView(model.getImportFrom());
        };

        model.getImportFrom = function () {
            if (model.form.importFrom[model.getselectedVal()]) {
                return model.form.importFrom[model.getselectedVal()];
            }
            return "";
        };

        model.goToView = function (val) {
            if (model.isWizard()) {
                $location.path('/admin/coa/wiz/import/' + model.getChartID() + val);
            }
            else {
                $location.path('/admin/coa/import/' + model.getChartID() + val);
            }
        };

        model.isWizard = function () {
            return model.form.wizard;
        };

        model.isAccounting = function () {
            if (model.getselectedVal() === "OneSite Accounting") {
                return true;
            }
            return false;
        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('importGLModel', [
            'appLangTranslate', 'rpBreadcrumbsModel', 'importGlService', '$location', '$filter',
            factory
        ]);
})(angular);