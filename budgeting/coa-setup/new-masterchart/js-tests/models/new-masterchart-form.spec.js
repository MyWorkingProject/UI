describe("New master chart form model", function () {
    beforeEach(module("budgeting.coaSetup.newMasterchart"));
    var wizNavModel, $location, seperatorDisplayOptions, fieldOptions, seperatorOptions, model;


    beforeEach(function () {
        var spy1 = RealPage.spy();
        spy1._createMethods(['absUrl']);

        var wizMethods = [
            'prev',
            'complete',
            'enable',
            'next', 'updateNavHref'
        ];

        wizNavModel = RealPage.spy();
        wizNavModel._createMethods(wizMethods);

        module(function ($provide) {
            $provide.value("$location", spy1);
            $provide.value('rpWizardNavModel', wizNavModel);
        });

        function injector(a, b) {
            $location = a;
            //wizModel = b();
            model = b;
        }

        inject(['$location', 'newMasterchartFormModel', injector]);

        seperatorDisplayOptions = [{
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

        fieldOptions = {
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

        seperatorOptions = {
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

    });


    it("calling filed options method", function () {
        var fldOptns = model.getFieldOptions();
        expect(fldOptns).toEqual(fieldOptions);
    });

    it("calling filed options method", function () {
        var Optns = model.getSeperatorOptions();
        expect(Optns).toEqual(seperatorOptions);
    });

    it("calling filed options method", function () {
        var form = { masterChartID: 0 };
        var mastrChartID = 1;
        model.updateMasterChartID(form, mastrChartID);
        expect(form.masterChartID).toEqual(mastrChartID);
    });

    it("calling resetiing of updated steps", function () {
        model.unSetCompletedSteps();
        expect(wizNavModel._called.complete).toBe(true);
    });

    it("verifying default value of field1 when value is None", function () {
        var form = { field1: "None" };
        var outPut = model.isDefaultField1(form);
        expect(outPut).toBe(true);
    });

    it("verifying default value of field1 when value is Other than None", function () {
        var form = { field1: "Xyz" };
        var outPut = model.isDefaultField1(form);
        expect(outPut).toBe(false);
    });

    it("verifying chart name and isAlterNate is updated corretly", function () {
        var form = { name: "Test", isAlternativeCOA: false };
        var data = { name: "XYZ", isAlternativeCOA: true };
        model.updateFormDetail(form, data);
        expect(form.name).toEqual(data.name);
        expect(form.isAlternativeCOA).toEqual(data.isAlternativeCOA);
    });

    it("verifying form details update method", function () {
        var form = { isCustomAccount: false, accountPrefix: "", accountSuffix: "" };
        var data = { isCustomAccount: false, accountPrefix: "Pref", accountSuffix: "Suffix" };
        model.updateFormCustomDetails(form, data);
        expect(form.isCustomAccount).toBe(true);
        expect(form.accountPrefix).toEqual(data.accountPrefix);
        expect(form.accountSuffix).toEqual(data.accountSuffix);
    });

    it("verifying Reset form details method, it should reset the form data ", function () {
        var form = { isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "fld1", field2: "fld2", field3: "fld3", field4: "fld4" };
        var resetForm = { isCustomAccount: false, accountPrefix: "", accountSuffix: "", delimiter1: "", delimiter2: "", delimiter3: "", field1: "None", field2: "None", field3: "None", field4: "None" };
        model.resetFormCustomDetails(form);
        expect(form.isCustomAccount).toBe(resetForm.isCustomAccount);
        expect(form.accountPrefix).toEqual(resetForm.accountPrefix);
        expect(form.accountSuffix).toEqual(resetForm.accountSuffix);
        expect(form.delimiter1).toEqual(resetForm.delimiter1);
        expect(form.delimiter2).toEqual(resetForm.delimiter2);
        expect(form.delimiter3).toEqual(resetForm.delimiter3);
        expect(form.field1).toEqual(resetForm.field1);
        expect(form.field2).toEqual(resetForm.field2);
        expect(form.field3).toEqual(resetForm.field3);
        expect(form.field4).toEqual(resetForm.field4);
    });


    it("verifying show Field2 value after update", function () {
        var form = { showField2: false };
        model.updateField2Show(form, true);
        expect(form.showField2).toBe(true);
    });

    it("verifying show Field3 value after update", function () {
        var form = { showField3: false };
        model.updateField3Show(form, true);
        expect(form.showField3).toBe(true);
    });

    it("verifying show Field3 value after update", function () {
        var form = { showField4: false };
        model.updateField4Show(form, true);
        expect(form.showField4).toBe(true);
    });

    it("Calling showfield2 method and veriying the field2 status, when fld1 is not None", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "fld1", field2: "fld2", field3: "fld3", field4: "fld4" };
        var loadDefault = true;
        model.showField2(form, loadDefault);
        expect(form.field2).toBe("None");
        expect(form.delimiter1).toBe("None");
        expect(form.showField2).toEqual(true);
        expect(form.field3).toBe("None");
        expect(form.delimiter2).toBe("None");
        expect(form.field4).toBe("None");
        expect(form.delimiter3).toBe("None");
    });

    it("Calling showfield2 method and veriying the field2 status,when fld1 is None", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "None", field2: "fld2", field3: "fld3", field4: "fld4" };
        var loadDefault = false;
        model.showField2(form, loadDefault);
        expect(form.showField2).toEqual(false);

    });


    it("Calling showfield3 method and veriying the field2 status, when fld2 is not None", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "fld1", field2: "fld2", field3: "fld3", field4: "fld4" };
        var loadDefault = true;
        model.showField3(form, loadDefault);
        expect(form.field3).toBe("None");
        expect(form.delimiter2).toBe("None");
        expect(form.showField3).toEqual(true);
        expect(form.field4).toBe("None");
        expect(form.delimiter3).toBe("None");
    });

    it("Calling showfield3 method and veriying the field2 status,when fld2 is None", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Fld1", field2: "None", field3: "fld3", field4: "fld4" };
        var loadDefault = false;
        model.showField3(form, loadDefault);
        expect(form.showField3).toEqual(false);

    });

    it("Calling showfield4 method and veriying the field2 status, when fld3 is not None", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "fld1", field2: "fld2", field3: "fld3", field4: "fld4" };
        var loadDefault = true;
        model.showField4(form, loadDefault);
        expect(form.showField4).toEqual(true);
        expect(form.field4).toBe("None");
        expect(form.delimiter3).toBe("None");
    });

    it("Calling showfield4 method and veriying the field2 status,when fld3 is None", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Fld1", field2: "Fld2", field3: "None", field4: "fld4" };
        var loadDefault = false;
        model.showField4(form, loadDefault);
        expect(form.showField4).toEqual(false);

    });

    it("Calling setFields method, verifying the given data is set for fields, when data is not empty", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Fld1", field2: "Fld2", field3: "Fld3", field4: "fld4" };
        var data = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Dash", field2: "Dash", field3: "Dash", field4: "Dash" };
        model.setFields(form, data);
        expect(form.field1).toEqual(data.field1);
        expect(form.field2).toEqual(data.field2);
        expect(form.field3).toEqual(data.field3);
        expect(form.field4).toEqual(data.field4);
    });

    it("Calling setFields method, verifying the given data is set for fields, when data is empty", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Fld1", field2: "Fld2", field3: "Fld3", field4: "fld4" };
        var data = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "", field2: "", field3: "", field4: "" };
        model.setFields(form, data);
        expect(form.field1).toEqual("None");
        expect(form.field2).toEqual("None");
        expect(form.field3).toEqual("None");
        expect(form.field4).toEqual("None");
    });

    it("Calling setDelimiters method, verifying the given data is set for delimetres, when data is not empty", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Fld1", field2: "Fld2", field3: "Fld3", field4: "fld4" };
        var data = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "-", delimiter2: ".", delimiter3: ",", field1: "Dash", field2: "Dash", field3: "Dash", field4: "Dash" };
        model.setDelimiters(form, data);
        expect(form.delimiter1).toEqual(data.delimiter1);
        expect(form.delimiter2).toEqual(data.delimiter2);
        expect(form.delimiter3).toEqual(data.delimiter3);
    });

    it("Calling setDelimiters method, verifying the given data is set for delimetres, when data is empty", function () {
        var form = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Fld1", field2: "Fld2", field3: "Fld3", field4: "fld4" };
        var data = { showField2: false, showField3: false, showField4: false, isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "", delimiter2: "", delimiter3: "", field1: "", field2: "", field3: "", field4: "" };
        model.setDelimiters(form, data);
        expect(form.delimiter1).toEqual("None");
        expect(form.delimiter2).toEqual("None");
        expect(form.delimiter3).toEqual("None");
    });


    it("Calling field1 set method and verifying the data is set", function () {
        var form = { field1: "" };
        var data = "fld1";
        model.setValField1(form, data);
        expect(form.field1).toEqual(data);
    });

    it("Calling field1 set method and verifying the data is set", function () {
        var form = { field1: "" };
        var data = "";
        model.setValField1(form, data);
        expect(form.field1).toEqual("None");
    });

    it("Calling field2 set method and verifying the data is set", function () {
        var form = { field2: "" };
        var data = "fld1";
        model.setValField2(form, data);
        expect(form.field2).toEqual(data);
    });

    it("Calling field2 set method and verifying the data is set", function () {
        var form = { field2: "" };
        var data = "";
        model.setValField2(form, data);
        expect(form.field2).toEqual("None");
    });

    it("Calling field3 set method and verifying the data is set", function () {
        var form = { field3: "" };
        var data = "fld1";
        model.setValField3(form, data);
        expect(form.field3).toEqual(data);
    });

    it("Calling field3 set method and verifying the data is set", function () {
        var form = { field3: "" };
        var data = "";
        model.setValField3(form, data);
        expect(form.field3).toEqual("None");
    });

    it("Calling field4 set method and verifying the data is set", function () {
        var form = { field4: "" };
        var data = "fld1";
        model.setValField4(form, data);
        expect(form.field4).toEqual(data);
    });

    it("Calling field4 set method and verifying the data is set", function () {
        var form = { field4: "" };
        var data = "";
        model.setValField4(form, data);
        expect(form.field4).toEqual("None");
    });

    it("Calling delimiter1 set method and verifying the data is set", function () {
        var form = { delimiter1: "" };
        var data = "del1";
        model.setDelimiter1(form, data);
        expect(form.delimiter1).toEqual(data);
    });

    it("Calling delimiter1 set method and verifying the data is set", function () {
        var form = { delimiter1: "" };
        var data = "";
        model.setDelimiter1(form, data);
        expect(form.delimiter1).toEqual("None");
    });

    it("Calling delimiter2 set method and verifying the data is set", function () {
        var form = { delimiter2: "" };
        var data = "del1";
        model.setDelimiter2(form, data);
        expect(form.delimiter2).toEqual(data);
    });

    it("Calling delimiter2 set method and verifying the data is set", function () {
        var form = { delimiter2: "" };
        var data = "";
        model.setDelimiter2(form, data);
        expect(form.delimiter2).toEqual("None");
    });

    it("Calling delimiter3 set method and verifying the data is set", function () {
        var form = { delimiter3: "" };
        var data = "del1";
        model.setDelimiter3(form, data);
        expect(form.delimiter3).toEqual(data);
    });

    it("Calling delimiter3 set method and verifying the data is set", function () {
        var form = { delimiter3: "" };
        var data = "";
        model.setDelimiter3(form, data);
        expect(form.delimiter3).toEqual("None");
    });

    it("Calling update structure lable, verifying the lable is set according to data and when data is not none", function () {
        var form = { delimiter1: "-", delimiter2: ",", delimiter3: ".", field1: "Prefix", field2: "Suffix", field3: "Property number", field4: "G/L account code" };
        var formDisplayVal = { delimiter1: "Dash", delimiter2: "Comma", delimiter3: "Period" };
        model.seperatorDisplayOptions = seperatorDisplayOptions;
        var accntStrt = model.updateAccountStructureLabl(form);
        var strct = form.field1 + "-" + formDisplayVal.delimiter1 + "-" + form.field2 + "-" + formDisplayVal.delimiter2 + "-" + form.field3 + "-" + formDisplayVal.delimiter3 + "-" + form.field4;
        expect(accntStrt).toEqual(strct);
    });

    it("Calling update structure lable, verifying the lable is set according to data, when data field is none ", function () {
        var form = { delimiter1: "Dash", delimiter2: "Comma", delimiter3: "Period", field1: "None", field2: "None", field3: "None", field4: "None" };
        var accntStrt = model.updateAccountStructureLabl(form);
        var strct = "";
        expect(accntStrt).toEqual(strct);
    });

    it("Calling update structure lable, verifying the lable is set according to data, when data delimeter  is none ", function () {
        var form = { delimiter1: "None", delimiter2: "None", delimiter3: "None", field1: "Prefix", field2: "Suffix", field3: "Property number", field4: "G/L account code" };
        var accntStrt = model.updateAccountStructureLabl(form);
        var strct = form.field1 + "-" + "" + "-" + form.field2 + "-" + "" + "-" + form.field3 + "-" + "" + "-" + form.field4;
        expect(accntStrt).toEqual(strct);
    });

    it("verifying the display text for delimeter", function () {
        model.seperatorDisplayOptions = seperatorDisplayOptions;
        var outPut = model.getDisplayText("-");
        expect(outPut).toEqual("Dash");
        outPut = model.getDisplayText(",");
        expect(outPut).toEqual("Comma");
        outPut = model.getDisplayText(".");
        expect(outPut).toEqual("Period");
    });

    it("verifying new chart method when chart id is 0", function () {
        var form = { masterChartID: 0 };
        var outPut = model.isNewChart(form);
        expect(outPut).toBe(true);
    });

    it("verifying new chart method when chart id is greatr than 0", function () {
        var form = { masterChartID: 1 };
        var outPut = model.isNewChart(form);
        expect(outPut).toBe(false);
    });

    it("verifying new chart method when chart id is less than 0", function () {
        var form = { masterChartID: -2 };
        var outPut = model.isNewChart(form);
        expect(outPut).toBe(true);
    });

    it("verifying edit chart method when it is int edit chart", function () {
        $location._returnData.absUrl = "/admin/coa/editmasterchart";
        var outPut = model.isEditChart();
        expect(outPut).toBe(true);
    });

    it("verifying edit chart method when it is int edit chart", function () {
        $location._returnData.absUrl = "/admin/coa/wiz/new";
        var outPut = model.isEditChart();
        expect(outPut).toBe(false);
    });

    it("verifying update wizard when chart is alternative", function () {
        model.updateWizardSuccess(1, true);
        expect(wizNavModel._called.updateNavHref).toBe(true);
        expect(wizNavModel._called.enable).toBe(true);
        expect(wizNavModel._called.next).toBe(true);
    });

    it("verifying update wizard when chart is normal", function () {
        model.updateWizardSuccess(1, false);
        expect(wizNavModel._called.updateNavHref).toBe(true);
        expect(wizNavModel._called.enable).toBe(true);
        expect(wizNavModel._called.next).toBe(true);
    });

    it("verifying updateData method for alternate chart", function () {
        var form = { masterChartID: "0", isAlternativeCOA: false, delimiter1: "None", delimiter2: "None", delimiter3: "None" };
        model.updateData(form,"alt");
        expect(form.isAlternativeCOA).toBe(true);
    });

    it("verifying updateData method for normal chart", function () {
        var form = { masterChartID: "0", isAlternativeCOA: true, delimiter1: "None", delimiter2: "None", delimiter3: "None" };
        model.updateData(form, "normal");
        expect(form.isAlternativeCOA).toBe(false);
    });

    it("verifying updateData method for inavlid chart", function () {
        var form = { masterChartID: "0", isAlternativeCOA: true, delimiter1: "None", delimiter2: "None", delimiter3: "None" };
        model.updateData(form, "Invalid");
        expect(form.isAlternativeCOA).toBe(true);
    });

    it("verifying updateDelimeter method for posting the data", function () {
        var form = { delimiter1: "None", delimiter2: "None", delimiter3: "None" };
        model.updateDelimeter(form);
        expect(form.delimiter1).toEqual("");
        expect(form.delimiter2).toEqual("");
        expect(form.delimiter3).toEqual("");
    });

    it("verifying updateDelimeter method for posting the data", function () {
        var form = { delimiter1: "-", delimiter2: ",", delimiter3: "." };
        model.updateDelimeter(form);
        expect(form.delimiter1).toEqual("-");
        expect(form.delimiter2).toEqual(",");
        expect(form.delimiter3).toEqual(".");
    });

    it("verifying form has custom structure when cust is defined", function () {
        var data = { isCustomAccount: true, accountPrefix: "Pref", accountSuffix: "Suf", delimiter1: "del1", delimiter2: "del2", delimiter3: "del3", field1: "Dash", field2: "Dash", field3: "Dash", field4: "Dash" };
        var custmStr= model.hasCustomStructure(data);
        expect(custmStr).toBe(true);
    });

    it("verifying form has custom structure when strct is not defined", function () {
        var data = { isCustomAccount: false, accountPrefix: "", accountSuffix: "", delimiter1: "", delimiter2: "", delimiter3: "", field1: "None", field2: "None", field3: "None", field4: "None" };
        var custmStr = model.hasCustomStructure(data);
        expect(custmStr).toBe(false);
    });

    it("verifying form has custom structure when strct is not defined and delimiter", function () {
        var data = { isCustomAccount: false, accountPrefix: "", accountSuffix: "", delimiter1: "None", delimiter2: "None", delimiter3: "None", field1: "", field2: "", field3: "", field4: "" };
        var custmStr = model.hasCustomStructure(data);
        expect(custmStr).toBe(true);
    });

    it("verifying returning of wiz post data ", function () {
        var msgID = 1;
        var reqdata = {
            "wizardType": "MasterChart",
            "referenceID": msgID,
            "stepID": 1
        };
        var returnData = model.getWizPostData(msgID);
        expect(returnData).toEqual(reqdata);
    });

    it("verifying master chart post data  parametrs ", function () {
        var masterChartID = 1;
        var params = {
            chartID: masterChartID
        };
       
        var returnData = model.getMasterPostData(masterChartID);
        expect(returnData).toEqual(params);
    });

});