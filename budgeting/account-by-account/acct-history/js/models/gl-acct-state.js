
(function () {
    "use strict";

    function glHistoryStateFactory(glAcctDataType, rpBusyIndicatorModel) {

        var emptyStateData = {
            retries: {
                history: 0,
                comments: 0
            },
            isReady: false,
            hasData: false,
            isByPeriod: false,

            isCommentsReady: false,
            hasComments: false,
            showComments: true,

            isActualData: true //Actual Transactions Data vs Model Data
        };

        var state = {};

        state.data = angular.copy(emptyStateData);
        state.busyModel = new rpBusyIndicatorModel();
        state.MAX_SVC_RETRIES  = 1;

        state.retry = function() {
            state.data.retries.history++;
        };

        state.retryComments = function() {
            state.data.retries.comments++;
        };

        state.resetRetries = function() {
            state.data.retries.history = 0;
        };

        state.resetCommentRetries = function() {
            state.data.retries.comments = 0;
        };

        state.resetContents = function() {
            state.resetRetries();
            state.resetCommentRetries();
            state.showComments();
            state.noData();
            state.busy();
        };

        state.canRetryReq = function() {
            return state.data.retries.history < state.MAX_SVC_RETRIES;
        };

        state.canRetryCommentsReq = function() {
            return state.data.retries.comments < state.MAX_SVC_RETRIES;
        };

        state.reset = function() {
            state.data = angular.copy(emptyStateData);
        };

        state.ready = function() {
            state.data.isReady = true;
            state.busyModel.off();
        };

        state.hasData = function() {
            state.data.hasData = true;
        };

        state.noData = function() {
            state.data.hasData = false;
        };

        state.byPeriod = function() {
            state.data.isByPeriod = true;
        };

        state.isByPeriod = function() {
            return state.data.isByPeriod;
        };

        state.hasComments = function() {
            state.data.hasComments = true;
        };

        state.isCommentsReady = function() {
            state.data.isCommentsReady = true;
        };

        state.showComments = function() {
            state.data.showComments = true;
        };

        state.hideComments = function() {
            state.data.showComments = false;
        };

        state.isShowComments = function() {
            return state.data.showComments;
        };

        state.busy = function() {
            state.data.isReady = false;
            state.busyModel.busy();
        };

        state.setDataType = function(dataType) {
            var flag = false;
            if(glAcctDataType.isActualData(dataType)) {
                flag = true;
            }
            state.data.isActualData = flag;
        };

        state.isActualData = function() {
            return state.data.isActualData;
        };

        return state;
    }

    angular
        .module("budgeting")
        .factory("glHistoryState", [
            "glAcctDataType",
            "rpBusyIndicatorModel",
            glHistoryStateFactory
        ]);
})();