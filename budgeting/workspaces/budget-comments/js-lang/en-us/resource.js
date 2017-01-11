(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('budgetComments');

        bundle.set({

            bdgt_comments_showfilterText:'Show Filters',
            bdgt_comments_hidefilterText:'Hide Filters',
            bdgt_comments_pageHeading: 'Manage Comments',
            bdgt_comments_addBtnText:'New Comment',
            bdgt_comments_getEmptyMsg:'No Comments to display',
            bdgt_comments_grdComment:'Comment',
            bdgt_comments_grdAppliesTo:'Applies To',
            bdgt_comments_grdCreatedBy:'User',
            bdgt_comments_grdCreatedDate:'Created Date',
            bdgt_comments_grdResponses:'Responses',
            bdgt_comments_filterCommentsText:'Filter by comment',
            bdgt_comments_filterappliesToText:'Filter by applies to',
            bdgt_comments_filterCreatedByText:'Filter by user',
            bdgt_comments_filterStatusText:'Filter by status',
            bdgt_comments_erroPopText:'Error',
            bdgt_comments_invalid_param: 'Invalid parameters passed',
            bdgt_comments_unknown_error:'Un known Error occurred while retreiving data',
            bdgt_comments_print: 'Print',            
            bdgt_comments_responses_showVisibilityOptions:'Show Visibility Options',            
            bdgt_comments_responses_postBtnText:'Post',
            bdgt_comments_responses_txtAreaPlaceHoder: 'Leave a Comment',
            bdgt_comments_responses_modalHeader:'Comments',
            bdgt_comments_dashboard_comment_new : 'New Comment',
            bdgt_comments_dashboard_comment_edit: 'Edit Comment',
            bdgt_comments_dashboard_comment_property: 'Applies to',
            bdgt_comments_dashboard_comment_pintostart: 'Pin to start page until',
            bdgt_comments_dashboard_comment_choose_property:'Property',
            bdgt_comments_dashboard_comment_choose_model:'Model',
            bdgt_comments_dashboard_comment_choose_year: 'Year',
            bdgt_comments_dashboard_comment_choose_property_lbl: 'Choose a Property',
            bdgt_comments_dashboard_comment_choose_model_lbl: 'Choose a Model',
            bdgt_comments_dashboard_comment_choose_year_lbl: 'Choose a Year',
            bdgt_comments_dashboard_comment_responses : 'Responses',
            bdgt_comments_dashboard_comment_success_create :'Comment created successfully',
            bdgt_comments_dashboard_comment_success_update: 'Comment updated successfully',
            bdgt_comments_dashboard_comment_success_delete: 'Comment deleted successfully',
            bdgt_comments_dashboard_response_success_create: 'Comment response created successfully',
            bdgt_comments_dashboard_response_success_edit: 'Comment response updated successfully',
            bdgt_comments_dashboard_response_success_delete: 'Comment response deleted successfully',
            bdgt_comments_dashboard_comment_get_invalid_param: 'Comment ID is invalid', // comment response id while hettimg comment data on user clicks
            bdgt_comments_dashboard_comment_create_update_invalid_param: 'Comment Save Model object is invalid', // while creating dashboard comment and updating dashboad comment
            bdgt_comments_dashboard_comment_delete_invalid_param: 'GL AccountComment object is invalid', // while creating dashboard comment and updating dashboad comment
            bdgt_comments_dashboard_comment_delete_invalid_comment_source: 'Comment source is invalid', // while creating dashboard comment and updating dashboad comment
            bdgt_comments_dashboard_comment_response_create_update_invalid_param: 'Comment response object is invalid', //dashboard comment responses create edit 
            bdgt_comments_dashboard_comment_response_delete_invalid_param: 'Comment response id is invalid' // deleting dashboard comment responses
            
            

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
