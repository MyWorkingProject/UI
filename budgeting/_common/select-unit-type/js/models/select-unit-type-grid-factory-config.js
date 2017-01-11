
(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var model = gridConfig(), translate;        
        translate = langTranslate('selectUnitType').translate;
        model.get = function () {
            var cols = [];
                cols = [{
                    key: 'isSelected',
                    type: 'select'
                },
                {
                    key: "name"                   
                },
                {
                    key: "unitCount"
                }
           ];     
           return cols;
        };

        model.getHeaders = function () {
            var headers = [];
                headers = [{
                    key: 'unitTypeID',
                    type: 'select'
                },
                {
                    key: 'name',
                    text: "Unit Type",
                    isSortable: true
                },
                  {
                      key: 'unitCount',
                      text: "Number Of Units",
                      isSortable: true
                  }

               ];
            return [ headers ];
        };

        model.getFilters = function () {
            return [{
                    key: 'name',
                    type: 'text',               
                    placeholder: translate('bdgt_selectUnitType_filter_label')
            },
            {
                key: 'unitCount',
                type: 'text',
                placeholder: translate('bdgt_selectUnitType_filter_noOfUnits')
            }
            ];
        };
        return model;
    }
    angular
        .module("budgeting")
        .factory("selectUnitTypeGridConfig", ["rpGridConfig", "appLangTranslate", factory]);
})(angular);
