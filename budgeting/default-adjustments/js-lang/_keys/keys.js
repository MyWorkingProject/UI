(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_defaultAdjustments_showfilterText',
            'bdgt_defaultAdjustments_hidefilterText',
            'bdgt_defaultAdjustments_pageHeading',
            'bdgt_defaultAdjustments_pageHeadingTitle',
            'bdgt_defaultAdjustments_assignBtnText',
            'bdgt_defaultAdjustments_recordsSelected',
            'bdgt_defaultAdjustments_accountType',
            'bdgt_defaultAdjustments_accountGroup',
            'bdgt_defaultAdjustments_defaultPercentage',
            'bdgt_defaultAdjustments_overwriteDefaultAdjustment',
            'bdgt_defaultAdjustments_selectAnyChkBox',
            'bdgt_defaultAdjustments_applyAdjustmentBtnText',
            'bdgt_defaultAdjustments_cancelBtnText',
            'bdgt_defaultAdjustments_modelHeadingtxt',
            'bdgt_defaultAdjustments_modelHeadingTitle',
            'bdgt_defaultAdjustments_modelTxtBoxPlaceHolder',
            'bdgt_defaultAdjustments_modelAssignBtnTxt',
            'bdgt_defaultAdjustments_modelSelectCheckBoxErrorMsg',
            'bdgt_defaultAdjustments_modelEnterValueErrorMsg',            
            'bdgt_defaultAdjustments_filterAccountTypeText',
            'bdgt_defaultAdjustments_filterAccountGroupText',
            'bdgt_defaultAdjustments_leaveComment',
            'bdgt_defaultAdjustments_defaultRequired',
            'bdgt_defaultAdjustments_erroPopText',
            'bdgt_defaultAdjustments_invalid_param',
            'bdgt_defaultAdjustments_unknown_error',
            'bdgt_defaultAdjustments_filterTxt',
            'bdgt_defaultAdjustments_selectAll',
            'bdgt_defaultAdjustments_none',
            'bdgt_defaultAdjustments_getEmptyMsg'

        ];

        appLangKeys.app('defaultsAdjustments').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
