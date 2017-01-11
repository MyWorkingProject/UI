//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, $filter, breadcrumbs, impCatSvc) {
        var model, translate;
        translate = langTranslate('importCategory').translate;
        model = {};

        model.text = {
            showFilters: translate('bdgt_importCat_ShowFiltersText'),
            hideFilters: translate('bdgt_importCat_HideFiltersText'),
            pageHeading: translate('bdgt_importCat_pageHeadingText'),
            sourceText: translate('bdgt_importCat_sourceText'),
            srcOptionDef: translate('bdgt_importCat_srcOptionsDefText'),
            srcOptionAcc: translate('bdgt_importCat_srcOptionsAccText'),
            srcOptionCsv: translate('bdgt_importCat_srcOptionsCsvText'),
            selectProperty: translate('bdgt_importCat_selectPropertyText'),
            selectCSV: translate('bdgt_importCat_selectCSVText'),
            viewSpecText: translate('bdgt_importCat_viewSpecText'),
            csvTempText: translate('bdgt_importCat_csvTempText'),
            importFileText: translate('bdgt_importCat_importFileText'),
            loadBtnText: translate('bdgt_importCat_loadBtnText'),
            deleteBtnText: translate('bdgt_importCat_deleteBtnText'),
            ImportSaveBtnText: translate('bdgt_importCat_ImportSaveBtnText'),
            browseText: translate('bdgt_importCat_BrowseText'),
        };

        model.defData = {
            chartID: 0,
            wizard: false,
            srcOptions: {
                options: [{
                    "name": model.text.srcOptionDef,
                    "value": ""
                }, {
                    "name": model.text.srcOptionAcc,
                    "value": "OneSite Accounting"
                }, {
                    "name": model.text.srcOptionCsv,
                    "value": "CSV File"
                }]
            },
            selVal: "",
            selectCSV: false,
            showDataGrid: false,
            loadBtnClick: "",
            saveBtnClick: "",
            dwnldClick: "page.dwnloadCsvTemplate",
            propertyData: {
                options: [{
                    "propertyID": 0,
                    "propertyName": "-- Select Property --"
                }]
            },
            selectedPropertyID: 0,
            showPropertyData: false,
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: ''
            },
            files: false
        };

        model.form = {};
        angular.copy(model.defData, model.form);

        model.setChartID = function (id) {
            model.form.chartID = id;
        };

        model.getChartID = function () {
            return model.form.chartID;
        };

        model.getSelVal = function () {
            return model.form.selVal;
        };

        model.resetValsToDefault = function () {
            model.form.selectCSV = false;
            model.form.showPropertyData = false;
            model.form.showDataGrid = false;
            model.form.propertyData = {
                options: [{
                    "propertyID": 0,
                    "propertyName": "-- Select Property --"
                }]
            };
        };

        model.isAccSelection = function () {
            if (model.getSelVal() === "OneSite Accounting") {
                return true;
            }
            return false;
        };

        model.isCsvSelection = function () {
            if (model.getSelVal() === "CSV File") {
                return true;
            }
            return false;
        };

        model.setAccOperations = function () {
            model.form.loadBtnClick = "page.loadGlCategories";
            model.form.saveBtnClick = "page.saveGlAccounts";
            model.loadProperties();
        };

        model.setCsvOperations = function () {
            model.form.selectCSV = true;
            model.form.saveBtnClick = "page.saveGlAccountsCsv";
            model.form.loadBtnClick = "page.loadCSVData";
        };

        model.srcChangeUpdate = function () {
            model.resetValsToDefault();
            if (model.isAccSelection()) {
                model.setAccOperations();
            }
            else if (model.isCsvSelection()) {
                model.setCsvOperations();
            }
        };

        model.loadProperties = function () {
            return impCatSvc.getProps().$promise.then(model.updateProperties);
        };

        model.updateProperties = function (resp) {
            model.form.selectedPropertyID = 0;
            model.form.propertyData.options = model.form.propertyData.options.concat(resp.records);
            model.form.showPropertyData = true;
        };

        model.getCategoriesAcc = function () {
            var params = {
                propID: model.form.selectedPropertyID
            };
            return impCatSvc.getCategories(params).$promise;
        };

        model.loadFile = function (file) {
            var params = {
                chartID: model.getChartID()
            };
            var fd = new FormData();
            fd.append(file.name, file);
            return impCatSvc.loadFileData(params, fd).$promise;
        };

        model.getCsvTemplate = function () {
            return impCatSvc.getCsvTemplate().$promise;
        };

        model.saveCategories = function (type, data) {
            var params = {
                chartID: model.getChartID(),
                type: type
            };
            return impCatSvc.saveCategories(params, data).$promise;
        };

        model.updateBreadcrumbs = function () {
            var params = {
                chartID: model.getChartID()
            };
            return impCatSvc.updateCrumbs(params).$promise;
        };

        model.filterSvc = function (filt, data) {
            var modelSvc = {
                "totalRecords": 0
            };
            modelSvc.records = $filter('filter')(data.records, filt, false);
            modelSvc.totalRecords = modelSvc.records.length;
            return modelSvc;
        };

        model.reset = function () {
            angular.copy(model.defData, model.form);
        };

        model.setWizardVals = function (path) {
            if (path.indexOf('admin/coa/wiz') > 0) {
                model.form.wizard = true;
            }
            else {
                model.form.wizard = false;
                model.updateBreadcrumbs().then(model.setBreadCrumbs, model.updateBreadCrumbError);
            }
        };

        model.setBreadCrumbs = function (resp) {
            breadcrumbs.updateCurrent({
                text: resp.records[0].name
            });
        };

        model.postCalled = false;

        model.getPostCalled = function () {
            return model.postCalled;
        };

        model.setPostCalled = function (val) {
            model.postCalled = val;
        };

        model.selectCsvForm = function () {
            return model.form.selectCSV;
        };

        //model.getViewSpecData = function () {
        //    return model.text.viewSpecData;
        //};

        model.getSelectedProperty = function () {
            return model.form.selectedPropertyID;
        };

        model.isValidSelectedProperty = function () {
            if (model.getSelectedProperty() === 0) {
                return true;
            }
            return false;
        };

        model.getUploadedFile = function () {
            return model.form.files[0];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('importCategoryModel', [
            'appLangTranslate',
            '$filter',
            'rpBreadcrumbsModel',
            'importCategoryService',
            factory
        ]);
})(angular);
