//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, $filter, impGlSvc) {
        var model, translate;
        translate = langTranslate('import').translate;
        model = {};

        model.text = {
            loadBtn: translate('bdgt_import_load'),
            imprtSecHead: translate('bdgt_import_section_heading'),
            deleteBtn: translate('bdgt_import_delete'),
            saveBtn: translate('bdgt_import_save'),
            showFilters: translate('bdgt_import_show_filter'),
            hideFilters: translate('bdgt_import_hide_filter'),
            importSaveBtn: translate('bdgt_import_imprtSave_btn'),
            propertyTxt: translate('bdgt_import_import_property'),
            chkImpCashAcc: translate('bdgt_import_chkLbl_impCashAcc'),
            chkImpBalAcc: translate('bdgt_import_chkLbl_impBalAcc'),
            chkretLedgCode: translate('bdgt_import_chkLbl_retLedgCode'),
            assgnTypeTxt: translate('bdgt_import_assgn_type'),
            assgnAccntType: translate('bdgt_import_assgn_accnt_type'),
            accntType: translate('bdgt_import_accnt_type'),
            assgn: translate('bdgt_import_assign'),
            cancelBtn: translate('bdgt_import_cancel'),
            browseBtn: translate('bdgt_import_browse'),
            viewSpecTxt: translate('bdgt_import_view_spec'),
            importSpecTxt: translate('bdgt_import_import_spec'),
            csvTemp: translate('bdgt_import_csv_template'),
            importFileTxt: translate('bdgt_import_import_file'),
            selectMRIchart: translate('bdgt_import_select_MRI_chart'),
            selectCsvSrc: translate('bdgt_import_select_csv_src'),
            selectGlToDel: translate('bdgt_import_select_gl_to_del'),
        };

        model.emptyData = {
            showLoadBtn: false,
            selectedPropertyID: 0,
            propertyData: {
                options: [{
                    "propertyID": 0,
                    "propertyName": "-- Select Property --"
                }]
            },
            filterOptions: [{
                "name": "All",
                "value": "All"
            }],
            selctedChartId: 0,
            selCharts: {
                options: [{
                    "propertyID": 0,
                    "propertyName": "-- Select Property --",
                    "entityID": ""
                }]
            },
            selAssgnType: "",
            srcAssgnType: {
                options: [{
                    "name": "-- Select Assign Type --",
                    "value": ""
                }]
            },
            toggleAsgnType: {
                state: {
                    open: false
                }
            },
            tooltipState: false,
            files: {}
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        model.getUploadedFile = function () {
            return model.form.files[0];
        };

        //model.loadProperties = function () {
        //    model.getProperties().then(model.loadPropOptions);
        //};

        model.getProperties = function () {
            return impGlSvc.getProps().$promise;
        };

        model.loadPropOptions = function (resp) {
            var updatePropData = {
                options: [{
                    "propertyID": 0,
                    "propertyName": "--Select Property--"
                }]
            };
            model.form.propertyData.options = updatePropData.options.concat(resp.records);
        };

        model.getGlAccs = function (chartID) {
            var params = {
                chartID: chartID,
                propID: model.form.selectedPropertyID
            };
            return impGlSvc.getGlAccs(params, '').$promise;
        };

        model.getFiltOptions = function () {
            return impGlSvc.getAccTypes().$promise;
        };

        model.updateFilters = function (data) {
            if (model.form.filterOptions.length === 1) {
                var accountTypes = model.getAccountTypeArray(data.records);
                model.form.filterOptions = model.form.filterOptions.concat(accountTypes);
            }
            return model.form.filterOptions;
        };

        model.getAccountTypeArray = function (records) {
            var accTypes = [];
            angular.forEach(records, function (item) {
                var newItem = { "name": item.name, "value": item.name };
                accTypes.push(newItem);
            });
            return accTypes;
        };

        model.updateAssgnTypes = function (data) {
            if (model.form.srcAssgnType.options.length === 1) {
                var assgnTypes = model.getAccountTypeArray(data);
                model.form.srcAssgnType.options = model.form.srcAssgnType.options.concat(assgnTypes);
            }
        };

        model.updateUnassignedType = function (resp) {
            var unassgn = [{
                "name": "Unassigned",
                "value": "unassigned"
            }];
            resp.records.concat(unassgn);
            return resp;
        };

        model.getStagingData = function (chartID, pg) {
            return impGlSvc.getStagingData().abort().get(chartID,pg);
        };

        model.saveGlAccs = function (chartID, src) {
            var params = {
                chartID: chartID,
                src: src
            };
            return impGlSvc.saveGls(params, '').$promise;
        };

        model.delGlAccs = function (selGls) {
            return impGlSvc.delGls(selGls).$promise;
        };

        model.getCsvTemplate = function () {
            return impGlSvc.getCsvTemp().$promise;
        };

        model.loadCSVFile = function (chartID, fileData) {
            var params = {
                chartID: chartID
            };
            var fd = new FormData();
            fd.append(fileData.name, fileData);
            return impGlSvc.loadCSV(params, fd).$promise;
        };

        model.getYardiProp = function () {
            var params = {
                name: 'yardi'
            };
            return impGlSvc.getYardiProp(params).$promise;
        };

        model.loadYardiProp = function () {
            return model.getYardiProp();
        };
        model.updateYardiProp = function (resp) {
            if (model.form.selCharts.options.length === 1) {
                model.form.selCharts.options = model.form.selCharts.options.concat(resp.records);
            }
        };

        model.getYardiAccs = function (chartID) {
            var data = {
                "masterChartID": chartID,
                "propertyID": model.form.selctedChartId,
                "entityID": model.getEntityID()
            };
            return impGlSvc.getYardiGls(data).$promise;
        };

        model.getEntityID = function () {
            return $filter('filter')(model.form.selCharts.options, { 'propertyID': model.form.selctedChartId })[0].entityID;
        };
        model.updateAccType = function (data) {
            return impGlSvc.updateAccType(data).$promise;
        };

        model.updateToolTipState = function () {
            model.form.tooltipState = !model.form.tooltipState;
        };

        model.hideToolTipState = function () {
            model.form.tooltipState = false;
        };

        model.getPropertyID = function () {
            return model.form.selectedPropertyID;
        };

        model.getModelFilterOptions = function () {
            return model.form.filterOptions;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
            model.grid = undefined;
        };

        model.showLoadBtn = function () {
            model.form.showLoadBtn = true;
        };

        model.hideLoadBtn = function () {
            model.form.showLoadBtn = false;
        };

        model.getYardiSelectedChartId = function () {
            return model.form.selctedChartId;
        };

        model.toggleAssignWorkFlow = function () {
            model.form.toggleAsgnType.state.open = !model.form.toggleAsgnType.state.open;
        };

        model.getSelAssgnType = function () {
            return model.form.selAssgnType;
        };

        model.selAssgnTypeIsEmpty = function () {
            if (model.form.selAssgnType === "") {
                return true;
            }
            return false;
        };

        model.isPropertyID = function (val) {
            if (model.form.selectedPropertyID === val) {
                return true;
            }
            return false;
        };

        model.isSelectedChartID = function (val) {
            if (model.form.selctedChartId === val) {
                return true;
            }
            return false;
        };

        //model.getDefaultFilter = function () {
        //    return { glAccountNumber: "", glAccountType: "All" };
        //};

        //model.getFilterObj = function (filt) {
        //    var filterOptions = model.getModelFilterOptions();
        //    if (filt.glAccountType && filt.glAccountType !== "" && angular.isNumber(filt.glAccountType)) {
        //        filt.glAccountType = $filter('filter')(filterOptions, { value: filt.glAccountType }, false)[0].name;
        //    }
        //    if (angular.equals({}, filt) || !filt.glAccountType) {
        //        filt.glAccountType = 'All';
        //    }
        //    if (filt.glAccountType === 'unassigned') {
        //        filt.glAccountType = '';
        //    }
        //    return filt;
        //};

        model.getSelGlsToAssgnTypeObj = function (data) {
            var selAccs = {
                "glAccountIDs": "",
                "glAccountType": ""
            };
            if (!model.selAssgnTypeIsEmpty()) {
                selAccs = model.attachGlsAndType(selAccs, data);
            }
            return selAccs;
        };

        model.attachGlsAndType = function (selAccs, data) {
            angular.forEach(data, function (item) {
                selAccs.glAccountIDs = item.glAccountID + "," + selAccs.glAccountIDs;
            });
            selAccs.glAccountIDs = selAccs.glAccountIDs.substring(0, selAccs.glAccountIDs.length - 1);
            selAccs.glAccountType = model.getSelAssgnType();

            return selAccs;
        };

        model.selAcssIsNotEmpty = function (accs) {
            if (accs.glAccountIDs !== "") {
                return true;
            }
            return false;
        };

        //model.setAssignTypeToData = function (data) {
        //    var selGls = model.getSelectedGlRecords(data);
        //    var selAssgnType = model.getSelAssgnType();
        //    angular.forEach(selGls, function (item) {
        //        item.glAccountType = selAssgnType;
        //        item.category = selAssgnType;
        //    });
        //};

        model.isHelpIconInfo = function () {
            return model.form.tooltipState;
        };

        model.setHelpIconInfo = function (flag) {
            model.form.tooltipState = flag;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('importGlAccModel', [
            'appLangTranslate',
            '$filter',
            'importGlService',
            factory
        ]);
})(angular);