//  GL Accounts Grid Model

(function (angular) {
    'use strict';

    function factory(gridConfig, appTranslate) {
        var headers = [], defHeaders, translate;
        var config, model = gridConfig();
        translate = appTranslate('budgetWorkflowStatus').translate;

        var updateGridModel = function (defYears, statusOptions) {

            model.get = function () {
                var columnsModel = [
                    {
                        key: 'isSelected',
                        idKey: 'budgetModelID',
                        type: 'select'
                    }, {
                        key: 'propertyName'
            
                    }, {
                        key: 'modelName',
                        type: 'custom',
                        templateUrl: 'app/templates/workflow-status-model.html'
                        /*type: 'link',
                        getLink: model.getMethod('editModel')*/
                    }, {
                        key: 'modelType'
                    }, {
                        key: 'budgetYear'
                    }, {
                        key: 'status',
                        type: 'custom',
                        templateUrl: 'app/templates/workflow-status-col.html'
                    }];
                return columnsModel;

            };

            model.getHeaders = function () {
                var headerModel = [
                    [
                       {
                           //value: false,
                           key: 'isSelected',
                           //type: 'select',
                           text: ''
                       }, {
                           text: translate('property'),
                           key: 'propertyName',
                           isSortable: true,
                           className: 'propertyName'
                       }, {
                           text: translate('model'),
                           key: 'modelName',
                           isSortable: true,
                           className: 'modelName text-info'

                       }, {
                           text: translate('modelType'),
                           key: 'modelType',
                           isSortable: true,
                           className: 'modelType'
                       }, {
                           text: translate('year'),
                           key: 'budgetYear',
                           isSortable: true,
                           className: 'budgetYear'
                       }, {
                           text: translate('status'),
                           key: 'status',
                           isSortable: false,
                           className: 'status'
                       }]
                ];
                return headerModel;
            };

            model.getFilters = function () {
                var filterModel = [
                {
                    key: 'isSelected',
                    type: ''
                },
                {
                    key: 'propertyName',
                    placeholder: translate('filterProperty'),
                    type: 'text',
                    className: 'propertyName'
                }, {
                    key: 'modelName',
                    placeholder: translate('filterModelName'),
                    type: 'text',
                    className: 'modelName'
                }, {
                    key: 'modelType',
                    type: 'menu',
                    className: 'modelType',
                    value:'',
                    options: [{
                        name: 'All',
                        value: ''
                    }, {
                        name: 'Budget',
                        value: 'Budget'
                    }, {
                        name: 'Forecast',
                        value: 'Forecast'
                    }, {
                        name: 'Proforma',
                        value: 'Proforma'
                    }]
                }, {
                    key: 'budgetYear',
                    type: 'menu',
                    value:'',
                    options: defYears,
                    className: 'budgetYear'
                }
                ];

                if (statusOptions === true) {
                    var statusCol = {
                        key: "status",
                        type: 'menu',
                        className: 'status',
                        value:'',
                        options: [{
                            name: 'All',
                            value: ''
                        }, {
                            name: 'In-Progress',
                            value: 'In Progress'

                        }, {
                            name: 'Overdue',
                            value: 'Overdue'
                        }]
                    };
                    filterModel.push(statusCol);
                }
                else {
                    var statusCols = {
                        key: "status",
                        type: 'menu',
                        className: 'status',
                        value:'',
                        options: [{
                            name: 'All',
                            value: ''
                        }, {
                            name: 'Need Approval',
                            value: 'Need Approval'
                        }, {
                            name: 'Overdue',
                            value: 'Overdue'
                        }]
                    };
                    filterModel.push(statusCols);
                }

                return filterModel;
            };


            return model;
        };

        return { updateGridModel: updateGridModel };

    }

    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusConfig', [
            'rpGridConfig',
            'appLangTranslate',          
            factory
        ]);
})(angular);
