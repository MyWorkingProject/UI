(function() {
    "use strict";

    function config(appLangKeys) {
        var keys = ['header_title',
            'header_sub_title',
            'toalMarketRent',
            'totalActualRent',
            'lossOrGainLeaseDiff',
            'avgLossOrGain',
            'avgMarketRent',
            'adjustmentsHeader',
            'moveins',
            'adjustmentFromMoveins: ',
            'moveOuts',
            'adjustmentfromMoveOuts',
            'totalAdjustments',
            'capExIncreaseActualRent',
            'otherAdjustments',
            'totalLossOrGain',
        ];

        appLangKeys.app("service-group-summary").set(keys);
    }

    angular
        .module("budgeting")
        .config(["appLangKeysProvider", config]);
})();