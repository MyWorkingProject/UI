//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('comments-rule').translate;

        model.get = function () {
            return [{
                    key: 'isSelected',
                    type: 'select',
                    //templateUrl: 'app/templates/budget-comments-profile-pic.html'
                },
                {
                    key: 'accountTypeCode',
                },
                {
                    key:'operator',
                    type: 'custom',
                    templateUrl: 'app/templates/rules-criteria.html'
                },
                 {
                     key: 'type',
                     type: 'custom',
                     templateUrl: 'app/templates/rules-type.html'
                 },
                 {
                    key: 'amount',
                    type: 'custom',
                    templateUrl: 'app/templates/rules-amount.html'
                },
                {
                    key: 'note',
                    type: 'custom',
                    templateUrl: 'app/templates/rules-comments.html'
                }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        //text: translate('bdgt_comments_rules_grdCreatedBy'),
                        key: 'isSelected',
                        type: 'select',
                        text: ''
                    },
                    {
                       
                        key: 'accountTypeCode',
                        text: translate('bdgt_comments_rules_grdAccntType'),
                        //isSortable: true,
                        className: 'accountTypeCode'

                    },                    
                    {
                        text: translate('bdgt_comments_rules_grdOperator'),
                        key: 'operator'
                    }, 
                    {
                        text: translate('bdgt_comments_rules_grdType'),
                        key: 'type',
                    },              
                    {
                        text: translate('bdgt_comments_rules_grdAmount'),
                        key: 'amount'
                        
                    },
                    {
                        text: translate('bdgt_comments_rules_grdNote'),
                        key: 'note'
                        
                    }
                ]
            ];
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('budgetCommentsRulesConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

