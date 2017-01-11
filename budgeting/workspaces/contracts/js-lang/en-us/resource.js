(function (angular) {
    "use strict";

    function config(appLangBundle) {
        var bundle = appLangBundle.lang('en-us').app('contracts');

        bundle.set({

            bdgt_contracts_PageHeaderText: 'Contracts',
            bdgt_contracts_hideFilters: 'Hide Filters',
            bdgt_contracts_showFilters: 'Show Filters',

            bdgt_contracts_print: 'Print',
            bdgt_contracts_importGLAccount: 'Import',
            bdgt_contracts_addContract: 'New Contract',

            bdgt_contracts_headers_actions: 'Actions',
            bdgt_contracts_headers_property: 'Property',
            bdgt_contracts_headers_vendor: 'Vendor',
            bdgt_contracts_headers_description: 'Description',
            bdgt_contracts_headers_status: 'Status',
            bdgt_contracts_headers_startDat: 'Start Date',
            bdgt_contracts_headers_endDat: 'End Date',
            bdgt_contracts_headers_amount: 'Amount',
            bdgt_contracts_headers_percentage: 'Allocation %',
            bdgt_contracts_headers_total: 'Total',

            //Filters

            bdgt_contracts_filters_property: 'Filter by property',
            bdgt_contracts_filters_vendor: 'Filter by vendor',
            bdgt_contracts_filters_description: 'Filter by description',

            //Actions

            bdgt_contracts_actions_view: 'View',
            bdgt_contracts_filters_removeNotification: 'Remove Notification',
            bdgt_contracts_filters_edit: 'Edit',
            bdgt_contracts_filters_delete: 'Delete',
            bdgt_contracts_deleteContract: 'Delete',
            bdgt_contracts_removeContract: 'Remove',


            ex_getData_invalidParams_title: "Invalid Params",
            ex_getData_desc: "Property ID is invalid",
            ex_getData_info: 'Invalid Parameter Passed',
            ex_getData_title_unKnown_error: "Unknown Error",
            ex_getData_desc_unKnown_error: "Unable to return Contract list becasue of no records found",
            ex_getData_info_unknown_error: "No records not found",
            bdgt_contracts_tootlTip_remove:"Select at least one contract notification to remove.",
            bdgt_contracts_tootlTip_delete:"Select at least one contract to delete.",
            bdgt_contracts_selectText:"",
             bdgt_contracts_deleteHeader:"Deleting Contract",
            bdgt_contracts_deleteDesc:"Selected contract is already used in the models in progress.",
            bdgt_contracts_deleteConf:"Do you wish to continue?",
            bdgt_contracts_Continue:"Continue",
            bdgt_contracts_Cancel:"Cancel"


        });
    }

    angular
        .module("budgeting")
        .config(['appLangBundleProvider', config]);
})(angular);
