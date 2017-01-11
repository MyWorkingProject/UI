// Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('defaultsAdjustments').translate;

        model.get = function () {
            return [{
                        key: 'isSelected',
                        idKey: 'categoryAdjPercentID',
                        type: 'select'                    
                    },
                    {
                         key: 'accountType'                        
                    },
                    {
                        key: 'name'                    
                    },
                    {
                        key: 'adjPercent',
                        type: 'custom',
                        templateUrl: 'app/templates/budgetmodel-default-adjustments-adj-percent.html',                  
                    },             
                ];
            };
        model.getHeaders = function () {
            return [
                [
                    {
                        key: 'isSelected',
                        isSortable: false,
                        className:'isSelected'
                    },
                     {
                         text: 'Account Type',
                         isSortable: true,
                         key: 'accountType'
                       
                     },                              
                    {
                        text: 'Account Group',
                        isSortable: true,
                        key: 'name',                        
                    }, 
                    {
                        text: 'Default %',
                        key: 'adjPercent', 
                        isSortable: false                      
                    },              
               
                ]
            ];
        };
        model.getFilters = function () {
            return [             
                {                   
                    key: 'isSelected',
                    type: ''                  
                },                
                {
                    key: 'accountType',
                    type: 'text',
                    placeholder: translate('bdgt_defaultAdjustments_filterAccountTypeText')
                },
                {
                    key: 'name',
                    type: 'text',
                    placeholder: translate('bdgt_defaultAdjustments_filterAccountGroupText')
                },                
                {
                    key: 'adjPercent'                    
                }
            ];
        };
        return model;
    }

    angular
        .module("budgeting")
        .factory('commentsConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

