
(function () {
    'use strict';

    function factory(actualGridConfig, modelGridConfig, glHistoryState, i18n, rpGridModel, rpGridTransformSvc) {
        var emptyData = {
            modalTitle: i18n.translate("gl_acct_history_hd"),
            subTitle: "",
            referenceData: null,

            bookType: "Accrual", //glBookType
            periods: [],
            comments: [],
            activePanel: 0,

            historyErrMsg: null,
            commentsErrMsg: null
        };

        var history = {};

        history.model = angular.copy(emptyData);

        history.setBookType = function(bookType) {
            history.model.bookType = bookType;
        };

        history.createBudgetRecord = function(glParameters) {
            var total = glParameters.getParamValue("periodValue");
            var newRecord = {
                balanceTotal: total,
                totalRecords: 1,
                glHistoryList: [{
                    itemDescription: glParameters.getParamValue("glAcctDescription"),
                    balance: total
                }],
                month: glParameters.getParamValue("month"),
                year: glParameters.getParamValue("year")
            };

            return newRecord;
        };

        history.initDisplay = function(isActualDataType, arr, glParameters){
            var periods = [];

            if(!isActualDataType) { //Budget Model no data instance
                var periodValue = glParameters.getParamValue("periodValue");
                console.debug("Period Value: " + periodValue);
                // console.debug("Total Balance: " + Math.round(arr[0].balanceTotal));

                if(arr && arr.length == 1) {
                    var balanceTotal = Math.round(arr[0].balanceTotal);
                    if(periodValue != balanceTotal) {
                        arr = [history.createBudgetRecord(glParameters)];
                        glHistoryState.hideComments();
                    }
                } else {
                    arr = [history.createBudgetRecord(glParameters)];
                    glHistoryState.hideComments();                    
                }
            }

            angular.forEach(arr, function(currPeriod) {
                //creates a grid configuration for each label
                if(!currPeriod.instantiateGrid) {
                    var grids = history.prepareGrid(isActualDataType, currPeriod);
                    currPeriod.grid =  grids.dataGrid;
                    currPeriod.totalGrid = grids.totalGrid;
                }

                periods.push(currPeriod);
            });

            history.model.activePanel = 0; //display initial group
            history.model.periods = periods;
        };

        history.prepareGrid = function(isActualDataType, currPeriod) {
            var grid = rpGridModel(),
                totalGrid = rpGridModel(),
                gridTransformSvc = rpGridTransformSvc(),
                gridConfig = null,
                totalGridConfig = null,
                totalRecords = [];

            if(isActualDataType) {
                gridConfig = actualGridConfig;
                totalGridConfig = actualGridConfig;

                // add total row
                totalRecords.push({
                    posted: i18n.translate("gl_grid_total"),
                    displayStr: "",
                    debit: currPeriod.debitTotal,
                    credit: currPeriod.creditTotal,
                    balance: currPeriod.balanceTotal
                });

                //format display string when applicable
                angular.forEach(currPeriod.glHistoryList, function(currGLHistory) {
                    if(currGLHistory.displayStr && currGLHistory.displayStr.length > 0) {
                        currGLHistory.expand = true;
                        currGLHistory.displayStr = currGLHistory.displayStr.split(" || ");
                    }
                });
            } else { //budget model
                gridConfig = modelGridConfig;
                totalGridConfig = modelGridConfig;

                //add total row
                totalRecords.push({
                    itemDescription: i18n.translate("gl_grid_total"),
                    balance: currPeriod.balanceTotal
                });
            }
            
            currPeriod.instantiateGrid = true;

            gridTransformSvc.watch(grid);
            grid.setConfig(gridConfig);
            grid.setData({
                records: currPeriod.glHistoryList
            });

            totalGrid.setConfig(totalGridConfig);
            totalGrid.setData({
                records: totalRecords
            });

            return {
                dataGrid: grid,
                totalGrid: totalGrid
            };
        };

        history.setTitle = function(isByPeriod, glParameters) {
            var year = glParameters.model.year,
                type = glParameters.getDataTypeLabel(),
                modalTitle = i18n.translate("gl_acct_history_hd");

            if(isByPeriod) {
                modalTitle += " - " + year + " " + glParameters.model.month;
            }

            history.model.modalTitle = modalTitle;
            history.model.subtitle = glParameters.model.glAcctNumber + " " + glParameters.model.glAcctDescription +
                " - " + year + " "  + type;
        };

        history.initComments = function(arr) {
            var comments = [];

            angular.forEach(arr, function(currComment) {
                if(!currComment.createdBy || currComment.createdBy.trim().length === 0) {
                    currComment.createdBy = "Anonymous";
                }
                comments.push(currComment);
            });

            history.model.comments = comments;
        };

        history.setHistoryErrMsg = function(msg) {
            history.model.historyErrMsg = msg;
        };

        history.setCommentsErrMsg = function(msg) {
            history.model.commentsErrMsg = msg;
        };

        history.resetContents = function() {
            history.model.periods = [];
        };

        history.reset = function() {
            angular.extend(history.model, emptyData);
        };

        return history;
    }

    angular
        .module("budgeting")
        .factory("glHistoryModel", [
            "glHistoryActualGridConfig",
            "glHistoryModelGridConfig",
            "glHistoryState",
            "glAcctTranslatorSvc",
            "rpGridModel",
            "rpGridTransform",
            factory
        ]);
})();

