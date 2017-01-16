(function() {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang("en-us").app("service-group-summary");

        bundle.set({
            header_title: 'Loss/Gain to Lease',
            header_sub_title: 'Market Rent/Actual Rent Differnce-Service Group',
            toalMarketRent: 'Total Market Rent',
            totalActualRent: 'Total Actual Rent',
            lossOrGainLeaseDiff: 'Loss/Gain to lease differnce',
            avgLossOrGain: 'Average Loss/Gain per unit',
            avgMarketRent: 'Average Market rent per unit',
            adjustmentsHeader: 'Adjustments',
            moveins: 'Move-Ins',
            adjustmentFromMoveins: 'Adjustment From Move-Outs',
            moveOuts: 'Move-outs',
            adjustmentfromMoveOuts: 'Adjustmentfrom move-outs',
            totalAdjustments: 'Total Adjustments',
            capExIncreaseActualRent: 'CapEx-Increase in Actual Rent',
            otherAdjustments: 'Other adjustments',
            totalLossOrGain: 'Total loss/gain to lease'
        });
    }

    angular
        .module("budgeting")
        .config(["appLangBundleProvider", config]);
})();