//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate,  notificationModel,langBundle) {
         var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('contracts').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type: ''
            }
        };

        model.errorMsgs = {
            "onSaveException": {
                "INVALID_PARAM": {
                    title: "INVALID_PARAM",
                    desc: langBundle.getLangValue('mr_ex_invalid_param'),
                    info:langBundle.getLangValue('mr_ex_invalid_param'),
                    type: 'error'
                }
            }, 
             "validateLossGain":{
                "validateLossGain": {
                    title: "EMPTY_GainToLeaseGL",
                    desc:langBundle.getLangValue('mr_ex_loss_lease_req'),
                    info:langBundle.getLangValue('mr_ex_loss_lease_req'),
                    type: 'error'
                }
            },

            "validateBothGL":{
                "validateBothGL": {
                    title: "EMPTY_BothGL",
                    desc: langBundle.getLangValue('mr_ex_either_gl_req'),
                    info: langBundle.getLangValue('mr_ex_either_gl_req'),
                    type: 'error'
                }
            },
             "validateMarketRentGL":{
                "validateMarketRentGL": {
                    title: "EMPTY_MarketRentGL",
                    desc: langBundle.getLangValue('mr_ex_market_gl_req'),
                    info: langBundle.getLangValue('mr_ex_market_gl_req'),
                    type: 'error'
                }
            },
             "validateActualRentGL":{
                "validateActualRentGL": {
                    title: "EMPTY_ActualRentGL",
                    desc: langBundle.getLangValue('mr_ex_Actual_gl_req'),
                    info: langBundle.getLangValue('mr_ex_Actual_gl_req'),
                    type: 'error'
                }
            },
             "marketRentPercentage":{
                "marketRentPercentage": {
                    title: "GL_Percentage",
                    desc: langBundle.getLangValue('mr_ex_invalid_mr_Percentage'),
                    info: langBundle.getLangValue('mr_ex_invalid_mr_Percentage'),
                    type: 'error'
                }
            },
             "actualRentPercentage":{
                "actualRentPercentage": {
                    title: "GL_Percentage",
                    desc: langBundle.getLangValue('mr_ex_invalid_ar_Percentage'),
                    info: langBundle.getLangValue('mr_ex_invalid_ar_Percentage'),
                    type: 'error'
                }
            }
           
        };

        model.validateSG = function (msg) {
            var obj = {
                title: "Service Group Required",
                desc: msg + " Service Group Required",
                info: msg + " Service Group Required",
                type: 'error'
            };

            notificationModel.showErrorInfo(obj);
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
                logc("Rent options Error Handling Module: Error not defined");
            }
        };
    
         model.onSaveException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.onSaveException);
        }; 

         model.validateLossGain = function () {
            model.wrapShowMessage("validateLossGain", model.errorMsgs.validateLossGain);
        };
        
         model.validateMarketRentGL = function () {
            model.wrapShowMessage("validateMarketRentGL", model.errorMsgs.validateMarketRentGL);
        };

          model.validateBothGL = function () {
            model.wrapShowMessage("validateBothGL", model.errorMsgs.validateBothGL);
        };
        
         model.validateActualRentGL = function () {
            model.wrapShowMessage("validateActualRentGL", model.errorMsgs.validateActualRentGL);
        };

          model.marketRentPercentage = function () {
            model.wrapShowMessage("marketRentPercentage", model.errorMsgs.marketRentPercentage);
        };
        
         model.actualRentPercentage = function () {
            model.wrapShowMessage("actualRentPercentage", model.errorMsgs.actualRentPercentage);
         };

       

        return model;

    }

    angular
        .module("budgeting")
        .factory('rentOptionsErrorHandling', [
           'appLangTranslate', 'rentOptionsNotifications','RentOptionsModel',
            factory
        ]);
})(angular);