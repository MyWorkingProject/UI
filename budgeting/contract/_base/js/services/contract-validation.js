//  New Contract Data

(function () {
    'use strict';

    function validation(contract, propertyModel, contractNotifs, i18n) {
        var vld = {};

        vld.isEmptyStr = function(val) {
            val += ""; //make sure it's a string            
            return (!val || val.trim().length === 0);
        };
        vld.isEmptyArr = function(arr) {
            return (!arr || arr.length === 0);
        };

        vld.checkVendor = function(vendor) {
            if(!vendor || !vendor.vendorID) {
                return i18n.translate("bdgt_contract_invalid_vendor");
            }
        };

        vld.checkDesc = function(desc) {
            if(vld.isEmptyStr(desc)) {
                return i18n.translate("bdgt_contract_desc_required");
            }
        };

        vld.checkContract = function(data) {
            if(vld.isEmptyArr(contract.model.schedules)) {
                contractNotifs.error("bdgt_schedule_required");
                return "Schedule is required";
            }         
        };

        return vld;
    }

    angular
        .module("budgeting")
        .factory("contractValidationSvc", [
            "contractModel",
            "propertiesGridModel",
            "contractNotifSvc",
            "contractTranslatorSvc",
            validation
        ]);
})();

