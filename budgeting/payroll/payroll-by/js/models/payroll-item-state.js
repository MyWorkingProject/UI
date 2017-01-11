//  Payroll Item State Model

(function (angular) {
    "use strict";

    function factory($filter,
        budgetDetails,
        eventStream,
        payrollBaseModel) {
        var model = {},
            activeTab,
            tabs,
            payrollByModel,
            payrollItemsCommentCount,
            state,
            events,
            payRates = [];

        model.init = function () {
            activeTab = {
                text: '',
                key: '',
                payrollItems: []
            };
            tabs = [];
            state = {
                isEditable: false,
                isReadOnly: false
            };
            payrollByModel = {
                payrollBy: '',
                distID: 0,
                payrollByID: 0,
                details: {}
            };
            payrollItemsCommentCount = [];
            events = {
                onUpdate: eventStream(),
                onSaveSuccess: eventStream(),
                onStateChange: eventStream()
            };
            return model;
        };

        // Getters

        /**
         * Gets Active tabs 
         * @return {object} 
         */
        model.getCurrentTab = function () {
            return activeTab;
        };

        /**
         * Gets Payroll details
         * @return {[type]} [description]
         */
        model.get = function () {
            return angular.copy(payrollByModel);
        };

        /**
         * Gets Payroll by either employee or job position
         * @return {[type]} [description]
         */
        model.getPayrollBy = function () {
            return payrollByModel.payrollBy;
        };

        /**
         * Gets all tabs
         * @return {Array} 
         */
        model.getTabs = function () {
            var payrollItems = payrollBaseModel.getPayrollItems();
            tabs = [];

            tabs.push({
                className: "",
                hasEdit: true,
                isDefault: true,
                isActive: true,
                text: 'Model Details',
                id: tabs.length,
                key: 'model-details',
                payrollItems: []
            });

            payrollItems.forEach(function (item) {
                if ($filter('filter')(tabs, {
                        text: item.itemGroup
                    }, true).length === 0) {
                    var tab = {
                        className: "",
                        hasEdit: true,
                        isDefault: false,
                        isActive: false,
                        text: item.itemGroup,
                        id: tabs.length,
                        key: angular.lowercase(item.itemGroup).replace(/[^0-9A-Z]+/gi, "-"),
                        payrollItems: []
                    };
                    if (tab.key === "custom-worksheets") {
                        tab.hasEdit = false;
                    }
                    tabs.push(tab);
                }
            });

            tabs.push({
                className: "",
                hasEdit: false,
                isDefault: false,
                isActive: false,
                text: 'Summary',
                id: tabs.length,
                key: 'summary',
                payrollItems: []
            });

            return tabs;
        };

        /**
         * Gets Payroll Items in a tab or item group
         * @param  {string} key  item group
         * @param  {string} name item group
         * @return {Array}
         */
        model.getPayrollItemsByGroup = function (key, name) {
            var payrollItems = [];
            var payrollItemInGroup = $filter('filter')(payrollBaseModel.getPayrollItems(), {
                itemGroup: name
            }, true);

            function createItem(viewFolder, item) {
                var payrollItem = angular.extend({
                    name: viewFolder,
                    viewUrl: 'payroll/items/' + viewFolder + '/index.html'
                }, item);

                if (item.hasOwnProperty("payrollType") && item.hasOwnProperty("payrollItemID")) {
                    var comment = $filter('filter')(payrollItemsCommentCount, {
                        payrollType: item.payrollType,
                        payrollItemID: item.payrollItemID
                    }, true).first();
                    payrollItem.commentCount = comment ? comment.commentsCount : 0;
                }

                return payrollItem;
            }

            switch (key) {
                case "model-details":
                    payrollItems.push(createItem(model.getIsEmployee() ? "employee-allocation" : "job-position-allocation", {}));
                    break;
                case "pay":
                    payrollItems.push(createItem(angular.lowercase(payrollByModel.details.payrateType), $filter('filter')(payrollItemInGroup, {
                        payrollItemName: payrollByModel.details.payrateType
                    }, true).first()));
                    break;
                case "others":
                payrollItemInGroup.forEach(function (item) {
                        var payrollItem = createItem("bonus", item);
                        payrollItem.name = angular.lowercase(item.payrollItemName).replace(/[^0-9A-Z]+/gi, "-");
                        payrollItems.push(payrollItem);
                    });
                    break;
                case "custom-worksheets":
                    var _folderName = angular.lowercase(payrollItemInGroup.first().payrollItemName).replace(/[^0-9A-Z]+/gi, "-");
                    payrollItems.push(createItem(_folderName, payrollItemInGroup.first()));
                    break;
                case "summary":
                    payrollItems.push(createItem("summary", {}));
                    break;
                default:
                payrollItemInGroup.forEach(function (item) {
                        payrollItems.push(createItem(angular.lowercase(item.payrollItemName).replace(/[^0-9A-Z]+/gi, "-"), item));
                    });
                    break;
            }
            return payrollItems;
        };

        /**
         * Get payroll items for preparing tabs
         * @return {object}
         */
        model.getPayrollItems = function () {
            return payrollBaseModel.getPayrollItems();
        };

        /**
         * Get Current tabs payroll item
         * @param  {numbeer} index
         * @return {object}
         */
        model.getPayrollItem = function (index) {
            return activeTab.payrollItems[index];
        };

        /**
         * Gets whether current payroll is employee or not
         * @return {Boolean} 
         */
        model.getIsEmployee = function () {
            return model.chkIsEmployee(payrollByModel.payrollBy);
        };

        model.chkIsEmployee = function (payrollBy) {
            return angular.lowercase(payrollBy) === "employee";
        };

        model.getPayrollByID = function (payrollBy) {
            return model.chkIsEmployee(payrollBy.payrollBy) ? payrollBy.employeePropertyID : payrollBy.jobPositionID;
        };

        /**
         * Get whether current employee or job postion has payroll or not
         * @return {Boolean} [description]
         */
        model.hasPayroll = function () {
            return payrollByModel.payrollID > 0;
        };

        /**
         * Gets current state of payroll 
         * @return {Boolean}
         */
        model.getIsEditable = function () {
            return state.isEditable;
        };

        /**
         * Gets whether payroll is readonly or not
         * @return {Boolean}
         */
        model.getIsReadOnly = function () {
            return state.isReadOnly;
        };

        /**
         * Gets current payroll start date
         * @return {Boolean}
         */
        model.getStartDate = function () {
            return new Date(payrollByModel.details.startDate);
        };

        /**
         * Gets current payroll end date
         * @return {Boolean}
         */
        model.getEndDate = function () {
            return payrollByModel.details.endDate !== "" ? new Date(payrollByModel.details.endDate) : undefined;
        };

        /**
         * Gets Allocation Percentage
         * @return {[type]} [description]
         */
        model.getAllocationPercent = function () {
            return payrollByModel.details.allocationPercent;
        };

        model.getPayRates = function() {
            return payRates;
        };

        model.isActivePayRate = function (payrollBy) {
            return payrollByModel.payrollID === payrollBy.payrollID;
        };

        model.removePayRate = function (index) {
            payRates.splice(index, 1);
        };

        model.getNextPayRate = function (index) {
            return payRates.length === index + 1 ? payRates.first() : payRates[index + 1];
        };

        model.canAddNewPayRate = function () {
            return payRates.last().payrollID !== 0;
        };

        model.getLastPayRate = function () {
            return payRates.last();
        };

        model.getLastPayRateIndex = function () {
            return payRates.length - 1;
        };

        model.hasPayRate = function () {
            return payRates.length !== 1;
        };

        model.getJobPositionCount = function () {
            return payrollByModel.details.positionCount;
        };

        model.getIsLockCount = function () {
            return payrollByModel.details.isLockCount;
        };
        
        model.getTotalPayRateCount = function () {
            var total = 0;
            payRates.forEach(function (payrate) {
                total += parseFloat(payrate.payrateCount);
            });
            return total;

        };

        model.copyLastPayRate = function() {
            var lastPayrollBy = angular.extend({}, payRates.last());
            //Set to default
            lastPayrollBy.payrollID = 0;
            lastPayrollBy.allocationPercent = 100;
            lastPayrollBy.payrateCount = 0;
            payRates.push(lastPayrollBy);
            return lastPayrollBy;
        };

        // Setter


        model.setPayRatesPostionCount = function (positionCount) {
            payRates.forEach(function (payrate) {
                payrate.positionCount = positionCount;
            });

            return model;
        };

        /**
         * Sets edit state & notify others
         * @return {Boolean}
         */
        model.toggle = function (flag) {
            if (!state.isReadOnly) {
                state.isEditable = flag || !state.isEditable;
                events.onStateChange.publish();
            }
            return model;
        };

        /**
         * Set current tabs along with payroll items
         * @param {string}
         * @return {Boolean}
         */
        model.setCurrentTab = function (tab) {
            activeTab.text = tab.text;
            activeTab.key = tab.key;
            activeTab.hasEdit = tab.hasEdit;
            activeTab.payrollItems = model.getPayrollItemsByGroup(tab.key, tab.text);

            return model;
        };

        /**
         * Sets payroll state
         * @param {number} distID       
         * @param {Boolean} editFlag    
         * @param {Boolean} readOnlyFlag
         */
        model.setPayrollState = function (distID, editFlag, readOnlyFlag) {
            payrollByModel.distID = distID;
            state.isReadOnly = readOnlyFlag;
            state.isEditable = !readOnlyFlag && editFlag;

            return model;
        };

        /**
         * Sets all payrolls used for job position
         * @param {object} payrollBys object
         */
        model.setPayRates = function (payrollBys) {
            payRates = payrollBys;
            return model;
        };

        /**
         * Sets payroll by details & publish update
         * @param {Boolean} newFlag     
         * @param {Number} payrollID   
         * @param {string} payrollBy   
         * @param {Number} payrollByID 
         * @param {object} payrollInfo object to update the details 
         */
        model.setPayrollBy = function (payrollID, payrollBy, payrollByID) {
            payrollByModel.payrollBy = payrollBy;
            payrollByModel.payrollID = parseFloat(payrollID);
            payrollByModel.payrollByID = parseFloat(payrollByID);
            payrollByModel.details = $filter('filter')(payRates, {
                payrollID: parseFloat(payrollID)
            }, true).first();
            events.onUpdate.publish(payrollByModel);
        };

        model.setComments = function (payrollItmCmtCount) {
            payrollItemsCommentCount = payrollItmCmtCount;
        };

        /**
         * Sets Payroll By details & publish update
         * @param {object} payrollInfo details
         */
        model.setPayrollByInfo = function (payrollInfo) {
            payrollByModel.details = angular.extend(payrollByModel.details, payrollInfo);
            events.onUpdate.publish(payrollByModel);
        };

        /**
         * Sets Model based on index of payroll item
         * @param {Number} index            
         * @param {object} payrollItemModel 
         */
        model.setModel = function (index, payrollItemModel) {
            activeTab.payrollItems[index].model = payrollItemModel;
            return model;
        };

        /**
         * Publish Save Sucess Changes
         */
        model.notifySaveSucess = function (payrollID) {
            payrollByModel.payrollID = payrollID;
            payrollByModel.details.payrollID = payrollID;
            events.onSaveSuccess.publish();
            return model;
        };

        // Events

        /**
         * Subscribe for state change
         * @param  {Function} callback 
         * @return {Function}            
         */
        model.onStateChange = function (callback) {
            return events.onStateChange.subscribe(callback);
        };

        /**
         * Subscribe for save success
         * @param  {Function} callback 
         * @return {Function}            
         */
        model.onSaveSuccess = function (callback) {
            return events.onSaveSuccess.subscribe(callback);
        };

        /**
         * Subscribe for update
         * @param  {Function} callback 
         * @return {object}  this          
         */
        model.onUpdate = function (callback) {
            events.onUpdate.subscribe(callback);
            return model;
        };

        /**
         * Destroy all events & re init
         */
        model.destroy = function () {
            events.onUpdate.destroy();
            events.onStateChange.destroy();
            events.onSaveSuccess.destroy();
            model.init();
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory("payrollItemStateModel", [
            "$filter",
            "budgetDetails",
            "eventStream",
            'payrollBaseModel',
            'payrollService',
            factory
        ]);
})(angular);
