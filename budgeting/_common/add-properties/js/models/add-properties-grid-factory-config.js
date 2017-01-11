
(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var model = gridConfig(), translate;        
        translate = langTranslate('addProperties').translate;
        model.get = function () {
            var cols = [];
                cols = [{
                    key: 'isSelected',
                    type: 'select'
                },
                {
                    key: "propertyName"                   
                }
           ];     
           return cols;
        };

        model.getHeaders = function () {
            var headers = [];
                headers = [{
                    key: 'propertyID',
                    type: 'select'
                },
                {
                    key: 'propertyName',
                    text: "Property",
                    isSortable: true
                 }
               ];
            return [ headers ];
        };

        model.getFilters = function () {
            return [{
                    key: 'propertyName',
                    type: 'text',               
                    placeholder: translate('bdgt_addProperties_filter_label')
                }];
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory("addPropertiesGridConfig", ["rpGridConfig", "appLangTranslate", factory]);
})(angular);
