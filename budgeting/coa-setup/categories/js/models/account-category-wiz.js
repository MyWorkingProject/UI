(function (angular) {
    "use strict";

    function factory(notificationModel, wiznav, langTranslate, dialogSvc, categoriesSVC) {
        var model, translate, notification = notificationModel(),
            options = {},
            headerFooterList, addSubtractList, glVisbilityList;
        translate = langTranslate('categories').translate;

        addSubtractList = {
            options: [{
                    "name": "Add",
                    "value": "Add"
            }, {
                    "name": "Subtract",
                    "value": "Subtract"
            }
            ]
        };

        headerFooterList = {
            options: [
                {
                    "name": "Do not show header and footer",
                    "value": "None"
                  },
                {
                    "name": "Show only header",
                    "value": "Header"
                  }, {
                    "name": "Show only footer",
                    "value": "Footer"
                  }, {
                    "name": "Show header and footer",
                    "value": "HeaderFooter"
                  }
            ]
        };

        glVisbilityList = {
            options: [{
                    "name": "Show GL Account",
                    "value": "1"
            }, {
                    "name": "Do not show GL Account",
                    "value": "0"
            }
            ]
        };

        model = {};
        model.isNext = false;
        model.chartID = 0;

        model.coaRowErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_get_invalid_param')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_unknown_error')
                }
            }
        };

        model.getCoaErrorObj = function () {
            return model.coaRowErrorObject;
        };

        model.saveErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_save_invalid_param')
                }
            }
        };

        model.wizardErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_wizard_update_failure')
                }
            }
        };

        model.accntCatErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_accntCategory_unknown_error')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_accntCategory_invalid_param')
                }
            }
        };

        model.getCatErrorObj = function () {
            return model.accntCatErrorObject;
        };

        model.accntTypeErrorObject = {
            errorMsgs: {
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_categories_erroPopText'),
                    desc: translate('bdgt_categories_accntType_unknown_error')
                }
            }
        };

        model.getAcctTypeErrorObj = function () {
            return model.accntTypeErrorObject;
        };

        model.wrapShowMsg = function (msg, obj) {
            if (obj.errorMsgs[msg]) {
                model.showErrorNotification(obj.errorMsgs[msg]);
            }
            else {
                logc("Import Error Handling Module: Error not defined");
            }
        };

        model.getHeaderFooterList = function () {
            return headerFooterList;
        };

        model.getAddSubtractList = function () {
            return addSubtractList;
        };

        model.getGlVisbilityList = function () {
            return glVisbilityList;
        };

        model.setChartID = function (chartID) {
            model.chartID = chartID;
        };

        model.setisNext = function (isNext) {
            model.isNext = isNext;
        };

        model.updateWizardSuccess = function () {
            wiznav.complete('step3', true);
            wiznav.enable('step4', true);
            wiznav.next();
        };

        model.updateWizard = function () {
            if (model.isNext) {
                //categoriesSVC.updateWizStep.post(model.getParamData()).$promise.then(model.updateWizardSuccess, model.wizardFailure);
                var promise = model.getUpdateWizPromise();
                promise.then(model.updateWizardSuccess, model.wizardFailure);
            }
            else {
                model.showSuccessNotification();
            }
        };

        model.getUpdateWizPromise = function () {
            return categoriesSVC.updateWizStep(model.getParamData()).$promise;
        };

        model.getParamData = function () {
            var reqdata = {
                "wizardType": "MasterChart",
                "referenceID": model.chartID,
                "stepID": 3
            };
            return reqdata;
        };

        model.wizardFailure = function (response) {
            if (response.status === 400) {
                model.wrapShowMsg(response.data.message, model.wizardErrorObject);
            }
        };

        model.showSuccessNotification = function () {
            var options = {
                type: 'success',
                autoHideTime: 3000,
                title: '',
                descr: translate('bdgt_categories_save_msg')
            };
            model.showNotification(options);
        };

        model.showNotification = function (data) {
            notification.flushAll();
            notification.extend(data).show();
        };

        model.saveCOARowsFailure = function (response) {
            if (response.status === 400) {
                model.wrapShowMsg(response.data.message, model.saveErrorObject);
            }
        };

        model.showErrorNotification = function (msg) {
            options = {
                type: "error",
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

        model.showNoDataMessage = function () {
            var msg = {};
            msg.title = translate('bdgt_categories_erroPopText');
            msg.desc = translate('bdgt_categories_noData');
            model.showErrorNotification(msg);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('accountCategoryWiz', ['rpNotificationModel', 'rpWizardNavModel', 'appLangTranslate', 'rpDialogModel', 'categoriesSVC', factory
   ]);
})(angular);
