
(function (angular) {
    'use strict';

    function factory(base, langTranslate) {
        var model = {},
            translate = langTranslate('account-by-account-view').translate;
        model.columns={};
        model.headers={};
        model.totals={};
      
      model.init=function(){
             angular.copy(model.defTotals, model.totals);
              angular.copy(model.defHeaders, model.headers);
              angular.copy(model.defColumns, model.columns); 
            return model;
        };

     

      model.defColumns={
           forecastType: [{
                            width: 80,
                            key: "forecastUseData",
                            label:translate('grid_col_forecast_data'),
                            state: {
                                active: true,
                                locked: false
                            },
                            isDataColumn: true,
                            classNames: "toggle-text"
                        }],
            firRefType:[{
                            width: 80,
                            key: "firstReferenceData",
                            label: translate('grid_col_ref_data'),
                            state: {
                                active: true,
                                locked: false
                            },
                            isDataColumn: true,
                            classNames: "toggle-text"
                    }],
          totalAndAvgColumns : [{
                                    width: 100,
                                    key: "total",
                                    label: translate('grid_col_total'),
                                    state: {
                                        active: true,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                }, {
                                    width: 100,
                                    key: "avgMonthly",
                                    label: translate('grid_col_avg_monthly'),
                                    state: {
                                        active: true,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                }],
              otherDefColumns : [{
                                    width: 100,
                                    key: "varianceAmount",
                                    label: translate('grid_col_dol_variance'),
                                    state: {
                                        active: true,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                }, {
                                    width: 120,
                                    key: "variancePercent",
                                    label: translate('grid_col_per_variance'),
                                    state: {
                                        active: true,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                }, {
                                    width: 80,
                                    key: "perUnit",
                                    label: translate('grid_col_per_unit'),
                                    state: {
                                        active: true,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                }, {
                                    width: 80,
                                    key: "perSqFT",
                                    label: translate('grid_col_per_sqft'),
                                    state: {
                                        active: true,
                                        locked: false
                                    },
                                    isDataColumn: true,
                                    classNames: "toggle-text"
                                }],
                rollingActuals:[{
                                width: 100,
                                key: "rollingActual",
                                label:translate('grid_col_rolling_actual'),
                                state: {
                                    active: true,
                                    locked: false
                                },
                                isDataColumn: true,
                                classNames: "toggle-text"
                            }],
              commentCount:[{
                                width: 30,
                                key: "commentCount",               
                                //type: 'custom',
                               // templateUrl: 'account-by-account/view/templates/account-by-account-chart.html',
                                state: {
                                    active: true,
                                    locked: false
                                },
                                isDataColumn: true,
                                classNames: "toggle-text no-wrap"
                            }]
        
            };

         angular.copy(model.defColumns, model.columns);
       

         model.defHeaders={
                      firRefType: [{                          
                             key: "firstReferenceData",
                            text: "2014 Actual"
                        }], 
                    forecastType:[{
                             key: "forecastUseData",
                            text: "2014 Budget"
                        }],
                    headerTotalAndAvgTotal:  [{
                                key: "total",
                                text: translate('grid_col_total'),
                                }, {
                                key: "avgMonthly",
                                text: translate('grid_col_avg_monthly')
                            }],
                    otherDefHeaders:[{
                                    key: "varianceAmount",
                                    text: translate('grid_col_dol_variance')
                                }, {
                                    key: "variancePercent",
                                    text: translate('grid_col_per_variance')
                                }, {
                                    key: "perUnit",
                                    text: translate('grid_col_per_unit')
                                }, {
                                    key: "perSqFT",
                                    text: translate('grid_col_per_sqft')
                                }],
                       rollingActuals:[{
                                        key: "rollingActual",
                                        text: translate('grid_col_rolling_actual')
                                    }],
                      commentCount: [{
                                    key: "commentCount",
                                    text: "",
                                    isSortable: true
                                   }]
        
                    };
            angular.copy(model.defHeaders, model.headers);
           


     model.defTotals={
                  firRefType:  [{
                               
                                 key: "firstReferenceData",
                               //  methodName: "getTotal"
                                }], 
                   forecastType:[{
                                key: "forecastUseData",
                              //  methodName: "getTotal"
                            }],
                 totalAndAvgForTotal:[ {
                                    key: "total",
                                   // methodName: "getTotal"
                                }, {
                                    key: "avgMonthly",
                                  //  methodName: "getTotal"
                                }],
               otherDefTotals:[{
                            key: "varianceAmount",
                            methodName: "getTotal"
                        }, {
                            key: "variancePercent",
                            methodName: "getTotal"
                        }, {
                            key: "perUnit",
                            methodName: "getTotal"
                        }, {
                            key: "perSqFT",
                            methodName: "getTotal"
                        }],
                rollingActuals:[{
                            key: "rollingActual",
                            methodName: "getTotal"
                        }]
                };

            angular.copy(model.defTotals, model.totals);

        model.reset=function(){
              angular.copy(model.defTotals, model.totals);
              angular.copy(model.defHeaders, model.headers);
              angular.copy(model.defColumns, model.columns); 
        };
    

        return model.init();
    }

    angular
        .module('budgeting')
        .factory('configKeys', ['accountByAccountBase', 'appLangTranslate', factory]);
})(angular); 
