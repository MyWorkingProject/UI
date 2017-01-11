//  Import GL Account Message handling Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model, translate, notification, options;
        translate = langTranslate('import').translate;
        model = {};

        notification = notificationModel();
        options = {};

        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_import_error_title_invalid_param'),
                    desc: translate('bdgt_import_error_desc_invalid_param'),
                    info: translate('bdgt_import_error_info_invalid_param')
                },
                "OSA_ERROR": {
                    title: translate('bdgt_import_error_title_osa_error'),
                    desc: translate('bdgt_import_error_desc_osa_error'),
                    info: translate('bdgt_import_error_info_osa_error')
                },
                "NO_OSA_GLACCOUNTS": {
                    title: translate('bdgt_import_error_title_no_osa_gls'),
                    desc: translate('bdgt_import_error_desc_no_osa_gls'),
                    info: translate('bdgt_import_error_info_no_osa_gls')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_import_error_title_unknown_error'),
                    desc: translate('bdgt_import_error_desc_unknown_error'),
                    info: translate('bdgt_import_error_info_unknown_error')
                },
                "MEDIA_TYPE": {
                    title: translate('bdgt_import_error_title_media_type'),
                    desc: translate('bdgt_import_error_desc_media_type'),
                    info: translate('bdgt_import_error_info_media_type')
                },
                "MISSING_COLUMNS": {
                    title: translate('bdgt_import_error_title_missing_cols'),
                    desc: translate('bdgt_import_error_desc_missing_cols'),
                    info: translate('bdgt_import_error_info_missing_cols')
                },
                "INVACTTYPE": {
                    title: translate('bdgt_import_error_title_invalid_acc_type'),
                    desc: translate('bdgt_import_error_desc_invalid_acc_type'),
                    info: translate('bdgt_import_error_info_invalid_acc_type')
                },
                "FILE_NOT_FOUND": {
                    title: translate('bdgt_import_error_title_csv_temp_not_found'),
                    desc: translate('bdgt_import_error_desc_csv_temp_not_found'),
                    info: translate('bdgt_import_error_info_csv_temp_not_found')
                },
                "CHART_NOT_FOUND": {
                    title: translate('bdgt_import_error_title_chart_not_found'),
                    desc: translate('bdgt_import_error_desc_chart_not_found'),
                    info: translate('bdgt_import_error_info_chart_not_found')
                },
                "OSA_SETUP_NOT_FOUND": {
                    title: translate('bdgt_import_error_title_osa_error'),
                    desc: translate('bdgt_import_error_desc_osa_error'),
                    info: translate('bdgt_import_error_info_osa_error')
                },
                "RPX_ERROR": {
                    title: translate('bdgt_import_error_title_rpx_error'),
                    desc: translate('bdgt_import_error_desc_rpx_error'),
                    info: translate('bdgt_import_error_info_rpx_error')
                },
                "DUPGLACCOUNT": {
                    title: translate('bdgt_import_error_title_dup_gl_accnt'),
                    desc: translate('bdgt_import_error_desc_dup_gl_accnt'),
                    info: translate('bdgt_import_error_info_dup_gl_accnt')
                },
                "INVACTLEVEL": {
                    title: translate('bdgt_import_error_title_invalid_acc_level'),
                    desc: translate('bdgt_import_error_desc_invalid_acc_level'),
                    info: translate('bdgt_import_error_info_invalid_acc_level')
                },
                "INVNORMALBAL": {
                    title: translate('bdgt_import_error_title_invalid_normal_bal'),
                    desc: translate('bdgt_import_error_desc_invalid_normal_bal'),
                    info: translate('bdgt_import_error_info_invalid_normal_bal')
                },
                "RPX_PROVIDER_NOT_FOUND": {
                    title: translate('bdgt_import_error_title_rpx_prov_error'),
                    desc: translate('bdgt_import_error_desc_rpx_prov_error'),
                    info: translate('bdgt_import_error_info_rpx_prov_error')
                },
                "NO_FOREIGN_PROPERTY": {
                    title: translate('bdgt_import_error_title_no_property_found'),
                    desc: translate('bdgt_import_error_desc_no_property_found'),
                    info: translate('bdgt_import_error_info_no_property_found')
                },
                "NO_Yardi_GLACCOUNTS": {
                    title: translate('bdgt_import_error_title_no_yardi_gls'),
                    desc: translate('bdgt_import_error_desc_no_yardi_gls'),
                    info: translate('bdgt_import_error_info_no_yardi_gls')
                }
            }
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        //Calling onError method on every function call,
        //need to discuss on this as we are going to show same meesage on every respective error type irrespective of operation.
        //Need to update errorObj if it should be different message on different operations.
        model.getGlAccsError = function (resp) {
            model.onError(resp);
        };

        model.getChartsError = function (resp) {
            model.onError(resp);
        };

        model.getPropertiesError = function (resp) {
            model.onError(resp);
        };

        model.saveGlAccsError = function (resp) {
            model.onError(resp);
        };

        model.getStatusError = function (resp) {
            model.onError(resp);
        };

        model.getFiltOptionsError = function (resp) {
            model.onError(resp);
        };

        model.getStagingDataError = function (resp) {
            model.onError(resp);
        };

        model.delGlAccsError = function (resp) {
            model.onError(resp);
        };

        model.getCsvTemplateError = function (resp) {
            model.onFileNotFoundErr(resp);
        };

        model.loadCSVFileError = function (resp) {
            model.onError(resp);
        };

        model.getYardiPropError = function (resp) {
            model.onError(resp);
        };

        model.getYardiAccsError = function (resp) {
            model.onError(resp);
        };

        model.updateAccTypeError = function (resp) {
            model.onError(resp);
        };

        model.getChartDataError = function (resp) {
            model.onError(resp);
        };

        model.delStagingDataError = function (resp) {
            model.onError(resp);
        };

        model.updateWizStepError = function (resp) {
            model.onError(resp);
        };

        model.fetchErrorMessage = function (err) {
            if (model.errorHasKey(err.data.message)) {
                return model.getKeyFromMessage(err.data.message);
            }
            else {
                return err.data.message;
            }
        };

        model.errorHasKey = function (msg) {
            if (msg.indexOf("|") > -1) {
                return true;
            }
            return false;
        };

        model.getKeyFromMessage = function (msg) {
            var array = msg.split('|');
            return array[0];
        };

        model.wrapShowMsg = function (msg) {
            if (model.form.errorMsgs[msg]) {
                model.showErrorMsg(model.form.errorMsgs[msg]);
            }
            else {
                logc("Import Error Handling Module: Error not defined");
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

        model.onFileNotFoundErr = function (resp) {
            if (model.isStatus(resp, 404)) {
                model.wrapShowMsg("FILE_NOT_FOUND");
            }
        };

        model.onError = function (resp) {
            if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg);
            }
        };

        model.showErrorMsg = function (msg) {
            options = {
                type: 'error',
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.showSaveSuccessMessage = function () {
            options = {
                type: 'success',
                autoHideTime: 3000,
                title: translate('bdgt_import_success_text'), // Success //Need to update from lang bundle
                descr: translate('bdgt_import_gls_imported_success_text') //'GL Accounts got imported successfully' //Need to update from lang bundle
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.showAccUpdateSuccMessage = function () {
            options = {
                type: 'success',
                autoHideTime: 3000,
                title: translate('bdgt_import_success_text'), //'Success', //Need to update from lang bundle
                descr: translate('bdgt_import_gls_updated_success_text') //'GL Accounts got updated successfully' //Need to update from lang bundle
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.showDelGlsSuccMsg = function () {
            options = {
                type: 'success',
                autoHideTime: 3000,
                title: translate('bdgt_import_success_text'), //'Success', //Need to update from lang bundle
                descr: translate('bdgt_import_gls_deleted_success_text') //'GL Accounts got deleted successfully' //Need to update from lang bundle
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.showNotification = function (data) {
            notification.flushAll();
            notification.extend(data).show();
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('importGlAccMsgModel', [
            'appLangTranslate',
            'rpNotificationModel',
            factory
        ]);
})(angular);
