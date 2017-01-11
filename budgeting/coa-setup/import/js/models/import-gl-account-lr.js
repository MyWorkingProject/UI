//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate, impGlSvc, $filter) {
        var model, translate;
        translate = langTranslate('import').translate;
        model = {};

        model.text = {
            loadBtn: translate('bdgt_import_load'),
            deleteBtn: translate('bdgt_import_delete'),
            saveBtn: translate('bdgt_import_save'),
            showFilters: translate('bdgt_import_show_filter'),
            hideFilters: translate('bdgt_import_hide_filter'),
            importSecHeading: translate('bdgt_import_lrc_section_heading'),
            importSaveBtn: translate('bdgt_import_imprtSave_btn'),
            refreshBtn: translate('bdgt_import_refresh'),
            selectChartTxt: translate('bdgt_import_selectChart'),
            selectPropToSave: translate('bdgt_import_select_prop_to_save')
        };

        model.emptyData = {
            selectedPropertyID: "-- Select Chart --",
            propertyData: {
                options: [{
                    "masterChartName": "-- Select Chart --"
                }]
            },
            showLoadBtn: false,
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: ''
            },
            tooltipState: false
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        model.getCharts = function () {
            return impGlSvc.getLrCharts().$promise;
        };

        model.loadCharts = function () {
            return model.getCharts();
        };

        model.setChartOptions = function (resp) {
            var updatePropData = {
                options: [{
                    "masterChartName": "-- Select Chart --"
                }]
            };
            model.form.propertyData.options = updatePropData.options.concat(resp.records);
        };

        model.getProperties = function () {
            return impGlSvc.getLrProps().abort().get(model.form.selectedPropertyID);
        };

        model.saveGlAccs = function (chartID, props) {
            var params = {
                chartID: chartID,
                selPropID: model.form.selectedPropertyID
            };
            return impGlSvc.saveLrGls(params, props).$promise;
        };

        model.getStatus = function (props) {
            var params = {
                props: props
            };
            return impGlSvc.getImpStatus(params).$promise;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        model.showLoadBtn = function () {
            model.form.showLoadBtn = true;
        };

        model.hideLoadBtn = function () {
            model.form.showLoadBtn = false;
        };

        model.selectedPropertyIDForm = function () {
            return model.form.selectedPropertyID;
        };

        model.updateRefreshRecordsMessage = function (resp, data) {
            angular.forEach(data.records, function (ele) {
                var propList = $filter('filter')(resp.records, function (d) {
                    return d.propertyID === ele.propertyID;
                });
                if (propList.length > 0) {
                    model.updateMessageCol(propList[0], ele);
                }
            });
            return data;
        };

        model.updateMessageCol = function (obj, ele) {
            ele.importDate = obj.importDate;
            if (!obj.importDate || obj.importDate === 'null') {
                ele.importDate = '';
            }
            if (obj.message === 'Import not attempted') {
                ele.message = '';
            }
            else if (obj.message !== 'Import Queued' && obj.message !== 'Import successful' && obj.message !== 'Import not attempted') {
                ele.message = 'Import Failed';
            }
            else {
                ele.message = obj.message;
            }
        };

        model.updateRecordsMessage = function (resp) {
            angular.forEach(resp.records, function (ele) {
                model.updateMessageCol(ele, ele);
            });
            return resp;
        };

        model.getSelPropsToSave = function (data) {
            var selPropsList = $filter('filter')(data.records, {
                'selectedBit': true
            }, false);
            var selProps = [];
            angular.forEach(selPropsList, function (item) {
                var newItem = {
                    "propertyID": item.propertyID,
                    "parentSiteID": item.parentSiteID
                };
                selProps.push(newItem);
            });
            return selProps;
        };

        model.getRefreshSelProp = function (data) {
            var selPropsLr = '';
            angular.forEach(data, function (item) {
                selPropsLr = selPropsLr + item.propertyID + ',';
            });
            selPropsLr = selPropsLr.substring(0, selPropsLr.length - 1);
            return selPropsLr;
        };

        model.getSelectedPropertyIDForm = function () {
            if (model.form.selectedPropertyID === "-- Select Chart --") {
                return true;
            }
            return false;
        };
        model.updateToolTipState = function () {
            model.form.tooltipState = !model.form.tooltipState;
        };

        model.hideToolTipState = function () {
            model.form.tooltipState = false;
        };

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
        .factory('importGlLrModel', [
            'appLangTranslate',
            'importGlService',
            '$filter',
            factory
        ]);
})(angular);