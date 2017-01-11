(function (angular) {
    "use strict";

    function factory(langTranslate, dialogSvc, $filter, $location, cloneModel) {

        var text, model, translate;// bOverWrite, bClone, shownOverWriteMsg, shownCloneMsg, showPopup;
        translate = langTranslate('cloneMasterchart').translate;
        model = {};
        model.reLoad = false;
        model.dialogObj = {
            masterChartID: 0,
            info: '',
            title: '',
            cntBtnType: '',
            cnclBtnType: '',
            type: ''
        };

        model.saveSelectedData = function () {
            cloneModel.saveData(model.data);
            model.reLoad = true;
        };

        model.updateCloneData = function (data, masterChartID) {
            model.data = data;
            var chekedRows = model.getFilteredRecords(model.data);
            model.updateCloneDataDefParams();
            model.updateDilogOperation(chekedRows, masterChartID, data);

        };

        model.updateDilogOperation = function (chekedRows, masterChartID, data) {
            if (masterChartID && masterChartID !== "") {
                model.updateDilogOperations(chekedRows, masterChartID, data);
                model.SaveSelForUpdateDilogOp();
            }
        };


        model.SaveSelForUpdateDilogOp = function () {
            if (!model.showPopup) {
                model.showPopup = false;
                model.saveSelectedData();
            }
        };

        model.updateDilogOperations = function (chekedRows, masterChartID, data) {
            angular.forEach(chekedRows, function (item) {
                if (parseInt(item.clonedMasterChartID) === parseInt(masterChartID)) {
                    model.updateCloneDataDilogInfo(data, masterChartID);
                }
                else if (parseInt(item.clonedMasterChartID) > -2) {
                    model.updateCloneDataDilogContinue(data, masterChartID);
                }
                else {
                    item.masterChartID = masterChartID;
                }
            });
        };

        model.updateCloneDataDefParams = function () {
            model.bOverWrite = false;
            model.bClone = false;
            model.shownOverWriteMsg = false;
            model.shownCloneMsg = false;
            model.showPopup = false;
        };

        model.setDialogObj = function (obj) {
            angular.extend(model.dialogObj, obj);
        };

        model.updateCloneDataDilogContinue = function (data, masterChartID) {
            if (!model.shownCloneMsg && !model.shownOverWriteMsg) {
                model.setDialogObj({
                    masterChartID: masterChartID,
                    info: translate('bdgt_clonemasterchart_confmPopText'),
                    title: translate('bdgt_clonemasterchart_clonePopText'),
                    cntBtnType: 'cntClone',
                    cnclBtnType: 'cnclClone',
                    type: 'main'
                });

                model.showDialog();
                model.shownCloneMsg = true;
                model.showPopup = true;
            }
        };

        model.updateCloneDataDilogInfo = function (data, masterChartID) {
            if (!model.shownOverWriteMsg && !model.shownCloneMsg) {
                model.setDialogObj({
                    masterChartID: masterChartID,
                    info: translate('bdgt_clonemasterchart_overRidePopText'),
                    title: translate('bdgt_clonemasterchart_overRBodyPopText'),
                    cntBtnType: 'cntRide',
                    cnclBtnType: 'cnclRide',
                    type: 'main'
                });

                model.showDialogOverRide();
                model.shownOverWriteMsg = true;
                model.showPopup = true;
            }
        };

        model.getFilteredRecords = function (data) {
            return $filter('filter')(data.records, { isSelected: 'true' });
        };



        model.continueOverRide = function (msg, calledFrom, masterChartID) {
            model.shownCloneMsg = false;
            var chekedRows = model.getFilteredRecords(model.data);
            model.ittrateContinueOverRide(chekedRows, masterChartID, calledFrom);
            if (!model.shownCloneMsg) {
                model.saveSelectedData();
            }
        };

        model.ittrateContinueOverRide = function (chekedRows, masterChartID, calledFrom) {
            angular.forEach(chekedRows, function (item) {
                if (parseInt(item.clonedMasterChartID) === parseInt(masterChartID)) {
                    item.masterChartID = masterChartID;
                }
                model.cancelContinueOverwriteDilog(item.clonedMasterChartID, masterChartID, calledFrom);

                if (parseInt(item.clonedMasterChartID) == -2) {
                    item.masterChartID = masterChartID;
                }
            });
            model.showPopup = false;
        };


        model.cancelOverRide = function (msg, calledFrom, masterChartID) {
            model.shownCloneMsg = false;
            var chekedRows = model.getFilteredRecords(model.data);
            model.ittrateCancelOverRide(chekedRows, masterChartID, calledFrom);
            if (calledFrom === "sub" && !model.shownCloneMsg) {
                model.saveSelectedData();
            }
        };

        model.ittrateCancelOverRide = function (chekedRows, masterChartID, calledFrom) {
            angular.forEach(chekedRows, function (item) {
                if (parseInt(item.clonedMasterChartID) === parseInt(masterChartID)) {
                    item.isSelected = false;
                }
                model.cancelContinueOverwriteDilog(item.clonedMasterChartID, masterChartID, calledFrom);
                if (parseInt(item.clonedMasterChartID) == -2) {
                    item.isSelected = false;
                }
            });
        };


        model.cancelContinueOverwriteDilog = function (clonedMasterChartID, masterChartID, calledFrom) {
            if (calledFrom === "main" && (parseInt(clonedMasterChartID) > -2 && parseInt(clonedMasterChartID) !== parseInt(masterChartID)) && !model.shownCloneMsg) {
                model.setDialogObj({
                    masterChartID: masterChartID,
                    info: translate('bdgt_clonemasterchart_clonePopText'),
                    title: translate('bdgt_clonemasterchart_confmPopText'),
                    cntBtnType: 'cntClone',
                    cnclBtnType: 'cnclClone',
                    type: 'sub'
                });

                model.showDialog();
                model.shownCloneMsg = true;
                model.showPopup = true;
            }
        };

        model.continueClone = function (msg, calledFrom, masterChartID) {
            model.shownOverWriteMsg = false;
            var chekedRows = model.getFilteredRecords(model.data);
            model.ittrateContinueClone(chekedRows, masterChartID, calledFrom);

            if (!model.shownOverWriteMsg) {
                model.saveSelectedData();
            }
        };

        model.ittrateContinueClone = function (chekedRows, masterChartID, calledFrom) {
            angular.forEach(chekedRows, function (item) {
                if (parseInt(item.clonedMasterChartID) > -2 && parseInt(item.clonedMasterChartID) !== parseInt(masterChartID)) {
                    item.masterChartID = masterChartID;
                }
                model.continueCancelCloneDilog(item.clonedMasterChartID, masterChartID, calledFrom);
                if (parseInt(item.clonedMasterChartID) == -2) {
                    item.masterChartID = masterChartID;
                }
            });

            model.showPopup = false;
        };

        model.continueCancelCloneDilog = function (clonedMasterChartID, masterChartID, calledFrom) {
            if (calledFrom === "main" && !model.shownOverWriteMsg && (parseInt(clonedMasterChartID) === parseInt(masterChartID))) {
                model.setDialogObj({
                    masterChartID: masterChartID,
                    info: translate('bdgt_clonemasterchart_overRidePopText'),
                    title: translate('bdgt_clonemasterchart_overRBodyPopText'),
                    cntBtnType: 'cntRide',
                    cnclBtnType: 'cnclRide',
                    type: 'sub'
                });

                model.showDialogOverRide();
                model.shownOverWriteMsg = true;
                model.showPopup = true;
            }
        };

        model.cancelClone = function (msg, calledFrom, masterChartID) {
            model.shownOverWriteMsg = false;
            var chekedRows = model.getFilteredRecords(model.data);
            model.ittratecancelClone(chekedRows, masterChartID, calledFrom);

            if (calledFrom === "sub" && !model.shownOverWriteMsg) {
                model.saveSelectedData();
            }

        };

        model.ittratecancelClone = function (chekedRows, masterChartID, calledFrom) {
            angular.forEach(chekedRows, function (item) {
                if (parseInt(item.clonedMasterChartID) !== parseInt(masterChartID)) {// (parseInt(item.clonedMasterChartID) > -2) {
                    item.isSelected = false;
                }
                model.continueCancelCloneDilog(item.clonedMasterChartID, masterChartID, calledFrom);
                if (parseInt(item.clonedMasterChartID) == -2) {
                    item.isSelected = false;
                }

            });
        };


        model.isReload = function () {
            return model.reLoad;
        };

        model.setReload = function (bln) {
            model.reLoad = bln;
        };

        model.showDialog = function () {
            var dialog = dialogSvc();
            dialog.update({
                type: 'warn',
                showCancel: true,
                showContinue: true,
                title: model.dialogObj.title,
                question: '',
                info: model.dialogObj.info
            });

            //dialog.events.subscribe(function (data) {
            //    if (data === 'continue') {
            //        model.continueClone(model.dialogObj.cntBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
            //    }
            //    else if (data === 'cancel') {
            //        model.cancelClone(model.dialogObj.cnclBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
            //    }
            //});

            //dialog.events.subscribe(model.showConfirmMethod);
            dialog.subscribe(model.showConfirmMethod);
            dialog.show();
        };

        model.showConfirmMethod = function (data) {
            if (data === 'continue') {
                model.continueClone(model.dialogObj.cntBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
            }
            else if (data === 'cancel') {
                model.cancelClone(model.dialogObj.cnclBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
            }
        };


        model.showDialogOverRide = function () {
            var dialog = dialogSvc();
            dialog.update({
                type: 'warn',
                showCancel: true,
                showContinue: true,
                title: model.dialogObj.title,
                question: '',
                info: model.dialogObj.info
            });

            /* dialog.events.subscribe(function (data) {
                 if (data === 'continue') {
                     model.continueOverRide(model.dialogObj.cntBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
                 }
                 else if (data === 'cancel') {
                     model.cancelOverRide(model.dialogObj.cnclBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
                 }
             });*/
            //dialog.events.subscribe(model.showOverRideMethod);
            dialog.subscribe(model.showOverRideMethod);
            dialog.show();
        };

        model.showOverRideMethod = function (data) {
            if (data === 'continue') {
                model.continueOverRide(model.dialogObj.cntBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
            }
            else if (data === 'cancel') {
                model.cancelOverRide(model.dialogObj.cnclBtnType, model.dialogObj.type, model.dialogObj.masterChartID);
            }

        };

        return model;
    }
    angular
        .module("budgeting")
        .factory('cloneMasterChartValidationModel', [
            'appLangTranslate', 'rpDialogModel', '$filter', '$location', 'cloneMasterChartModel',
            factory
        ]);
})(angular);
