//  Budget Model Error Model

(function (angular) {
    "use strict";

    function marketRentMsgSVC(nfnSvc, langTranslate, navModel) {
        var model, notification, options, translate;
        translate = langTranslate('market-rent').translate;

        model = {};
        //notification = notificationModel();
        options = {};

        model.emptyData = {
            getErrorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_rental_mr_get_msgs_inv_param_txt'),
                    desc: translate('bdgt_rental_mr_get_msgs_inv_param_txt'),
                    info: translate('comments-rule_get_msgs_inv_param_txt')
                },
                "NOT_FOUND": {
                    title: translate('bdgt_rental_mr_get_msgs_ntfnd_err_desc'),
                    desc: translate('bdgt_rental_mr_get_msgs_ntfnd_err_desc'),
                    info: translate('bdgt_rental_mr_get_msgs_ntfnd_err_desc')
                }
            },
            putErrorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_rental_mr_put_msgs_inv_param_txt'),
                    desc: translate('bdgt_rental_mr_put_msgs_inv_param_txt'),
                    info: translate('bdgt_rental_mr_put_msgs_inv_param_txt')
                }
            }
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        model.fetchErrorMessage = function (err) {
            if (err.data.message !== undefined && err.data.message !== "") {
                return model.getKeyFromMessage(err.data.message);
            }
            else {
                return err.data.message;
            }
        };

        model.errorHasKey = function (msg) {
            return msg.match("|");
        };

        model.getKeyFromMessage = function (msg) {
            var array = msg.split('|');
            return array[0];
        };

        model.wrapShowMsg = function (msg,obj) {
            if (obj[msg]) {
                model.showErrorMsg(obj[msg]);
            }
            else {
                logc("Budget Market rent settings module: Error not defined");
            }
        };

        model.isStatus = function (resp, status) {
            if (resp.status === status) {
                return true;
            }
            else {
                return false;
            }
        };

        model.onGetError = function (resp) {
            //if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg, model.form.getErrorMsgs);
            //}
        };

        model.onPutError = function (resp) {
           // if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg,model.form.putErrorMsgs);
            //}
        };

        model.showErrorMsg = function (msg) {
            model.showNotification(msg.desc);
        };

        model.showNotification = function (data) {
            nfnSvc.error(data);
        };

        model.showSaveSuccNotification = function () {
            if(navModel.isMarketRent()){
                nfnSvc.success(translate('bdgt_rental_mr_save_msg'));
            }
            else{
                 nfnSvc.success(translate('bdgt_rental_sr_save_msg'));
            }
        };

        model.showSaveErrorNotification = function () {
           if(navModel.isMarketRent()){
                nfnSvc.error(translate('bdgt_rental_mr_save_err_msg'));
            }
            else{
                nfnSvc.error(translate('bdgt_rental_sr_save_err_msg'));
            }
        };

        model.showDuplicateMsg = function(){
            nfnSvc.error(translate('bdgt_rental_mr_unitType_dup_err_msg'));
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('marketRentMsgSVC', [
            'notificationService',
            'appLangTranslate',
            'BdgtRentalIncomeModelNav',
            marketRentMsgSVC
        ]);
})(angular);
