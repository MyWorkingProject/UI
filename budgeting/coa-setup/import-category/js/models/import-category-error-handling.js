//  Import Category API Error Handling

(function (angular) {
    "use strict";

    function ImportCategoryErrorModel(langTranslate, notificationModel) {
        var model, translate, notification, options;

        model = {};

        notification = notificationModel();
        options = {};

        translate = langTranslate('importCategory').translate;

        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_importCat_title_invalid_param'),
                    desc: translate('bdgt_importCat_desc_invalid_param'),
                    info: translate('bdgt_importCat_info_invalid_param')
                },
                "OSA_ERROR": {
                    title: translate('bdgt_importCat_title_osa_error'),
                    desc: translate('bdgt_importCat_desc_osa_error'),
                    info: translate('bdgt_importCat_info_osa_error')
                },
                "NO_OSA_CAT": {
                    title: translate('bdgt_importCat_title_no_osa_cat'),
                    desc: translate('bdgt_importCat_desc_no_osa_cat'),
                    info: translate('bdgt_importCat_info_no_osa_cat')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_importCat_title_unknown_error'),
                    desc: translate('bdgt_importCat_desc_unknown_error'),
                    info: translate('bdgt_importCat_info_unknown_error')
                },
                "MEDIA_TYPE": {
                    title: translate('bdgt_importCat_title_media_type'),
                    desc: translate('bdgt_importCat_desc_media_type'),
                    info: translate('bdgt_importCat_info_media_type')
                },
                "MISSING_COLUMNS": {
                    title: translate('bdgt_importCat_title_missing_col'),
                    desc: translate('bdgt_importCat_desc_missing_col'),
                    info: translate('bdgt_importCat_info_missing_col')
                },
                "DUPACTCAT": {
                    title: translate('bdgt_importCat_title_dup_act_cat'),
                    desc: translate('bdgt_importCat_desc_dup_act_cat'),
                    info: translate('bdgt_importCat_info_dup_act_cat')
                },
                "INVACTTYPE": {
                    title: translate('bdgt_importCat_title_inv_act_type'),
                    desc: translate('bdgt_importCat_desc_inv_act_type'),
                    info: translate('bdgt_importCat_info_inv_act_type')
                },
                "FILE_NOT_FOUND": {
                    title: translate('bdgt_importCat_title_csv_template_error'),
                    desc: translate('bdgt_importCat_desc_csv_template_error'),
                    info: translate('bdgt_importCat_info_csv_template_error')
                },
                "CHART_NOT_FOUND": {
                    title: translate('bdgt_importCat_title_chart_not_found'),
                    desc: translate('bdgt_importCat_desc_chart_not_found'),
                    info: translate('bdgt_importCat_info_chart_not_found')
                }
            }
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

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

        model.showSuccMessage = function () {
            options = {
                type: 'success',
                autoHideTime: 3000,
                title: '', //Need to update from lang bundle
                descr: translate('bdgt_importCat_success_categories_imported_msg') //Need to update from lang bundle
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
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
        .factory('ImportCategoryErrorModel', [
            'appLangTranslate',
            'rpNotificationModel',
            ImportCategoryErrorModel
        ]);
})(angular);
