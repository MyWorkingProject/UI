//  constants Model

(function (angular) {
    "use strict";

    function factory() {
        var model = {
            config: {
                column: {
                    width: 75,
                    key: "",
                    label: "",
                    state: {
                        active: true,
                        locked: false
                    },
                    isDataColumn: true,
                    classNames: "toggle-text text-right"
                },
                groupHeader: {
                    key: "",
                    text: "",
                    classNames: "title-header-group",
                    colspan: "0"
                },
                header: {
                    key: "",
                    text: "",
                    isSortable: false
                },
                customRow: {
                    key: ""
                }
            },
            columns: {
                title: {
                    key: "itemDescription",
                    text: "",
                    width: 270,
                    state: {
                        active: true,
                        locked: true
                    },
                    isDataColumn: false,
                },
                period: {
                    key: "period",
                    width: 100,
                    state: {
                        active: true,
                        locked: false
                    },
                },
                total: {
                    key: "total",
                    width: 100,
                    state: {
                        active: true,
                        locked: false
                    },
                    text: "Total",
                    isDataColumn: false
                }
            },
            groupColumns: {
                title: {
                    key: "itemDescription",
                    text: "",
                    state: {
                        active: true,
                        locked: true
                    }
                },
                period: {
                    key: "period",
                    state: {
                        active: true,
                        locked: false
                    },
                },
                total: {
                    key: "total",
                    state: {
                        active: true,
                        locked: false
                    },
                    text: ""
                }
            },
            rowTypeConfig: {
                readonly: 'readonly',
                groupHeader: 'bmGroupHeader',
                editable: 'editable',
                total: 'total'
            },
            methodConfig: {
                getRowTotal: "getRowTotal",
                getTotalByColumn: "getTotalByColumn",
                getTotalByGroup: "getTotalByGroup",
                getCustomTotal: "getCustomTotal"
            },
            templateConfig: {
                editableColumnUrl: "app/templates/budget-editable-column.html",
                readonlyColumnUrl: "app/templates/budget-readonly-column.html"
            },
            filterConfig: {
                roundNumber: 'roundNumber',
                noFormat: 'noFormat',
                roundNumberWithDecimals: 'roundNumberWithDecimals'
            }
        };

        model.getConfigs = function () {
            return model.config;
        };

        model.getColumns = function () {
            return model.columns;
        };

        model.getRowTypeConfigs = function () {
            return model.rowTypeConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        model.getTemplateConfigs = function () {
            return model.templateConfig;
        };

        model.getFilterConfigs = function () {
            return model.filterConfig;
        };

        model.getGroupColumns = function(){
            return model.groupColumns;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("bmGridConstantModel", [factory]);
})(angular);
