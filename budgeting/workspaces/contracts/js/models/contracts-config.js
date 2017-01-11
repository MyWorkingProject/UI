//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig, appTranslate,contractsModel) {
        var headers = [], defHeaders, translate;
        var config, model = gridConfig();
        translate = appTranslate('contracts').translate;

        model.get = function () {
            var columnsModel = [
                    {
                        key: 'isSelected',
                        idKey: 'propertyID',
                        type: 'select'
                    }, {
                        key: 'propertyName',

                    }, {
                        key: 'vendorName'

                    }, {
                        key: 'description',
                        type: 'custom',
                        templateUrl: 'app/templates/budget-contract.html'
                        //type: 'link'
                    }, {
                        key: 'status'
                    }, {
                        key: 'startDate'
                    }, {
                        key: 'endDate'

                    }, {
                        key: 'total',
                        type: 'custom',
                        templateUrl: 'app/templates/budget-contracts-amount.html'
                    }, {
                        key: 'percentage',
                        type: 'text'
                    }, {
                        key: 'amount',
                        type: 'custom',
                        templateUrl: 'app/templates/budget-contracts-amount.html'
                    }];

            return columnsModel;

        };

        model.getHeaders = function () {
            var headerModel = [[{
                value: false,
                key: 'isSelected',
                type: 'select',
                text: ''
            }, {
                text: translate('bdgt_contracts_headers_property'),
                key: 'propertyName',
                isSortable: true,
                className: 'propertyName'
            }, {
                text: translate('bdgt_contracts_headers_vendor'),
                key: 'vendorName',
                isSortable: true,
                className: 'vendorName'

            }, {
                text: translate('bdgt_contracts_headers_description'),
                key: 'description',
                isSortable: true,
                className: 'description'
            }, {
                text: translate('bdgt_contracts_headers_status'),
                key: 'status',
                isSortable: true,
                className: 'status'
            }, {
                text: translate('bdgt_contracts_headers_startDat'),
                key: 'startDate',
                isSortable: false,
                className: 'startDate'
            }, {
                text: translate('bdgt_contracts_headers_endDat'),
                key: 'endDate',
                isSortable: false,
                className: 'endDate'
            }, {
                text: translate('bdgt_contracts_headers_total'),
                key: 'total',
                isSortable: false,
            }, {
                text: translate('bdgt_contracts_headers_percentage'),
                key: 'percentage',
                isSortable: false,
            }, {
                text: translate('bdgt_contracts_headers_amount'),
                key: 'amount',
                isSortable: false,
                className: 'amount'
            }]];
            return headerModel;
        };

        model.getFilters = function () {
            var filterModel;
            if(contractsModel.getAllContractsStatus()){

             filterModel = [
                    {
                        key: 'isSelected',
                        type: ''
                    },
                    {
                        key: 'propertyName',
                        type: 'text',
                        placeholder: translate('bdgt_contracts_filters_property'),
                        className: 'propertyName',
                    }, {
                        key: 'vendorName',
                        type: 'text',
                        placeholder: translate('bdgt_contracts_filters_vendor'),
                    }, {
                        key: 'description',
                        type: 'text',
                        placeholder: translate('bdgt_contracts_filters_description'),
                        className: 'vendorName'
                    }, {
                        key: 'status',
                        type: 'menu',
                        className: 'status',
                         value: '',
                        options: [{
                            name: 'All',
                            value: ''
                        }, {
                            name: 'Expiring Soon',
                            value: 'Expiring Soon'
                        }, {
                            name: 'Expired',
                            value: 'Expired'
                        }, {
                            name: 'No Schedules',
                            value: 'No Schedules'
                        }, {
                            name: 'Active',
                            value: 'Active'
                        }]
                    }
            ];
        }
    else{
                 filterModel = [
                    {
                        key: 'isSelected',
                        type: ''
                    },
                    {
                        key: 'propertyName',
                        type: 'text',
                        placeholder: translate('bdgt_contracts_filters_property'),
                        className: 'propertyName',
                    }, {
                        key: 'vendorName',
                        type: 'text',
                        placeholder: translate('bdgt_contracts_filters_vendor'),
                    }, {
                        key: 'description',
                        type: 'text',
                        placeholder: translate('bdgt_contracts_filters_description'),
                        className: 'vendorName'
                    }, {
                        key: 'status',
                        type: 'menu',
                        className: 'status',
                         value: '',
                        options: [{
                            name: 'All',
                            value: ''
                        }, {
                            name: 'Expired',
                            value: 'Expired'
                        }, {
                            name: 'Expiring Soon',
                            value: 'Expiring Soon'
                        }]
                    }
            ];
        }

            return filterModel;
        };


        return model;


    }

    angular
        .module("budgeting")
        .factory('contractsConfig', [
            'rpGridConfig',
            'appLangTranslate',
            'contractsModel',
            factory
        ]);
})(angular);
