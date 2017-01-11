//  User Properties Model

(function (angular) {
    'use strict';

    function factory(langTranslate,  notificationModel) {
        var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('contracts-csv').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type:''
            }
        };

        model.errorMsgs = {           
            "getCsvTemplateError": {
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_ex_get_csvtemp_desc_unKnown_error'),
                    desc: translate('bdgt_ex_get_csvtemp_desc_unKnown_error'),
                    info: translate('bdgt_ex_get_csvtemp_desc_unKnown_error'),
                    type: 'error'
                }
            },
            "getCSVDataError": {
                "NOT_FOUND": {
                    title: translate('bdgt_ex_get_csvdata_desc_unKnown_error'),
                    desc: translate('bdgt_ex_get_csvdata_desc_unKnown_error'),
                    info: translate('bdgt_ex_get_csvdata_desc_unKnown_error'),
                    type: 'error'
                },
                
            },
            "showDelDataError": {
                "INVALID_PARAM": {
                    title: translate('bdgt_ex_contract_del_desc_invalid_param'),
                    desc: translate('bdgt_ex_contract_del_desc_invalid_param'),
                    info: translate('bdgt_ex_contract_del_desc_invalid_param'),
                    type: 'error'
                }
            }
        };

       model.csvErrors = {
            errorMsgs: {
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_import_error_desc_unknown_error'),
                    desc: translate('bdgt_import_error_desc_unknown_error'),
                    info: translate('bdgt_import_error_desc_unknown_error')
                },
                "DESC_EMPTY": {
                    title: translate('bdgt_import_error_desc_empty_descr'),
                    desc: translate('bdgt_import_error_desc_empty_descr'),
                    info: translate('bdgt_import_error_desc_empty_descr')
                },
                "MEDIA_TYPE": {
                    title: translate('bdgt_import_error_desc_media_type'),
                    desc: translate('bdgt_import_error_desc_media_type'),
                    info: translate('bdgt_import_error_desc_media_type')
                },
                "MISSING_COLUMNS": {
                    title: translate('bdgt_import_error_desc_missing_cols'),
                    desc: translate('bdgt_import_error_desc_missing_cols'),
                    info: translate('bdgt_import_error_desc_missing_cols')
                },
                 "DUP_DESC": {
                    title: translate('bdgt_import_error_desc_dup_msg'),
                    desc: translate('bdgt_import_error_desc_dup_msg'),
                    info: translate('bdgt_import_error_desc_dup_msg')
                },
                 "DUP_EMPTY": {
                    title: translate('bdgt_import_error_desc_emp_msg'),
                    desc: translate('bdgt_import_error_desc_emp_msg'),
                    info: translate('bdgt_import_error_desc_emp_msg')
                },
                "VEND_NAME_EMPTY": {
                    title: translate('bdgt_import_error_desc_vendor_empty'),
                    desc: translate('bdgt_import_error_desc_vendor_empty'),
                    info: translate('bdgt_import_error_desc_vendor_empty')
                },
                "VEND_NAME_INV": {
                    title: translate('bdgt_import_error_desc_Name_invalid'),
                    desc: translate('bdgt_import_error_desc_Name_invalid'),
                    info: translate('bdgt_import_error_desc_Name_invalid')
                },
                "PROP_EMPTY": {
                    title: translate('bdgt_import_error_Prop_empty'),
                    desc: translate('bdgt_import_error_Prop_empty'),
                    info: translate('bdgt_import_error_Prop_empty')
                },
                "PROP_INV": {
                    title: translate('bdgt_import_error_Prop_inv'),
                    desc: translate('bdgt_import_error_Prop_inv'),
                    info: translate('bdgt_import_error_Prop_inv')
                },
                "STARTDATE_EMPTY": {
                    title: translate('bdgt_import_error_StaDt_empty'),
                    desc: translate('bdgt_import_error_StaDt_empty'),
                    info: translate('bdgt_import_error_StaDt_empty')
                },
                "STARTDATE_INV": {
                    title: translate('bdgt_import_error_desc_StaDt_Invalid'),
                    desc: translate('bdgt_import_error_desc_StaDt_Invalid'),
                    info: translate('bdgt_import_error_desc_StaDt_Invalid')
                },
                "ENDDATE_INV": {
                    title: translate('bdgt_import_error_desc_EndDt_Inv'),
                    desc: translate('bdgt_import_error_desc_EndDt_Inv'),
                    info: translate('bdgt_import_error_desc_EndDt_Inv')
                },
                "ENDDATE_EMPTY": {
                    title: translate('bdgt_import_error_desc_EndDt_empty'),
                    desc: translate('bdgt_import_error_desc_EndDt_empty'),
                    info: translate('bdgt_import_error_desc_EndDt_empty')
                },
                "AMT_INV": {
                    title: translate('bdgt_import_error_desc_invalid_amnt'),
                    desc: translate('bdgt_import_error_desc_invalid_amnt'),
                    info: translate('bdgt_import_error_desc_invalid_amnt')
                },
                "GLACCOUNT_EMPTY": {
                    title: translate('bdgt_import_error_desc_glaccnt_empty'),
                    desc: translate('bdgt_import_error_desc_glaccnt_empty'),
                    info: translate('bdgt_import_error_desc_glaccnt_empty')
                },
                "FREQUENCY_INV": {
                    title: translate('bdgt_import_error_desc_freq_inv'),
                    desc: translate('bdgt_import_error_desc_freq_inv'),
                    info: translate('bdgt_import_error_desc_freq_inv')
                }
            }
        }; 


        model.form = angular.extend({}, model.defaultPageProps);

        model.isStatus = function (resp, exId) {
            if (resp.status === exId) {
                return true;
            }
            return false;
        };

        model.wrapShowMessage = function (msg, obj) {
            if (obj[msg]) {
                notificationModel.showErrorInfo(obj[msg]);
            }
            else {
                logc("Contracts CSV Import: Error not defined");
            }
        };

        model.showSuccessMsg = function (msg) {
            notificationModel.showSuccessNotification(msg);
        };

        model.showSuccessImportMsg = function () {
            model.showSuccessMsg(translate('bdgt_import_succ_imp_msg'));
        };

        model.showErrorImportMsg = function () {
            notificationModel.showError(translate('bdgt_import_error_imp_msg'));
        }; 

        model.getCsvTemplateError = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getCsvTemplateError);
        };

        model.getCsvStatgingError = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getCSVDataError);
        };

        model.getCsvDelStatgingError = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.showDelDataError);
        };

       /* model.getCsvUploadError = function (resp) {
            model.wrapShowMessage(resp.data.message, model.csvErrors.errorMsgs);
        };*/

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

        model.getMsgFromResp = function (err) {
            var array = err.data.message.split('|');
            if(array.length>1){
                return array[1];
            }   
            else{
                return "";
            }
        };

        model.showCSVSaveException = function (resp) {
             var msg = model.fetchErrorMessage(resp);
             var errData = model.getMsgFromResp(resp);
             //msg = msg + errData ;  
             model.showErrorMessage(msg, model.csvErrors.errorMsgs,errData);
        };

        model.showErrorMessage = function (msg, obj,desc) {
            if (obj[msg]) {
                 //obj[msg].desc = descr;
                notificationModel.showErrorInfoDesc(obj[msg],desc);
            }
            else {
                logc("Contracts CSV Import: Error not defined");
            }
        };


        model.showBdgtModelException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.showBdgtModelException);
        };
       

        return model;

    }

    angular
        .module('budgeting')
        .factory('contractCSVErrorHandling', [
           'appLangTranslate', 'contractCSVNotifications',
            factory
        ]);
})(angular);