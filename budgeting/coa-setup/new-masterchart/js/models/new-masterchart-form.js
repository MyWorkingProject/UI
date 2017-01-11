(function (angular) {
    "use strict";

    function factory($location, wiznav) {
        var model = {};
        model.seperatorDisplayOptions = [{
            "name": "Dash",
            "value": "-"
        }, {
            "name": "Comma",
            "value": ","
        }, {
            "name": "Period",
            "value": "."
        }, {
            "name": "None",
            "value": "None"
        }];

        var fieldOptions = {
            options: [{
                "name": "Prefix",
                "value": "Prefix"
            }, {
                "name": "Suffix",
                "value": "Suffix"
            }, {
                "name": "Property number",
                "value": "Property number"
            }, {
                "name": "G/L account code",
                "value": "G/L account code"
            }, {
                "name": "None",
                "value": "None"
            }]
        };

        var seperatorOptions = {
            options: [{
                "name": "Dash (-)",
                "value": "-"
            }, {
                "name": "Comma (,)",
                "value": ","
            }, {
                "name": "Period (.)",
                "value": "."
            }, {
                "name": "None",
                "value": "None"
            }]
        };

        model.getFieldOptions = function () {
            return fieldOptions;
        };

        model.getSeperatorOptions = function () {
            return seperatorOptions;
        };

        model.updateMasterChartID = function (form, masterchartID) {
            form.masterChartID = masterchartID;
        };

        model.unSetCompletedSteps = function () {
            wiznav.complete('step1', false);
            wiznav.complete('step2', false);
            wiznav.complete('step3', false);
            wiznav.complete('step4', false);
        };

        model.isDefaultField1 = function (form) {
            if (form.field1 === "None") {
                return true;
            }
            else {
                return false;
            }
        };

        model.updateFormDetail = function (form, data) {
            form.name = data.name;
            form.isAlternativeCOA = data.isAlternativeCOA;
        };

        model.updateFormCustomDetails = function (form, data) {
            form.isCustomAccount = true;
            form.accountPrefix = data.accountPrefix;
            form.accountSuffix = data.accountSuffix;
        };

        model.resetFormCustomDetails = function (form) {
            form.isCustomAccount = false;
            form.accountPrefix = "";
            form.accountSuffix = "";
            form.delimiter1 = "";
            form.delimiter2 = "";
            form.delimiter3 = "";
            form.field1 = "None";
            form.field2 = "None";
            form.field3 = "None";
            form.field4 = "None";
        };

        model.updateField2Show = function (form, status) {
            form.showField2 = status;
        };

        model.updateField3Show = function (form, status) {
            form.showField3 = status;
        };

        model.updateField4Show = function (form, status) {
            form.showField4 = status;
        };

        model.showField2 = function (form, loadDefault) {
            if (form.field1 !== "None") {
                model.updateField2Show(form, true);
            }
            else {
                model.updateField2Show(form, false);
            }
            if (loadDefault) {
                form.field2 = "None";
                form.delimiter1 = "None";
            }
            model.showField3(form, loadDefault);
        };

        model.showField3 = function (form, loadDefault) {
            if (form.field2 !== "None") {
                model.updateField3Show(form, true);
            }
            else {
                model.updateField3Show(form, false);
            }
            if (loadDefault) {
                form.field3 = "None";
                form.delimiter2 = "None";
            }
            model.showField4(form, loadDefault);
        };

        model.showField4 = function (form, loadDefault) {
            if (form.field3 !== "None") {
                model.updateField4Show(form, true);
            }
            else {
                model.updateField4Show(form, false);
            }
            if (loadDefault) {
                form.field4 = "None";
                form.delimiter3 = "None";
            }
        };

        model.setFields = function (form, data) {
            model.setValField1(form, data.field1);
            model.setValField2(form, data.field2);
            model.setValField3(form, data.field3);
            model.setValField4(form, data.field4);
        };

        model.setDelimiters = function (form, data) {
            model.setDelimiter1(form, data.delimiter1);
            model.setDelimiter2(form, data.delimiter2);
            model.setDelimiter3(form, data.delimiter3);
        };

        model.setValField1 = function (form, data) {
            form.field1 = (data !== "" ? data : "None");
        };

        model.setValField2 = function (form, data) {
            form.field2 = (data !== "" ? data : "None");
        };

        model.setValField3 = function (form, data) {
            form.field3 = (data !== "" ? data : "None");
        };

        model.setValField4 = function (form, data) {
            form.field4 = (data !== "" ? data : "None");
        };

        model.setDelimiter1 = function (form, data) {
            form.delimiter1 = (data.replace(/ /g, '') !== '' ? data : "None");
        };

        model.setDelimiter2 = function (form, data) {
            form.delimiter2 = (data.replace(/ /g, '') !== '' ? data : "None");
        };

        model.setDelimiter3 = function (form, data) {
            form.delimiter3 = (data.replace(/ /g, '') !== '' ? data : "None");
        };

        model.updateAccountStructureLabl = function (form) {
            var accntStructure = "";
            if (form.field1 !== "None") {
                accntStructure = form.field1 + "-" + (form.delimiter1 === "None" ? "" : model.getDisplayText(form.delimiter1));
            }
            if (form.field2 !== "None") {
                accntStructure = accntStructure + "-" + form.field2 + "-" + (form.delimiter2 === "None" ? "" : model.getDisplayText(form.delimiter2));
            }
            if (form.field3 !== "None") {
                accntStructure = accntStructure + "-" + form.field3 + "-" + (form.delimiter3 === "None" ? "" : model.getDisplayText(form.delimiter3));
            }
            if (form.field4 !== "None") {
                accntStructure = accntStructure + "-" + form.field4;
            }
            return accntStructure;
        };

        model.getDisplayText = function (displayValue) {
            var returnData = "";
            angular.forEach(model.seperatorDisplayOptions, function (item) {
                if (item.value === displayValue) {
                    returnData = item.name;
                }
            });
            return returnData;
        };

        /*model.isNewChart = function (masterChartID) {
            if (parseInt(masterChartID) > 0) {
                return false;
            }
            else {
                return true;
            }
        };*/

        model.isEditChart = function () {
            if (parseInt($location.absUrl().indexOf('editmasterchart')) > 0) {
                return true;
            }
            else {
                return false;
            }
        };

        model.updateWizardSuccess = function (responseID, isAlternativeCOA) {
            //wiznav.complete('step1', true);
            if (isAlternativeCOA) {
                wiznav.updateNavHref(0, "/admin/coa/wiz/new/alt/" + responseID);
            }
            else {
                wiznav.updateNavHref(0, "/admin/coa/wiz/new/normal/" + responseID);
                wiznav.updateNavHref(4, "/admin/coa/wiz/clonemasterchart/" + responseID);
            }
            wiznav.updateNavHref(1, "/admin/coa/wiz/import/" + responseID);
            wiznav.updateNavHref(2, "/admin/coa/wiz/categories/" + responseID);
            wiznav.updateNavHref(3, "/admin/coa/wiz/manageglaccount/" + responseID + "/0");
            wiznav.enable('step2', true);
            wiznav.next();
        };

        model.updateData = function (form, type) {
            if (type === 'alt' && form.masterChartID === "0") {
                form.isAlternativeCOA = true;
            }
            else if (type === 'normal' && form.masterChartID === "0") {
                form.isAlternativeCOA = false;
            }
            model.updateDelimeter(form);
        };

        model.updateDelimeter = function (form) {
            if (form.delimiter1 === "None") {
                form.delimiter1 = "";
            }
            if (form.delimiter2 === "None") {
                form.delimiter2 = "";
            }
            if (form.delimiter3 === "None") {
                form.delimiter3 = "";
            }
        };

        model.hasCustomStructure = function (data) {
            if (data.accountPrefix !== "" || data.accountSuffix !== "" || (data.field1 !== "None" && data.field1 !== "") || (data.field2 !== "None" && data.field2 !== "") || (data.field3 !== "None" && data.field3 !== "") || (data.field4 !== "None" && data.field4 !== "") || data.delimiter1.replace(/ /g, '') !== "" || data.delimiter2.replace(/ /g, '') !== "" || data.delimiter3.replace(/ /g, '') !== "") {
                return true;
            }
            return false;
        };

        model.getWizPostData = function (messageID) {
            var reqdata = {
                "wizardType": "MasterChart",
                "referenceID": messageID,
                "stepID": 1
            };
            return reqdata;
        };

        model.getMasterPostData = function (masterChartID) {
            var params = {
                chartID: masterChartID
            };
            return params;
        };

        model.isNewChart = function (form) {
            if (parseInt(form.masterChartID) > 0) {
                return false;
            }
            else {
                return true;
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('newMasterchartFormModel', ['$location', 'rpWizardNavModel', factory]);

})();
