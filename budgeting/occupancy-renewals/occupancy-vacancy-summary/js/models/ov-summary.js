//  hourly Model

(function(angular) {
    "use strict";

    function factory(
        detailsConstant,
        bmGrid, $state, budgetDetails, $filter) {
        return function(gridConfig) {
            var model = {},
                grid,
                responseData,
                rowConfig = detailsConstant.getRowConfigs();
            model.budgetModel = budgetDetails.getModelDetails();
            model.init = function() {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                return model;
            };

            model.setData = function(data) {

                model.setGridData(data);
                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function(data) {
                grid
                    .setData(data)
                    .refresh();

                return model;
            };

            /**
             * get all the column Info
             */
            model.getColumnInfo = function() {
                return grid;
            };


            model.redirectToService = function(col, row) {
                console.log(row);
                $state.go('occupancyRenewals.occupancyVacancyServiceGroup', { serviceGroupID: row.data.serviceGroupID });
            };
            model.destroy = function() {
                grid.destroy();
                model = undefined;
            };
            model.getCommentParams = function(col, row) {
                return {
                    distributedID: model.budgetModel.distributedID,
                    commentSource: 'OccupancyVacancyByServiceGroup',
                    commentSourceID: row.data.serviceGroupID,
                    accessPrivilages: budgetDetails.getAccessPrivileges().allowComments,
                    subTitle: row.data.serviceName,
                    serviceGroupID: row.data.serviceGroupID,
                };
            };
            model.selectedServiceGroup = function(col, row) {
                model.selectedServiceGroupId = row.data.serviceGroupID;
            };
            model.updateGrid = function(updateCommentCount) {
                model.UpdateData(grid.gridData, model.selectedServiceGroupId, updateCommentCount);
            };
            model.UpdateData = function(data, serviceGroup, updateCommentCount) {
                angular.forEach(data, function(item) {
                    if (item.serviceGroupID === serviceGroup) {
                        item.commentCount = updateCommentCount;
                    }
                });
                model.setGridData(data);

            };
            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("occupancyDetailsModel", [
            'ovDetailsConstantModel',
            'bmGridModel', '$state', 'budgetDetails', '$filter',
            factory
        ]);
})(angular);