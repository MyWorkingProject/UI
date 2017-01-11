//  Pricing Grid
//  Responsible for combining the configuration and behavior of annual increase grid

(function (angular) {
    "use strict";

    function gridFactory(gridConfig, rpGridModel, i18n) {
        var grid = {},
            gridModel = null,
            noResultsMsg = i18n.translate("bdgt_new_contract_grid_empty");

        grid.init = function () {
            grid.model = gridModel = rpGridModel();
            gridModel.setConfig(gridConfig).setEmptyMsg(noResultsMsg);

            return grid;
        };

        grid.setSrc = function (controller) {
            gridConfig.setSrc(controller);
        };

        //populate grid with rows
        grid.populateGrid = function (gridData) {
            gridModel.setData(gridData).busy(false);
        };

        grid.clear = function () {
            gridModel.flushData();
        };

        return grid.init();
    }

    angular
        .module("budgeting")
        .factory("pricingGridModel", [
                "pricingGridConfigModel",
                "rpGridModel",
                "contractTranslatorSvc",
                gridFactory
        ]);

})(angular);