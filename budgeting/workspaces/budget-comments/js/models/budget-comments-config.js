//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('budgetComments').translate;

        model.get = function () {
            return [{
                    key: 'thumb p-l-0',
                    type: 'custom',
                    templateUrl: 'app/templates/budget-comments-profile-pic.html'
                },  
                 {
                     key: 'comment',
                     type: 'custom',
                     templateUrl: 'app/templates/budget-comments.html'
                 },
                 {
                    key: 'responseCount',
                    type: 'custom',
                    templateUrl: 'app/templates/budget-comments-responses.html'
                },
                {
                    key: 'appliesTo'
                }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('bdgt_comments_grdCreatedBy'),
                        isSortable: true,
                        key: 'thumb'
                    },
                      
                    {
                        text: translate('bdgt_comments_grdComment'),
                        isSortable: true,
                        key: 'comment'
                    }, 
                    {
                        text: translate('bdgt_comments_grdResponses'),
                        key: 'responseCount',
                        isSortable: true,
                        className: 'status'
                    },              
                    {
                        text: translate('bdgt_comments_grdAppliesTo'),
                        key: 'appliesTo',
                        isSortable: true,
                        className: 'appliesTo'
                    }
                ]
            ];
        };

        model.getFilters = function () {
            return [

                {
                    key: 'createdBy',
                    type: 'text',
                    placeholder: translate('bdgt_comments_filterCreatedByText')
                },                
                {
                    key: 'comment',
                    type: 'text',
                    placeholder: translate('bdgt_comments_filterCommentsText')
                },
                {
                    key: 'responseCount'
                    
                },                
                {
                    key: 'appliesTo',
                    type: 'text',
                    placeholder: translate('bdgt_comments_filterappliesToText')
                }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('commentsConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

