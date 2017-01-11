(function (angular) {
    "use strict";

    function factory(
        $q,
        budgetModelSvc) {
        var model = {},
            distributeID,
            propertyModelInfo,
            userBudgetWorkflow,
            ready;

        /**
         * check the data is exists for this dist ID & data is available
         * @param  {number}  _distID distributed ID
         * @return {Boolean}        
         */
        model.isReady = function (distID) {
            return ready && distributeID === distID;
        };

        /**
         * Load all property details by dist id, its called by resolver or call only when what to override
         * @param  {number} _distID distributed ID
         * @return {object}        promise
         */
        model.load = function (distID) {
            var defer = $q.defer();
            if (!model.isReady(distID)) {
                distributeID = distID;
                return model.forceLoad(defer);
            } else {
                defer.resolve();
            }
            return defer.promise;
        };

        /**
         * Force Load all property details by dist id, its called by resolver or call only when what to override
         * @param  {number} _distID distributed ID
         * @return {object}        promise
         */
        model.forceLoad = function (defer) {
            return budgetModelSvc
                .getPropertyModelDetails({
                    distID: distributeID
                })
                .then(function (response) {
                    model.setData(response.records);
                    if (defer) {
                        defer.resolve();
                    }
                });
        };

        /**
         * set driver details so that it can be reused
         * @param {object} 
         */
        model.setData = function (data) {
            propertyModelInfo = data.propertyModelInfo;
            userBudgetWorkflow = data.userBudgetWorkflow;
            ready = true;
            return model;
        };

        /**
         * Get Property Model Details
         * @return {object} 
         */
        model.getModelDetails = function () {
            return propertyModelInfo;
        };

        /**
         * Get User Budget Workflow
         * @return {object} 
         */
        model.getUserBudgetWorkflow = function () {
            return userBudgetWorkflow;
        };

        /**
         * Get Access Privileges for the budget model
         * @return {object} 
         */
        model.getAccessPrivileges = function () {
            var errorMessage = "",
                errorStatusCode = "";

            if (propertyModelInfo.isFinal) {
                errorMessage = "Finalized";
                errorStatusCode = "finalized";
            } else if (userBudgetWorkflow.accessType === "ReadOnly") {
                errorMessage = "Read Only";
                errorStatusCode = "read-only";
            }

            var allowReviewerComments = false;
            if (propertyModelInfo.isFinal || userBudgetWorkflow.accessType === "ReadOnly") {
                allowReviewerComments = false;
            } else if (userBudgetWorkflow.hasReviewerAccess) {
                allowReviewerComments = true;
            }

            return {
                allowEdit: !(propertyModelInfo.isFinal || userBudgetWorkflow.accessType !== "ReadWrite"),
                allowComments: !(propertyModelInfo.isFinal || userBudgetWorkflow.accessType === "ReadOnly"),
                allowReviewerComments: allowReviewerComments,
                errorMessage: errorMessage,
                errorStatusCode: errorStatusCode
            };
        };

        /**
         * Reset the model, mostly should not be called
         * @return {object} 
         */
        model.reset = function () {
            propertyModelInfo = {};
            userBudgetWorkflow = {};
            distributeID = 0;
            ready = false;
            return model;
        };

        return model.reset();
    }

    angular
        .module("budgeting")
        .factory('budgetDetails', [
            '$q',
            'budgetModelSvc',
            factory
        ]);
})(angular);
