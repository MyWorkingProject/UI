(function(angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('service-group-summary').translate,
            model = {
                headerTitle: translate('header_title'),
                subTitle: translate('header_sub_title'),
                toalMarketRent: translate('toalMarketRent'),
                totalActualRent: translate('totalActualRent'),
                lossOrGainLeaseDiff: translate('lossOrGainLeaseDiff'),
                avgLossOrGain: translate('avgLossOrGain'),
                avgMarketRent: translate('avgMarketRent'),
                adjustmentsHeader: translate('adjustmentsHeader'),
                moveins: translate('moveins'),
                adjustmentFromMoveins: translate('adjustmentFromMoveins'),
                moveOuts: translate('moveOuts'),
                adjustmentfromMoveOuts: translate('adjustmentfromMoveOuts'),
                totalAdjustments: translate('totalAdjustments'),
                capExIncreaseActualRent: translate('capExIncreaseActualRent'),
                otherAdjustments: translate('otherAdjustments'),
                totalLossOrGain: translate('totalLossOrGain')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("summaryContentModel", [
            'appLangTranslate',
            factory
        ]);
})(angular);