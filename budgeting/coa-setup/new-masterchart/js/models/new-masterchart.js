//  New User Form Model

(function (angular) {
    "use strict";

    function factory(appLangTranslate, newMasterChart, dialogSvc, $location, breadcrumbs, errorModel, formModel) {
        var text, state, form, model, errorMsgs, deferrorMsgs, intialState,
            blankForm, lableText, placeHolder, fieldOptions, seperatorOptions, translate;
        model = {};
        model.dataCopy = {};
        translate = appLangTranslate('newMasterchart').translate;

        placeHolder = {
            chartName: translate('bdgt_newmasterchart_namePlace'),
            accountPrefix: translate('bdgt_newmasterchart_prefixPlace'),
            accountSuffix: translate('bdgt_newmasterchart_suffixPlace')
        };

        lableText = {
            chartText: translate('bdgt_newmasterchart_namelabel'),
            alterText: translate('bdgt_newmasterchart_alternate'),
            customText: translate('bdgt_newmasterchart_custom'),
            prefixText: translate('bdgt_newmasterchart_prefix'),
            suffixText: translate('bdgt_newmasterchart_suffix'),
            field1Text: translate('bdgt_newmasterchart_field1'),
            delimiter1Text: translate('bdgt_newmasterchart_delimiter1'),
            field2Text: translate('bdgt_newmasterchart_field2'),
            delimiter2Text: translate('bdgt_newmasterchart_delimiter2'),
            field3Text: translate('bdgt_newmasterchart_field3'),
            delimiter3Text: translate('bdgt_newmasterchart_delimiter3'),
            field4Text: translate('bdgt_newmasterchart_field4'),
            optionsText: translate('bdgt_newmasterchart_optional'),
            accountStrText: translate('bdgt_newmasterchart_accountStrText'),
            altHelpText: translate('bdgt_newmasterchart_altHelpText'),
            customHelpText: translate('bdgt_newmasterchart_custmHelpText'),
            pageHeadetText: translate('bdgt_newmasterchart_pageHeading'),
            nextBtnText: translate('bdgt_newmasterchart_nextBtnText'),
            saveBtnText: translate('bdgt_newmasterchart_saveBtnText'),
            cancelBtnText: translate('bdgt_newmasterchart_cancelBtnText'),
            editChartText: translate('bdgt_newmasterchart_editChartText'),
            customAccntText: translate('bdgt_newmasterchart_customAccntText')
        };

        state = {
            edit: false,
            ready: false,
            inEditChart: false
                //dupName: false
        };

        /*model.getEditState = function () {
            return model.state.edit;
        };*/

        form = {
            masterChartID: 0,
            name: "",
            isAlternativeCOA: false,
            isCustomAccount: false,
            accountPrefix: "",
            accountSuffix: "",
            field1: "None",
            delimiter1: "None",
            field2: "None",
            delimiter2: "None",
            field3: "None",
            delimiter3: "None",
            field4: "None",
            responseID: 0,
            showField2: false,
            showField3: false,
            showField4: false,
            infoToolTip: false

        };

        errorMsgs = {
            chartName: {
                'required': translate('bdgt_newmasterchart_reqmsg'),
                'dup-name': translate('bdgt_newmasterchart_dupmsg')
            },
            dupChartNameMsg: {
                required: translate('bdgt_newmasterchart_dupmsg')
            },
            filed1Msg: {
                required: translate('bdgt_newmasterchart_filed1msg')
            }
        };

        model.errorMsgs = errorMsgs;
        model.placeHolder = placeHolder;
        model.lableText = lableText;
        model.form = form;
        model.fieldOptions = formModel.getFieldOptions();
        model.seperatorOptions = formModel.getSeperatorOptions();
        model.showNameErr = false;
        model.showDupErr = false;
        model.showAlterPopup = false;
        model.showCustomPopup = false;

        model.state = state;
        //model.dupError = false;
        model.accountStructure = "";

        blankForm = angular.extend({}, form);
        deferrorMsgs = angular.extend({}, errorMsgs);
        intialState = angular.extend({}, state);

        model.resetModel = function () {
            angular.extend(form, blankForm);
            angular.extend(errorMsgs, deferrorMsgs);
            angular.extend(state, intialState);
            model.showDupErr = false;
            return model;
        };

        model.edit = function (bool) {
            if (bool === undefined) {
                return model.state.edit;
            }
            else {
                model.state.edit = bool;
            }
        };

        model.getEditState = function () {
            return model.state.edit;
        };

        model.updateInEditChart = function (bool) {
            model.state.inEditChart = bool;
        };

        model.getState = function () {
            return model.state;
        };

        model.isDuplicateError = function () {
            return model.showDupErr;
        };

        model.undoChanges = function () {
            var chartID = form.masterChartID;
            angular.extend(form, blankForm);
            formModel.updateMasterChartID(model.form, chartID);
            model.updateModelData(model.dataCopy);
            model.updateAccountStructureLabl();
        };

        model.updateWizardStatus = function (status) {
            model.wizard = status;
        };

        model.getWizardStatus = function (status) {
            return model.wizard;
        };
        model.updateLableText = function (type) {
            if (type === 'alt') {
                model.lableText.chartText = translate('bdgt_newmasterchart_AlterChartlblText');
                model.placeHolder.chartName = translate('bdgt_newmasterchart_AlterChartmarkText');
            }
            else if (type === 'normal') {
                model.lableText.chartText = translate('bdgt_newmasterchart_namelabel');
                model.placeHolder.chartName = translate('bdgt_newmasterchart_namePlace');
            }
        };
        model.setEditMode = function (status) {
            model.isEditMode = status;
        };
        model.getEditMode = function (status) {
            return model.isEditMode;
        };

        model.updateMasterChartID = function (masterchartID) {
            if (model.getWizardStatus()) {
                formModel.unSetCompletedSteps();
            }
            formModel.updateMasterChartID(model.form, masterchartID);
        };

        model.showField2 = function (loadDefault) {
            formModel.showField2(model.form, loadDefault);
        };

        model.showField3 = function (loadDefault) {
            formModel.showField3(model.form, loadDefault);
        };

        model.showField4 = function (loadDefault) {
            formModel.showField4(model.form, loadDefault);
        };

        model.isCustomAccnt = function () {
            return model.form.isCustomAccount;
        };

        model.isDefaultField1 = function () {
            return formModel.isDefaultField1(model.form);
        };

        model.updateModelData = function (chartdata) {
            formModel.updateFormDetail(model.form, chartdata.records[0]);
            errorModel.assignChartName(chartdata.records[0].name);
            var type = chartdata.records[0].isAlternativeCOA ? "alt" : "normal";
            model.updateLableText(type);
            if (formModel.hasCustomStructure(chartdata.records[0])) {
                formModel.updateFormCustomDetails(model.form, chartdata.records[0]);
                formModel.setFields(model.form, chartdata.records[0]);
                formModel.setDelimiters(model.form, chartdata.records[0]);
            }
            else {
                model.resetStructure();
            }
            model.showField2(false);
        };

        model.resetStructure = function () {
            formModel.resetFormCustomDetails(model.form);
            model.accountStructure = "";
        };

        model.updateShowErr = function (status) {
            model.showNameErr = status;
        };

        model.isValidData = function () {
            var validateData = model.form;
            if (validateData.name !== undefined && validateData.name !== "") {
                model.updateShowErr(false);
                return true;
            }
            else {
                return false;
            }
        };

        model.updateAccountStructureLabl = function () {
            model.accountStructure = formModel.updateAccountStructureLabl(model.form);
        };

        model.updateFormData = function (type) {
            formModel.updateData(model.form, type);
        };

        model.getFormData = function () {
            if (!model.form.isCustomAccount) {
                model.resetStructure();
            }
            return model.form;
        };

        model.setInitials = function () {
            model.setEditMode(false);
            if (formModel.isEditChart()) {
                model.setEditMode(true);
                model.updateWizardStatus(false);
            }
            else {
                model.updateWizardStatus(true);
                model.edit(true);
            }
            model.updateBreadCum(translate('bdgt_admin_newmasterchart'));
        };

        model.isNewChart = function () {
            return formModel.isNewChart(model.form);
        };

        model.hasChartID = function () {
            if (model.getEditMode() || parseInt(model.form.masterChartID) > 0) {
                return true;
            }
            return false;
        };

        model.submit = function () {
            errorModel.assignChartName(model.form.name);
            if (!(model.getEditMode()) && parseInt(model.form.masterChartID) < 1) {
                //newMasterChart.saveNewMasterChart.put(model.getFormData()).$promise.then(model.newMasterChartSuccess, errorModel.masterChartFailure);
                //newMasterChart.saveNewMasterChart(model.getFormData()).$promise.then(model.newMasterChartSuccess, errorModel.masterChartFailure);
                var promise = model.getSaveNewChartPromise();
                promise.then(model.newMasterChartSuccess, errorModel.masterChartFailure);
            }
            else {
                //newMasterChart.saveMasterChart.post(model.getFormData()).$promise.then(model.editMasterChartSuccess, errorModel.masterChartFailure);
                //newMasterChart.saveMasterChart(model.getFormData()).$promise.then(model.editMasterChartSuccess, errorModel.masterChartFailure);
                var promise1 = model.getSaveChartPromise();
                promise1.then(model.editMasterChartSuccess, errorModel.masterChartFailure);
            }

        };

        model.getSaveNewChartPromise = function () {
            return newMasterChart.saveNewMasterChart(model.getFormData()).$promise;
        };

        model.getSaveChartPromise = function () {
            return newMasterChart.saveMasterChart(model.getFormData()).$promise;
        };

        model.masterChartFailure = function (response) {
            if (response.status === 400 && response.data.messageText === "DUPLICATE") {
                model.showDupErr = true;
                //model.state.dupName = true;
                model.addDupValidators();
                //model.showDuplcateMessage();
            }
            else {
                //model.state.dupName = false;
                errorModel.masterChartFailureresponse();
            }

        };

        model.checkDuplicate = function () {
            return model.showDupErr;

        };

        model.addDupValidators = function () {
            if (model.showDupErr) {
                return [
                    {
                        key: 'dupName',
                        method: model.checkDuplicate
                    }
                ];
            }
            else {
                return [
                    {
                        key: 'NodupName',
                        method: model.checkDuplicate
                    }
                ];
            }
        };

        model.editMasterChartSuccess = function (data) {
            model.updateShowErr(false);
            if (model.wizard) {
                model.form.responseID = model.form.masterChartID;
                model.updateWizardSuccess(data);
            }
            else {
                model.getMasterChartData();
                model.edit(false);
            }
        };

        model.newMasterChartSuccess = function (data) {
            if (data.messageId > 0) {
                model.form.responseID = data.messageId;
                model.updateShowErr(false);
                if ($location.absUrl().indexOf('admin/coa/wiz') > 0) {
                    //newMasterChart.updateWizStep.post(formModel.getWizPostData(data.messageId)).$promise.then(model.updateWizardSuccess, errorModel.wizardFailure);
                    var promise = model.getUpdateWizPostPromise(data);
                    promise.then(model.updateWizardSuccess, errorModel.wizardFailure);
                }
                else {
                    $location.path('/admin/coa/import/' + data.messageId);
                }
            }
        };

        model.getUpdateWizPostPromise = function (data) {
            return newMasterChart.updateWizStep(formModel.getWizPostData(data.messageId)).$promise;
        };

        model.updateWizardSuccess = function (data) {
            formModel.updateWizardSuccess(model.form.responseID, model.form.isAlternativeCOA);
            model.form.responseID = 0;
        };

        model.updateDuplicateMsg = function () {
            //model.errorMsgs.chartName.required = translate('bdgt_newmasterchart_dupmsg');
        };

        model.getMasterChartData = function () {
            //newMasterChart.getMasterChartData.get(formModel.getMasterPostData(model.form.masterChartID)).$promise.then(model.getMasterChartSuccess, errorModel.masterChartFailure);
            //newMasterChart.getMasterChartData(formModel.getMasterPostData(model.form.masterChartID)).$promise.then(model.getMasterChartSuccess, errorModel.masterChartFailure);
            var promise = model.geetGetMasterchartPromise();
            promise.then(model.getMasterChartSuccess, errorModel.masterChartFailure);
        };

        model.geetGetMasterchartPromise = function () {
            return newMasterChart.getMasterChartData(formModel.getMasterPostData(model.form.masterChartID)).$promise;
        };


        model.updateBreadCum = function (txt) {
            breadcrumbs.updateCurrent({
                text: txt
            });
        };

        model.getMasterChartSuccess = function (data) {
            if ((model.getEditMode() === true && model.getWizardStatus() === false) || model.hasChartID()) {
                model.updateBreadCum(data.records[0].name);
            }
            angular.extend(model.dataCopy, data);
            model.updateModelData(data);
            model.updateAccountStructureLabl();
        };

        model.showModelHelpInfo = function () {
            model.form.infoToolTip = !model.form.infoToolTip;
        };

        model.isHelpIconInfo = function () {
            return model.form.infoToolTip;
        };

        model.setHelpIconInfo = function (flag) {
            model.form.infoToolTip = flag;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('newMasterchartModel', ['appLangTranslate', 'newMasterchartSVC', 'rpDialogModel', '$location', 'rpBreadcrumbsModel', 'newMasterchartErrorModel', 'newMasterchartFormModel', factory]);
})(angular);
