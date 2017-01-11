//  Roles List Config Model

(function (angular) {
    "use strict";

    function factory(gridConfig, langTranslate) {
        var config, model = gridConfig();
        var translate;
        translate = langTranslate('actual-rent-cap').translate;

        model.get = function () {
            return [{
                    key: 'description',
                },  
                 {
                     key: 'marketRentAmount',
                 },
                 {
                    key: 'capAmount',
                    type: 'custom',
                    templateUrl: 'app/templates/actul-rent-cap-amnt.html'
                }
            ];
        };

        model.getHeaders = function () {
            return [
                [
                    {
                        text: translate('actual_rent_cap_unittype'),
                        isSortable: false,
                        key: 'description'
                    },
                      
                    {
                        text: translate('actual_rent_cap_avg_market'),
                        isSortable: false,
                        key: 'marketRentAmount'
                    }, 
                    {
                        text: translate('actual_rent_cap_amount'),
                        key: 'capAmount'
                    }
                ]
            ];
        };

      /*  model.getFilters = function () {
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
        }; */

        return model;
    }

    angular
        .module("budgeting")
        .factory('actualRentCapConfig', ['rpGridConfig', 'appLangTranslate', factory]);
})(angular);

