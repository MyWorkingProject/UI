(function (angular) {
    "use strict";

    function config(appLangKeys) {
        var keys = [
            'bdgt_contracts_PageHeaderText',
            'bdgt_contracts_hideFilters',
            'bdgt_contracts_showFilters',
            'bdgt_contracts_print',
            'bdgt_contracts_importGLAccount',
            'bdgt_contracts_addContract',

            //Headers

            'bdgt_contracts_headers_actions',
            'bdgt_contracts_headers_property',
            'bdgt_contracts_headers_vendor',
            'bdgt_contracts_headers_description',
            'bdgt_contracts_headers_status',
            'bdgt_contracts_headers_startDate',
            'bdgt_contracts_headers_endDate',
            'bdgt_contracts_headers_amount',
            'bdgt_contracts_headers_percentage',
            'bdgt_contracts_headers_total',

            //Filters

            'bdgt_contracts_filters_property',
            'bdgt_contracts_filters_vendor',
            'bdgt_contracts_filters_description',

            //Actions

            'bdgt_contracts_actions_view',
            'bdgt_contracts_filters_removeNotification',
            'bdgt_contracts_filters_edit',
            'bdgt_contracts_filters_delete',
           'bdgt_contracts_deleteContract',
           'bdgt_contracts_removeContract',


           ' ex_getData_invalidParams_title',
            'ex_getData_desc',
            'ex_getData_info',
            'ex_getData_title_unKnown_error',
            'ex_getData_desc_unKnown_error',
            'ex_getData_info_unknown_error',
            'bdgt_contracts_tootlTip_remove',
            'bdgt_contracts_tootlTip_delete',
            'bdgt_contracts_selectText',
            'bdgt_contracts_deleteHeader',
            'bdgt_contracts_deleteDesc',
            'bdgt_contracts_deleteConf',
            'Continue',
            'Cancel'
        ];

        appLangKeys.app('contracts').set(keys);
    }

    angular
        .module("budgeting")
        .config(['appLangKeysProvider', config]);
})(angular);
