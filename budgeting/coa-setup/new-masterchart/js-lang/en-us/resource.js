//  English Resource Bundle for Admin Home Page

(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('newMasterchart');

        bundle.set({
            bdgt_cmpny_admin_header: 'OneSite Settings',
            bdgt_admin_header: 'Budgeting Administration',
            bdgt_admin_masterchart: 'Manage Chart Of Accounts',
            bdgt_admin_newmasterchart: 'New Chart',
            bdgt_newmasterchart_namelabel: 'Master Chart Name',
            bdgt_newmasterchart_namePlace: 'Master Chart Of Accounts',
            bdgt_newmasterchart_alternate: 'Alternate Chart',
            bdgt_newmasterchart_custom: "Use custom account structure",
            bdgt_newmasterchart_prefix: 'Prefix',
            bdgt_newmasterchart_suffix: 'Suffix',
            bdgt_newmasterchart_prefixPlace: 'Prefix',
            bdgt_newmasterchart_suffixPlace: 'Suffix',
            bdgt_newmasterchart_optional: 'optional',
            bdgt_newmasterchart_field1: 'Field 1',
            bdgt_newmasterchart_delimiter1: 'Seperator',
            bdgt_newmasterchart_field2: 'Field 2',
            bdgt_newmasterchart_delimiter2: 'Seperator',
            bdgt_newmasterchart_field3: 'Field 3',
            bdgt_newmasterchart_delimiter3: 'Seperator',
            bdgt_newmasterchart_field4: 'Field 4',
            bdgt_newmasterchart_accountStrText: 'Account Structure',
            bdgt_newmasterchart_reqmsg: 'Master chart name is required',
            bdgt_newmasterchart_dupmsg: 'Duplicate name',
            bdgt_newmasterchart_existsmsg: "Master Chart Name Exists",
            bdgt_newmasterchart_existsdetmsg: 'Already exists. Try with different chart name',
            bdgt_newmasterchart_altHelpText: 'To create the alternate chart for the reporting purpose',
            bdgt_newmasterchart_custmHelpText: 'To create the custom account structure',
            bdgt_newmasterchart_pageHeading: 'Define Chart',
            bdgt_newmasterchart_nextBtnText: 'Next',
            bdgt_newmasterchart_saveBtnText: 'Save',
            bdgt_newmasterchart_cancelBtnText: 'Cancel',
            bdgt_newmasterchart_AlterChartlblText: 'Alternate Chart Name',
            bdgt_newmasterchart_AlterChartmarkText: 'Alternate Chart Of Accounts',
            bdgt_newmasterchart_chart_not_found: 'Requested master chart with the specified master chart ID not found',
            bdgt_newmasterchart_invalid_param: 'Master chart ID is invalid',
            bdgt_newmasterchart_erroPopText: 'Error',
            bdgt_newmasterchart_wizard_update_failure: 'Error occurred while updating wizard status',
            bdgt_newmasterchart_editChartText: 'Edit Chart',
            bdgt_newmasterchart_customAccntText: 'Custom Account Structure',
            bdgt_newmasterchart_filed1msg: 'Please select field1 other than none when custom account is checked'

        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
