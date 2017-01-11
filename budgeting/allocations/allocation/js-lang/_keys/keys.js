//  Configure App Language Keys

(function () {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'form_title',
            'form_allocation_name',
            'form_allocation_method',
            'form_allocation_description',
            'form_allocation_amounts',
            'form_allocation_properties',
            'form_allocation_addProperty',
            'form_allocation_assignGl',
            'form_allocation_filter',
            'form_allocation_save',
            'form_allocation_cancel',
            'form_allocation_edit',
            'form_allocation_calculator',
            'form_allocation_distribute',
            'form_allocation_recall',
            'form_allocation_propertyName',
            'form_allocation_master_chart',
            'form_allocation_glaccount',
            'form_allocation_sqft',
            'form_allocation_allocation_per',
            'form_allocation_amount',
            'form_allocation_units',
            'form_allocation_account_description',
            'form_allocation_propertyname',
            'method_equally',
            'method_inputamount',
            'method_percentage',
            'method_units',
            'method_sqftg',
            'form_allocaton_newName',
            'delete'

        ];

        appLangKeys.app('allocationEdit').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
