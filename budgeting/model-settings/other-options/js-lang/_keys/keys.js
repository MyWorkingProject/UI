(function (angular) {
    'use strict';

    function config(appLangKeys) {
        var keys = [
            'other_options_page_title',
            'form_property_title',
            'form_hudid',
            'form_owner',
            'form_yearbuilt',
            'form_propertycode',
            'form_otherassumptions_title',
            'form_attached_garages',
            'form_storage_units',
            'form_detached_garages',
            'form_carports',
            'form_payroll_options_title',
            'form_dateofincrease',
            'form_increase_percent',

            'ph_hudid',
            'ph_owner',
            'ph_yearbuilt',
            'ph_propertycode',
            'ph_attachedGarages',
            'ph_storageUnits',
            'ph_detachedGarages',
            'ph_carports',
            'ph_dateofincrease',
            'ph_increasePercent',

            'form_save',
            'form_cancel',
            'form_edit',

            'error_hudid',
            'error_owner',
            'error_yearbuilt',
            'error_propertycode',
            'error_attachedGarages',
            'error_storageUnits',
            'error_detachedGarages',
            'error_carports',
            'error_dateofincrease',
            'error_increasePercent',

            'ex_saveOtherOptionsException_title',
            'ex_saveOtherOptionsException_desc',
            'ex_saveOtherOptionsException_info',

            'ex_getOtherOptionsNotFoundException_title',
            'ex_getOtherOptionsNotFoundException_desc',
            'ex_getOtherOptionsNotFoundException_info',

            'ex_getOtherOptionsException_title',
            'ex_getOtherOptionsException_desc',
            'ex_getOtherOptionsException_info',
            'saveSuccess',
            'product_tool_tip',
            'validation_attachedGarages',
            'validation_storageUnits',
            'validation_detachedGarages',
            'validation_carports',
            'validation_payrollPercent'

        ];

        appLangKeys.app('otherOptions').set(keys);
    }

    angular
        .module('budgeting')
        .config(['appLangKeysProvider', config]);
})(angular);
