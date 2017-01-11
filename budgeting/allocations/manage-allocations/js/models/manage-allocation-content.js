// Manage Allocation content
(function (angular) {
    'use strict';
    function factory(langTranslate) {
        var translate = langTranslate('allocations.manage-allocations').translate,
         model = {
             pageHeading: translate('bdgt_allocation_page_Headings'),
             newAlloction: translate('bdgt_allocation_new_allocation'),
             alertpopupTitleInfo: translate('bdgt_allocation_alertpopupTitleInfo'),
             alertpopupMessageInfo: translate('bdgt_allocation_alertpopupMessageInfo'),
             alertpopupBtnInfo: translate('bdgt_allocation_alertpopupBtnInfo')

         };
        return model;
    }
    angular.module('budgeting').
            factory('manageAllocationsContent', ['appLangTranslate', factory]);
})(angular);