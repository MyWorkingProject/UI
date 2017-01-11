(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_comments_showfilterText',
            'bdgt_comments_hidefilterText',
            'bdgt_comments_pageHeading',
            'bdgt_comments_addBtnText',
            'bdgt_comments_getEmptyMsg',
            'bdgt_comments_grdComment',
            'bdgt_comments_grdAppliesTo',
            'bdgt_comments_grdCreatedBy',
            'bdgt_comments_grdCreatedDate',
            'bdgt_comments_grdStatus',
            'bdgt_comments_filterCommentsText',
            'bdgt_comments_filterappliesToText',
            'bdgt_comments_filterCreatedByText',
            'bdgt_comments_filterStatusText',
            'bdgt_comments_erroPopText',
            'bdgt_comments_invalid_param',
            'bdgt_comments_unknown_error',
            'bdgt_comments_print',
            'bdgt_comments_responses_showVisibilityOptions',                        
            'bdgt_comments_responses_postBtnText',
            'bdgt_comments_responses_txtAreaPlaceHoder',
            'bdgt_comments_dashboard_comment_new',
            'bdgt_comments_dashboard_comment_edit',
            'bdgt_comments_dashboard_comment_property',
            'bdgt_comments_responses_modalHeader',
            'bdgt_comments_dashboard_comment_pintostart',
            'bdgt_comments_dashboard_comment_choose_property',
            'bdgt_comments_dashboard_comment_choose_model',
            'bdgt_comments_dashboard_comment_choose_date',
            'bdgt_comments_dashboard_comment_choose_property_lbl',
            'bdgt_comments_dashboard_comment_choose_model_lbl',
            'bdgt_comments_dashboard_comment_choose_year_lbl',
            'bdgt_comments_dashboard_comment_success_create',
            'bdgt_comments_dashboard_comment_success_update',
            'bdgt_comments_dashboard_comment_success_delete',
            'bdgt_comments_dashboard_comment_responses',
            'bdgt_comments_dashboard_response_success_create',
            'bdgt_comments_dashboard_response_success_edit',
            'bdgt_comments_dashboard_response_success_delete',
            'bdgt_comments_dashboard_comment_invalid_param',
            'bdgt_comments_dashboard_comment_get_invalid_param',
            'bdgt_comments_dashboard_comment_create_update_invalid_param',
            'bdgt_comments_dashboard_comment_delete_invalid_param',
            'bdgt_comments_dashboard_comment_delete_invalid_comment_source',
            'bdgt_comments_dashboard_comment_response_create_update_invalid_param',
            'bdgt_comments_dashboard_comment_response_delete_invalid_param'
            


        ];

        appLangKeys.app('budgetComments').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
