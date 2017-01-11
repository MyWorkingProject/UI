//  English Resource Bundle for allocation distribution

(function () {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('allocationEdit');

        bundle.set({
            form_title: "ALLOCATION",
            form_allocation_name: "Name",
            form_allocation_method: "Method",
            form_allocation_description: "Descripition",
            form_allocation_amounts: "ALLOCATION AMOUNTS",
            form_allocation_properties: "PROPERTIES",
            form_allocation_addProperty: "Add Property",
            form_allocation_assignGl: "Assign GL Accounts",
            form_allocation_filter: "Filter",
            form_allocation_save: "Save",
            form_allocation_cancel: "Cancel",
            form_allocation_edit: "Edit",
            form_allocation_calculator: "Calculator",
            form_allocation_distribute: "Distribute",
            form_allocation_recall: "Recall",
            form_allocation_propertyName: "Property",
            form_allocation_master_chart: "Master Chart",
            form_allocation_glaccount: "GL Account",
            form_allocation_sqft: "Sq.Ft",
            form_allocation_allocation_per: "Allocation",
            form_allocation_amount: "Amount",
            form_allocation_units: "Units",
            form_allocation_account_description: "AccountDescription",
            form_allocation_propertyname: "PropertyName",
            method_equally: "Equally",
            method_inputamount: "Input Amount",
            method_percentage: "Input Percentage",
            method_units: "Number of Units",
            method_sqftg: "Total Square Footage",
            form_allocaton_newName: "New Allocation",
            delete:''
        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
