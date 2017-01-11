//  Payment Terms (Contract Activity) Grid
//  Responsible for combining the configuration and behavior of payment terms grid

(function (angular) {
    "use strict";

    function gridFactory(gridConfig, gridActions, pageState, rpGridModel, i18n, moment, orderBy) {
        var grid = {},
            gridModel = null,
            noResultsMsg = i18n.translate("bdgt_contract_pt_grid_empty");

        grid.init = function () {
            grid.model = gridModel = rpGridModel();
            gridModel.subscribe("sortBy", grid.sortSchedule);
            gridModel.setConfig(gridConfig).setEmptyMsg(noResultsMsg);           

            return grid;
        };

         grid.initGridContent = function(pageStatus, vendorId, scheduleListJson) {
            grid.contractPageStatus = pageStatus;
            grid.vendorContractId = vendorId;

            //there might be existing schedules, load it
            if(grid.contractPageStatus === pageState.VIEW || grid.contractPageStatus === pageState.EDIT) {
                gridModel.setData({
                    totalRecords: scheduleListJson.length,
                    records: scheduleListJson
                });
            }
         };

        //populate grid with rows
        grid.populateGrid = function (response) {
            gridModel.setData(response.data).busy(false);
        };

        //add rows to an existing grid
        grid.appendToGrid = function (response) {
            gridModel.addData(response);
        };

        grid.addToGrid = function(schedule) {            
            // gridModel.addData({
            //     totalRecords: 1,
            //     records: [ schedule.getGridData() ]
            // });

            //append on top of the lsit
            gridModel.data.records.unshift(schedule.getGridData());
            gridModel.updateSelected();
            gridModel.paginationModel.updateState(1);
            gridModel.events.publish('ready');
        };

        grid.editGrid = function(schedule) {
            var gridContent = gridModel.getData();
            for(var i=0, max=gridContent.records.length; i<max; i++) {
                var curr = gridContent.records[i];
                if(curr.contractActivityID == schedule.model.id) {
                    gridContent.records[i] = schedule.getGridData();
                    break;
                }                
            }
        };

        //delete row
        grid.deletePaymentTerm = function (pt) {
            gridModel.deleteRow('contractActivityID', pt);
        };

        //sorting is done in the client side due to probable unsaved data. 
        grid.sortSchedule = function(sortOptions) {
            var gridContent = gridModel.busy(true).getData();
            if(gridContent && gridContent.records && gridContent.records.length > 1) {
                var sortCol = Object.keys(sortOptions)[0],
                    sortOrder = false;

                if(sortOptions[sortCol].toLowerCase() === "desc") {
                    sortOrder = true;
                }

                var getItemByType = function(obj) {
                    if(obj !== null) {
                        var val = obj[sortCol];
                        switch(sortCol) {
                            case "startDate":
                            case "endDate":
                                return moment(val, "MM/DD/YYYY");
                            case "amount":
                            case "total":
                                return parseFloat(val);
                            default:
                                return val;
                        }
                    }
                };

                gridContent.records = orderBy(gridContent.records, getItemByType, sortOrder);
                gridModel.setData(gridContent);
            }

            gridModel.busy(false);
        };

        grid.setSrc = function (controller) {
            gridConfig.setSrc(controller);
            gridActions.setSrc(controller);
        };

        grid.clear = function () {
            gridModel.flushData();
        };

        return grid.init();
    }

    angular
        .module("budgeting")
        .factory("paymentTermsGridModel", [
                "paymentTermsGridConfigModel",
                "paymentTermsActionsModel",
                "pageState",
                "rpGridModel",
                "contractTranslatorSvc",
                "moment",
                "orderByFilter",
                gridFactory
        ]);

})(angular);