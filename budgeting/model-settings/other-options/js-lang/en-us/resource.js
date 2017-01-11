(function (angular) {
    'use strict';

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('otherOptions');

        bundle.set({
            other_options_page_title: "Other Options",
            form_property_title: "Property Details",
            form_hudid: "HUD ID",
            form_owner: "Owner",
            form_yearbuilt: "Year Built",
            form_propertycode: "Property Code",

            form_otherassumptions_title: "Other Assumptions",
            form_attached_garages: "Attached Garages",
            form_storage_units: "Storage Units",
            form_detached_garages: "Detached Garages",
            form_carports: "Carports",

            form_payroll_options_title: "Payroll Options",
            form_dateofincrease: "Date of Increase",
            form_increase_percent: "Increase %",

            form_save: "Save",
            form_cancel: "Cancel",
            form_edit: "Edit",

            ph_hudid: "Enter HUD ID",
            ph_owner: "Enter owner",
            ph_yearbuilt: "Enter year built",
            ph_propertycode: "Enter property code",
            ph_attachedGarages: "Enter attached garages",
            ph_storageUnits: "Enter storage units",
            ph_detachedGarages: "Enter detached garages",
            ph_carports: "Enter carports",
            ph_dateofincrease: "Enter date of increase",
            ph_increasePercent: "Enter increase %",

            error_hudid: "Please enter HUD ID",
            error_owner: "Please enter owner",
            error_yearbuilt: "Please enter year built",
            error_propertycode: "Please enter property code",
            error_attachedGarages: "Please enter attached garages",
            error_storageUnits: "Please enter storage units",
            error_detachedGarages: "Please enter detached garages",
            error_carports: "Please enter carports",
            error_dateofincrease: "Please enter date of increase",
            error_increasePercent: "Please enter increase %",

            ex_saveOtherOptionsException_title:"Save failed",
            ex_saveOtherOptionsException_desc:"Unable to save other options",
            ex_saveOtherOptionsException_info: "Unable to save other options",

            ex_getOtherOptionsNotFoundException_title:"Other options not found",
            ex_getOtherOptionsNotFoundException_desc:"Not found",
            ex_getOtherOptionsNotFoundException_info: "Other options not found for the model",

            ex_getOtherOptionsException_title:"Get failed",
            ex_getOtherOptionsException_desc:"Unable to get other options",
            ex_getOtherOptionsException_info: "Unable to get other options",
            saveSuccess:"Other Options Saved Successfully",
            product_tool_tip:"Your home office may have assigned a code to your property.  You may enter that code here so that code may appear through Budgeting.",
            validation_attachedGarages:"Attached Garages Should be Positive Number",
            validation_storageUnits:"Storage Units Should be Positive Number",
            
            validation_detachedGarages:"Detached Garages Should be Positive Number",
            validation_carports:"Carports Should be Positive Number",
            validation_payrollPercent:"Please enter valid Percentage",


            
        });
    }

    angular
        .module('budgeting')
        .config(['appLangBundleProvider', config]);
})(angular);
