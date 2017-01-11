(function(angular) {
    "use strict";

    function factory(
        $q,
        $filter,
        budgetModelSvc) {
        var model = {},
            driverList,
            distributeID,
            ready;

        /**
         * check the data is exists for this dist ID & data is available
         * @param  {number}  distID distributed ID
         * @return {Boolean}        
         */
        model.isReady = function(distID) {
            return ready && distributeID === distID;
        };

        /**
         * Resolve or Reject based on access
         * @param  {string} driverCode 
         * @param  {object} defer      
         */
        model.resolveAccess = function(driverCode, defer) {
            if (model.getUserHasAccessBy(driverCode)) {
                defer.resolve();
            } else {
                defer.reject();
            }
        };

        /**
         * Load all driver by dist id, its called by resolver or call only when what to override
         * @param  {number} distID distributed ID
         * @param  {string} driverCode 
         * @return {object}        promise
         */
        model.canUserAccess = function(distID, driverCode) {
            var defer = $q.defer();
            if (!model.isReady(distID)) {
                distributeID = distID;
                budgetModelSvc.getUserDriverAccess({
                        distID: distID
                    })
                    .then(function(response) {
                        model
                            .setData(response.records)
                            .resolveAccess(driverCode, defer);
                    });
            } else {
                model.resolveAccess(driverCode, defer);
            }
            return defer.promise;
        };

        /**
         * set driver details so that it can be reused
         * @param {object} 
         */
        model.setData = function(drivers) {
            driverList = drivers;
            ready = true;
            return model;
        };

        /**
         * Gets List of all drivers
         * @return {Array} 
         */
        model.getDrivers = function() {
            return driverList;
        };

        /**
         * Get Driver by driver code
         * @param  {number} driverCode 
         * @return {object}            
         */
        model.getDriverBy = function(driverCode) {
            var driver;
            for (var i = 0; i < driverList.length; i++) {
                if (driverList[i].driverCode === driverCode) {
                    driver = driverList[i];
                    break;
                }
            }
            return driver;
        };

        /**
         * Checks if driver code exisits in list or not
         * @param  {number} driverCode 
         * @return {Boolean} 
         */
        model.getUserHasAccessBy = function(driverCode) {
            return model.getDriverBy(driverCode);
        };

        /**
         * Reset the model, mostly should not be called
         * @return {object} 
         */
        model.reset = function() {
            driverList = [];
            distributeID = 0;
            ready = false;
            return model;
        };

        return model.reset();
    }

    angular
        .module("budgeting")
        .factory('budgetDriverAccessModel', [
            '$q',
            '$filter',
            'budgetModelSvc',
            factory
        ]);
})(angular);
