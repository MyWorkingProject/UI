//  Provides lang content for Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('accountByaccount.copy_comments').translate,
            model = {
                lblCopyComments: translate('bdgt_model_account_copy_comments_lbl_copy_comments'),
                lblModelType: translate('bdgt_model_account_copy_comments_lbl_model_type'),
                lblModelName: translate('bdgt_model_account_copy_comments_lbl_model_name'),
                lblCancel: translate('bdgt_model_account_copy_comments_lbl_cancel'),
                lblRequired: translate('bdgt_model_account_copy_comments_lbl_required'),
                lblSuccessMsg: translate('bdgt_model_account_copy_comments_lbl_success_msg'),
                selectModelName: translate('bdgt_model_account_copy_comments_select_model_name'),
                selectBudget: translate('bdgt_model_account_copy_comments_select_budget'),
                selectProforma: translate('bdgt_model_account_copy_comments_select_proforma'),
                selectForecast: translate('bdgt_model_account_copy_comments_select_forecast')
            };

        return model;
    }

    angular
        .module('budgeting')
        .factory('copyCommentsContentModel', [
        	'appLangTranslate',
        	factory]);
})(angular);
