(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('comments-rule');

        bundle.set({

            bdgt_comments_rule_Heading: 'Rules Based Comments',
            bdgt_comments_rule_SourceTxt: 'Source',
            bdgt_comments_rules_grdAccntType:'Account Type',
            bdgt_comments_rules_grdOperator:'Criteria',
            bdgt_comments_rules_grdType:'Type',
            bdgt_comments_rules_grdAmount:'Amount',
            bdgt_comments_rules_grdNote:'Comment',
            bdgt_comments_rule_edit:"Edit",
            bdgt_comments_rule_cancel:"Cancel",
            bdgt_comments_rule_save:"Save",
            bdgt_comments_rule_source:"Source",
            comments_rule_get_msgs_inv_param_txt:"Invalid parameters are passed, unable to get the data",
            comments_rule_get_msgs_ntfnd_err_desc:"Data is not found",
            comments_rule_put_msgs_inv_param_txt:"Invalid parameters are passed, unable to save the data",
            comments_rule_save_succ_msg_txt:"Rule based comments data is saved successfully",
            comments_rule_select_record_txt:"Please select atlease one record to save"
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
