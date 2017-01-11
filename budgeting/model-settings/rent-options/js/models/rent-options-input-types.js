//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function RentOptionsInputTypes(langTranslate) {
        var model = {};
        var convert;
        convert = langTranslate('RentOptions').translate;
        
        model.getLangValue = function (key) {
            return convert(key);
        };

        model.getOptions = function () {
            return {
                                 nonSLOptionsForMARent: [{
                                                            value: "None",
                                                            name: "None"
                                                        }, {
                                                            value: "Unit",
                                                            name: "Unit"
                                                        }, {
                                                            value: "Unit type",
                    name: "Unit Type"
                                                        }, {
                                                            value: "Program",
                    name: "Unit Type - Program"
                                                        }],             
                                  nonSLLossGainOptions: [{
                                                            value: "None",
                                                            name: "None"
                                                        }, {
                                                            value: "Worksheet",
                                                            name: "Worksheet"
                                                        }, {
                                                            value: "MarketScheduleRent",
                    name: "Market/Scheduled Difference"
                                                        }],
                                   slOptionsForMARent: [{
                                                            value: "None",
                                                            name: "None"
                                                        }, {
                                                            value: "Unit",
                                                            name: "Unit"
                                                        }, {
                                                            value: "Unit type",
                                                            name: "Unit Type"
                                                        }, {
                                                            value: "Service group",
                                                            name: "Unit Type - Service group"
                                                        }],
                                    slLossGainOptions: [{
                                                            value: "None",
                                                            name: "None"
                                                        }, {
                                                            value: "MarketScheduleRent",
                    name: "Market/Scheduled Difference"
                                                        }, {
                                                            value: "Service group",
                    name: "Service Group - Market/Schedule Difference"
                                                        }],
                                lossGainOptionsForNone: [{
                                                            value: "None",
                                                            name: "None"
                                                        }, {
                                                            value: "Worksheet",
                                                            name: "Worksheet"
                                                        }],
                lossGainToLeaseNoneOptions: [{
                                                                value: "None",
                                                                name: "None"
                                                         }],
                lossGainToLeaseServiceGrp: [{
                                                                value: "None",
                                                                name: "None"
                                                          }, {
                                                                value: "Service group",
                    name: "Service Group - Market/Schedule Difference"
                                                         }],
                lossGainToLeaseMarketScheduleRent: [{
                                                            value: "None",
                                                            name: "None"
                                                        }, {
                                                            value: "MarketScheduleRent",
                    name: "Market/Scheduled Difference"
                                                        }]
                
                
            };

        };

        //model.defaultInputOptions={
        //                         nonSLOptionsForMARent: [{
        //                                                    value: "None",
        //                                                    name: "None"
        //                                                }, {
        //                                                    value: "Unit",
        //                                                    name: "Unit"
        //                                                }, {
        //                                                    value: "Unit type",
        //                                                    name: "Unit Type"
        //                                                }, {
        //                                                    value: "Program",
        //                                                    name: "Unit Type - Program"
        //                                                }],             
        //                          nonSLLossGainOptions: [{
        //                                                    value: "None",
        //                                                    name: "None"
        //                                                }, {
        //                                                    value: "Worksheet",
        //                                                    name: "Worksheet"
        //                                                }, {
        //                                                    value: "MarketScheduleRent",
        //                                                    name: "Market/Scheduled Difference"
        //                                                }],
        //                           slOptionsForMARent: [{
        //                                                    value: "None",
        //                                                    name: "None"
        //                                                }, {
        //                                                    value: "Unit",
        //                                                    name: "Unit"
        //                                                }, {
        //                                                    value: "Unit type",
        //                                                    name: "Unit Type"
        //                                                }, {
        //                                                    value: "Service group",
        //                                                    name: "Unit Type - Service group"
        //                                                }],
        //                            slLossGainOptions: [{
        //                                                    value: "None",
        //                                                    name: "None"
        //                                                }, {
        //                                                    value: "MarketScheduleRent",
        //                                                    name: "Market/Scheduled Difference"
        //                                                }, {
        //                                                    value: "Service group",
        //                                                    name: "Service Group - Market/Schedule Difference"
        //                                                }],
        //                        lossGainOptionsForNone: [{
        //                                                    value: "None",
        //                                                    name: "None"
        //                                                }, {
        //                                                    value: "Worksheet",
        //                                                    name: "Worksheet"
        //                                                }],
        //                     lossGainToLeaseNoneOptions:[{
        //                                                        value: "None",
        //                                                        name: "None"
        //                                                 }],
        //                       lossGainToLeaseServiceGrp:[{
        //                                                        value: "None",
        //                                                        name: "None"
        //                                                  }, {
        //                                                        value: "Service group",
        //                                                        name: "Service Group - Market/Schedule Difference"
        //                                                 }],
        //               lossGainToLeaseMarketScheduleRent:[{
        //                                                    value: "None",
        //                                                    name: "None"
        //                                                }, {
        //                                                    value: "MarketScheduleRent",
        //                                                    name: "Market/Scheduled Difference"
        //                                                }]
                
                
        //    };





        return model;
    }

    angular
        .module("budgeting")
        .factory('RentOptionsInputTypes', [
                    'appLangTranslate',                  
            RentOptionsInputTypes]);
})(angular);
