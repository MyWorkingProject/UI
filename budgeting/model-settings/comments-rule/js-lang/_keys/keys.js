(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'bdgt_comments_rule_Heading',
            'bdgt_comments_rule_SourceTxt',
            'bdgt_comments_rules_grdAccntType',
            'bdgt_comments_rules_grdOperator',
            'bdgt_comments_rules_grdType',
            'bdgt_comments_rules_grdAmount',
            'bdgt_comments_rules_grdNote',
            'bdgt_comments_rule_edit',
            'bdgt_comments_rule_cancel',
            'bdgt_comments_rule_save',
            'bdgt_comments_rule_source',
            'comments_rule_get_msgs_inv_param_txt',
            'comments_rule_get_msgs_ntfnd_err_desc',
            'comments_rule_put_msgs_inv_param_txt',
            'comments_rule_save_succ_msg_txt',
            'comments_rule_select_record_txt'
        ];

        appLangKeys.app('comments-rule').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
