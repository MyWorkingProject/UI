(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('defaultsAdjustments');

        bundle.set({
                    
            bdgt_defaultAdjustments_pageHeading: 'Default Adjustments',
            bdgt_defaultAdjustments_pageHeadingTitle: 'Tax Credit Master Chart',
            bdgt_defaultAdjustments_assignBtnText:'Assign Default %',
            bdgt_defaultAdjustments_recordsSelected: 'Records Selected out of',
            bdgt_defaultAdjustments_showfilterText: 'Show Filters',
            bdgt_defaultAdjustments_accountType: 'Account Type',
            bdgt_defaultAdjustments_accountGroup: 'Account Group',
            bdgt_defaultAdjustments_defaultPercentage:'Default %',
            bdgt_defaultAdjustments_overwriteDefaultAdjustment: 'Overwrite default adjustment %',
            bdgt_defaultAdjustments_selectAnyChkBox: 'To assign default % at least a record should be selected in the account groups',
            bdgt_defaultAdjustments_applyAdjustmentBtnText:'Apply Adjustments',
            bdgt_defaultAdjustments_cancelBtnText:'Cancel',
            bdgt_defaultAdjustments_modelHeadingtxt: 'Assign Default %',
            bdgt_defaultAdjustments_modelHeadingTitle: 'Default %',
            bdgt_defaultAdjustments_modelTxtBoxPlaceHolder:'Enter Value',
            bdgt_defaultAdjustments_modelAssignBtnTxt: 'Assign',
            bdgt_defaultAdjustments_leaveComment: 'Enter a Value',
            bdgt_defaultAdjustments_toolTip: 'Selecting this option will help you to overwrite the default adjustment percentage saved at the GL account level',
            bdgt_defaultAdjustments_defaultRequired:'Defaults % field is required',
            bdgt_defaultAdjustments_modelSelectCheckBoxErrorMsg:'Please select any check box to assign defaults',
            bdgt_defaultAdjustments_modelEnterValueErrorMsg:'Please Enter a value',            
            bdgt_defaultAdjustments_filterAccountTypeText: 'Filter By Account Type',
            bdgt_defaultAdjustments_filterAccountGroupText: 'Filter By Account Group',
            bdgt_defaultAdjustments_success_msg: 'Default Adjustments successfully updated',
            bdgt_defaultAdjustments_erroPopText:'Error',
            bdgt_defaultAdjustments_invalid_param:'Invalid parameters passed',
            bdgt_defaultAdjustments_unknown_error: 'Un known Error occurred while retreiving data',
            bdgt_defaultAdjustments_selectAll:'Select All',
            bdgt_defaultAdjustments_none: 'None',
            bdgt_defaultAdjustments_getEmptyMsg: 'No Records to display'
            
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
