//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('contracts-csv').translate;

        model.get = function () {
            return [{
                    key: 'isSelected',
                    type: 'select'
                },
                {
                    key:'vendorName'
                },
                 {
                     key: 'description'
                 },
                 {
                    key: 'frequency'
                },
                {
                    key: 'startDate'
                },
                {
                    key: 'endDate'
                },
                {
                    key: 'amount',
                    type: 'custom',
                    templateUrl: 'app/templates/budget-contracts-amount.html'
                },
                {
                    key: 'propertyID'
                }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: '',
                        isSortable: false,
                        key: 'isSelected',
                        type: 'select'
                    },
                    {
                       
                        key: 'vendorName',
                        isSortable: true,
                        className: 'vendorName',
                        text:translate('bdgt_contracts_hdrVndrText')

                    },                    
                    {
                        text: translate('bdgt_contracts_hdrDescText'),
                        isSortable: true,
                        key: 'description'
                    }, 
                    {
                        text: translate('bdgt_contracts_hdrFreqText'),
                        key: 'frequency',
                        isSortable: true,
                        className: 'frequency'
                    },              
                    {
                        text: translate('bdgt_contracts_hdrStrtText'),
                        key: 'startDate',
                        isSortable: true,
                        className: 'startDate'
                    },              
                    {
                        text: translate('bdgt_contracts_hdrEndText'),
                        key: 'endDate',
                        isSortable: true,
                        className: 'endDate'
                    },              
                    {
                        text: translate('bdgt_contracts_hdrAmntText'),
                        key: 'amount',
                        isSortable: true,
                        className: 'amount'
                    },              
                    {
                        text: translate('bdgt_contracts_hdrPropIDText'),
                        key: 'propertyID',
                        isSortable: false,
                        className: 'propertyID'
                    }
                ]
            ];
        };

        model.getFilters = function () {
            return [
                {
                    
                    key: 'isSelected',
                },
                {
                    key: 'vendorName',
                    type: 'text',
                    placeholder: translate('bdgt_contracts_fltrVndrText')
                },                
                {
                    key: 'description',
                    type: 'text',
                    placeholder: translate('bdgt_contracts_fltrDescText')
                },
                {
                    key: 'frequency',
                    type: 'menu',
                    className: 'frequency',
                    value: '',
                    options: [{
                        name: 'All',
                        value: ''
                    }, {
                        name: 'Bi-weekly',
                        value: 'Bi-weekly'
                    }, {
                        name: 'Weekly',
                        value: 'Weekly'
                    }, {
                        name: 'Monthly',
                        value: 'Monthly'
                    }, {
                        name: 'Quarterly',
                        value: 'Quarterly'
                    }, {
                        name: 'Annually',
                        value: 'Annually'
                    }, {
                        name: 'Annualized',
                        value: 'Annualized'
                    }]
                    
                },                
                {
                    key: 'propertyID',
                    type: 'text',
                    placeholder: translate('bdgt_contracts_fltrPropText')
                }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('contractsCSVConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

