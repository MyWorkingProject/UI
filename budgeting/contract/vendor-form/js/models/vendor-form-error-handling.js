(function (angular) {
    'use strict';
    function factory(langTranslate,notificationModel) {
        var translate, model;
        model = {};
        translate = langTranslate('vendorForm').translate;
        model.errorMsgs = {           
            "vendorSaveException": {
                "DUPLICATE": {
                    desc: translate('bdgt_contract_new_vendor_data_duplicate')
                }
            },
            "vendorStateException": {
                "statesError":
                {
                    desc: translate('bdgt_contract_new_vendor_states_error')
                }
            },
         };
        model.wrapShowMessage = function (msg, obj) {
           if (obj[msg]) {
               notificationModel.error(obj[msg].desc);
            }
            else {
               logc("Budget vendor form Error Handling Module: Error not defined");
            }
        };
        model.showVendorSaveException = function (resp) {
            if(resp.data !== undefined && resp.data !== null){
               model.wrapShowMessage(resp.data.messageText, model.errorMsgs.vendorSaveException);
            }
        };
        model.showVendorSaveSuccess = function () {
               notificationModel.success(translate('bdgt_contract_new_vendor_data_success'));
        };
        model.onGetError = function(){
             model.wrapShowMessage("statesError", model.errorMsgs.vendorStateException);
        };
        return model;
    }
    angular
        .module('budgeting')
        .factory('addVendorErrorHandling', [
           'appLangTranslate', 
           'notificationService', 
            factory
        ]);
})(angular);