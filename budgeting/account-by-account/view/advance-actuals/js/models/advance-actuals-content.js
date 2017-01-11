//  Provides lang content for Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('accountByaccount.advance_actuals').translate,
            model = {
                lblAdvanceActuals: translate('bdgt_model_account_advance_actuals_header_text'),
                lblUseActuals: translate('bdgt_model_account_advance_actuals_lbl_use_actuals'),
                lblCancel: translate('bdgt_model_account_advance_actuals_lbl_cancel'),
                lblApplyActuals: translate('bdgt_model_account_advance_actuals_lbl_apply_actuals'),
                lblModalTitle: translate('bdgt_model_account_advance_actuals_modal_title'),
                lblModalData: translate('bdgt_model_account_advance_actuals_modal_data'),
                lblConfirmText: translate('bdgt_model_account_advance_actuals_confirm_text'),
                lblUpdate: translate('bdgt_model_account_advance_actuals_lbl_update_btn'),
                lblSuccessMsg: translate('bdgt_model_account_advance_actuals_lbl_success_msg')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('advanceActualsContentModel', [
        	'appLangTranslate',
        	factory]);
})(angular);
