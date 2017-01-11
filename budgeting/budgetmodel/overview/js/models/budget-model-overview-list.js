//  Budgeting Overview List Model

(function (angular) {
    "use strict";

    function BdgtOverviewListModel($filter, langTranslate, bdgtModelOverviewSvc) {
        var translate;
        translate = langTranslate('BdgtModelOverview').translate;

        var model = {};
        model.emptyData = {
            distID: 0,
            catHeading: "",
            submitTxt: translate('bdgt_model_overview_submit_txt'),
            approveTxt: translate('bdgt_model_overview_approve_txt'),
            rejectTxt: translate('bdgt_model_overview_reject_txt'),
            workflowTxt: translate('bdgt_model_overview_workflow_txt'),
            commentsTxt: translate('bdgt_model_overview_comments_txt'),
            cancelTxt: translate('bdgt_model_overview_cancel_txt'),
            currencySymbol: translate('currency_symbol'),
            settingsText: "",

        };

        model.form = {};

        angular.copy(model.emptyData, model.form);

        model.listData = [];

        model.isLink = function (data) {
            return data.url !== undefined;
        };

        model.setLabelText = function (data) {
            if (data.budgetType == "Budget") {
                model.setTextByType(translate('bdgt_model_overview_heading'), translate('bdgt_model_overview_settings_text'));
            }
            else if (data.budgetType == "Forecast") {
                model.setTextByType(translate('bdgt_model_overview_Forecast_heading'), translate('bdgt_model_overview_Forecast_settings_text'));
            }
            else if (data.budgetType == "Proforma") {
                model.setTextByType(translate('bdgt_model_overview_Proforma_heading'), translate('bdgt_model_overview_Proforma_settings_text'));
            }
        };

        model.setTextByType = function (text, link) {
            model.form.catHeading = text;
            model.form.settingsText = link;
        };

        model.setDistID = function (id) {
            model.form.distID = id;
        };

        model.getSectionDrivers = function () {
            var params = {
                distID: model.form.distID
            };
            return bdgtModelOverviewSvc.getSectionDrivers(params).$promise;
        };

        model.setSectionDrivers = function (resp) {
            var listDataArr = [];
            resp.records.forEach(function (item) {
                listDataArr.push(item);
            });
            model.listData = listDataArr;
        };

        model.updateStatus = function (record) {
            if (record.status === 'Pending') {
                // service call to update this to active
                record.status = "In-Progress";
            }
            else if (record.status === 'In-Progress') {
                // service call to update this to Completed
                record.status = "Done";
            }
            else if (record.status === 'Done') {
                // service call to update this to Inactive
                record.status = "Pending";
            }
        };

        model.updateSubStatus = function (item, record) {
            if (item.status === 'Pending') {
                // service call to update this to active
                item.status = "In-Progress";
            }
            else if (item.status === 'In-Progress') {
                // service call to update this to Completed
                item.status = "Done";
            }
            else if (item.status === 'Done') {
                // service call to update this to Inactive
                item.status = "Pending";
            }
            model.updateParentStatus(record);
            var params = {
                "distributedID": model.form.distID,
                "driverID": item.driverID,
                "status": item.status
            };
            return bdgtModelOverviewSvc.updateDriverStatus(params).$promise;
        };

        model.updateParentStatus = function (record) {
            var status = '';
            if (model.isRecordStatusInactive(record)) {
                status = 'Pending';
            }
            if (model.isRecordStatusActive(record) && status === '') {
                status = 'In-Progress';
            }
            if (model.isRecordStatusComplete(record) && status === '') {
                status = 'Done';
            }
            record.status = status;
            //Service call to update parent record status
        };

        model.isRecordStatusInactive = function (record) {
            var items = $filter('filter')(record.sectionDrivers, function (d) {
                return d.status == "In-Progress" || d.status == "Done";
            });
            if (items.length === 0) {
                return true;
            }
            return false;
        };

        model.isRecordStatusActive = function (record) {
            var items = $filter('filter')(record.sectionDrivers, function (d) {
                return d.status == "In-Progress" || d.status == "Pending";
            });
            if (items.length > 0) {
                return true;
            }
            return false;
        };

        model.isRecordStatusComplete = function (record) {
            var items = $filter('filter')(record.sectionDrivers, { status: 'Done' }, false);
            if (items.length > 0 && record.sectionDrivers.length === items.length) {
                return true;
            }
            return false;
        };

        model.setRouteUrl = function (drivers, distID, isDisplay, type, categoryCode) {
            if (isDisplay && type !== "header") {
                return model.switchToDrivers(drivers, distID, categoryCode);
            }
            else if (!isDisplay && type === "header") {
                return model.switchToDrivers(drivers, distID, categoryCode);
            }
            return {};
        };


        model.switchToDrivers = function (drivers, distID, categoryCode) {
            var routeName = "",
                params = {
                    distID: distID
                };
            switch (categoryCode) {
                case "MR":
                    routeName = "rentalincome.marketrent";
                    params.rent = "marketrent";
                    break;
                case "AR":
                    routeName = "rentalincome.marketrent";
                    params.rent = "actualrent";
                    break;
                case "LGL":
                    routeName = "";
                    break;
                case "RENOVATION":
                    routeName = "";
                    break;
                case "OCCUPENCY":
                    routeName = "occupancyRenewals.summary";
                    break;
                case "CAPEX":
                    routeName = "";
                    break;
                case "HR":
                    routeName = "payroll.summary";
                    break;
                case "CONT":
                    routeName = "";
                    break;
                case "SERV":
                    routeName = "services.manage";
                    break;
                case "AL":
                    routeName = "allocations.manageAllocations";
                    break;
                case "OTHER":
                    routeName = "customWorksheets";
                    break;
                case "DA":
                    routeName = "defaultAdjustments";
                    break;
                case "ABA":
                    routeName = "accountByAccount.view";
                    break;
                default:
            }

            return {
                routeName: routeName,
                params: params
            };
        };     

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtOverviewListModel', [
            '$filter',
            'appLangTranslate',
            'BdgtModelOverviewSvc',
            BdgtOverviewListModel]);
})(angular);
