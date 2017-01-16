(function(angular) {
    function factory(langtranslate) {
        'use strict';
        return function(gridConfig, methodname, isView) {
            var translate, columns = [],
                headers = [],
                filters = [];
            var model = gridConfig;
            translate = langtranslate('allocationEdit').translate;

            function getgridconfig_old(array, key, text, iscurrency, isTemplate, Templateurl) {
                var column;
                if (isTemplate) {
                    column = {
                        key: key,
                        text: translate(text),
                        dataType: iscurrency ? 'currency' : 'text',
                        type: 'custom',
                        templateUrl: Templateurl
                    };
                } else {
                    column = {
                        key: key,
                        text: translate(text),
                        dataType: iscurrency ? 'currency' : 'text'
                    };
                }
                array.push(column);
            }

            function getgridconfig(array, key, text, iscurrency, templateurl, methodName) {
                var column = {
                    key: key,
                    text: translate(text),
                    dataType: iscurrency ? 'currency' : 'text'
                };
                if (templateurl) {
                    column.type = 'custom';
                    column.templateUrl = templateurl;
                }
                if (methodName) {
                    column.method = model.getMethod(methodName);
                }
                array.push(column);
            }

            function getFilters(array, key, type, placeHolder) {
                array.push({
                    key: key,
                    type: type,
                    filterDelay: 0,
                    placeholder: placeHolder
                });
            }
            getgridconfig(columns, 'propertyName', 'form_allocation_propertyName');
            getgridconfig(columns, 'masterChartName', 'form_allocation_master_chart');
            //getgridconfig(columns, 'glaccount', 'form_allocation_glaccount');
            getgridconfig(columns, 'glAccountNumber', 'form_allocation_glaccount', undefined, 'app/templates/allocations-gl-accounts.html');
            if (methodname === translate('value_units')) {
                getgridconfig(columns, 'units', 'form_allocation_units');
            } else if (methodname === translate('value_sqftg')) {
                getgridconfig(columns, 'squareFootage', 'form_allocation_sqft');
            }

            getgridconfig(columns, 'percentage', 'form_allocation_allocation_per', undefined, 'app/templates/allocation-percentage.html', 'onPercentageBlur');
            getgridconfig(columns, 'amount', 'form_allocation_amount', true, 'app/templates/allocation-amount.html', 'onAmountBlur');
            if (isView) {
                getgridconfig(columns, 'delete', 'delete', true, 'app/templates/allocation-property-trash.html', 'deleteProperty');
            }
            getgridconfig(headers, 'propertyName', 'form_allocation_propertyName');
            getgridconfig(headers, 'masterChartName', 'form_allocation_master_chart');
            getgridconfig(headers, 'glAccountNumber', 'form_allocation_glaccount');
            if (methodname === translate('value_units')) {
                getgridconfig(headers, 'units', 'form_allocation_units');
            } else if (methodname === translate('value_sqftg')) {
                getgridconfig(headers, 'squareFootage', 'form_allocation_sqft');
            }

            getgridconfig(headers, 'percentage', 'form_allocation_allocation_per');
            getgridconfig(headers, 'amount', 'form_allocation_amount', true);
            if (isView) {
                getgridconfig(headers, 'delete', 'delete');
            }
            getFilters(filters, "propertyName", "text", "Filter by Property");
            getFilters(filters, "masterChartName", "text", "Filter by Master Chart");
            getFilters(filters, "glAccountNumber", "text", "Filter by Gl Account");
           
            model.get = function() {
                return columns;
            };
            model.getHeaders = function() {
                return [headers];
            };
            model.getFilters = function() {
                return filters;
            };
            return model;
        };

    }
    angular
        .module('budgeting')
        .factory('propertyConfig', [
            'appLangTranslate',
            factory
        ]);
})(angular);