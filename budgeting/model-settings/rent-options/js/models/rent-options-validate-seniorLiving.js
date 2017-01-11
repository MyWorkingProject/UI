//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function validateSeniorLiving(RentOptionSettings, exHandling, notifications, $filter, validateInpMethods) {
        var model = {},
                 data, serviceGroup = [], sgFlag;
        model.baseParams = {

            validMarketRentGl: true,
            validActualRentGL: true,
            eitherOfGlFlag: true,
            flgSeniorLiving: true


        };

        model.saveValidations = {};

        angular.copy(model.baseParams, model.saveValidations);

        model.validateSeniorLiving = function () {
            data = RentOptionSettings.getRentOptionObject();
            //model.validateMarketRent();
            //model.validateActualRent();
            model.validateLossGain();
            model.setValidationFlags();
        };

        model.isMarketRentMethod = function () {
            if (!validateInpMethods.isIncomeModelNone(data.records.rentOptions.incomeModel)) {
                return true;
            }
            else {
                return false;
            }
        };

        model.isMarketRentGl = function () {
            var mrRecords = model.getMREmptyRecords();
            if (mrRecords.length > 0) {
                return false;
            }
            else {
                return true;
            }
        };

        model.getMREmptyRecords = function () {
            var mrRecords;
            if (RentOptionSettings.getMRFlag()) {
                mrRecords = $filter('filter')(data.records.propertyServiceGroups, { marketRentGL: '' }, true);
            }
            else {
                mrRecords = $filter('filter')(data.records.marketRentGLAccounts, { glAccountNumber: '' }, true);
            }

            return mrRecords;
        };

        model.getAREmptyRecords = function () {
            var arRecords;
            if (RentOptionSettings.getARFlag()) {
                arRecords = $filter('filter')(data.records.propertyServiceGroups, { actualRentGL: '' }, true);
            }
            else {
                arRecords = $filter('filter')(data.records.scheduleRentGLAccounts, { glAccountNumber: '' }, true);
            }

            return arRecords;
        };

        model.getLossLeaseEmptyRecords = function () {
            var lossToLease;
            if (RentOptionSettings.getlossToLeaseFlag()) {
                lossToLease = $filter('filter')(data.records.propertyServiceGroups, { lossToLeaseGL: '' }, true);
                if (lossToLease.length > 0) {
                    return true;
                }
                return false;
            }
            else {
                if (data.records.rentOptions.lossToLeaseGLAccount === "") {
                    lossToLease = true;
                }
                else {
                    lossToLease = false;
                }
            }

            return lossToLease;
        };


        model.setValidMarketRentGL = function (flag) {
            model.saveValidations.validMarketRentGl = flag;
        };

        model.isValidMarketRentGL = function (flag) {
            return model.saveValidations.validMarketRentGl;
        };




        /* Setting actual rent gl Flags */
        model.isActualRentMethod = function () {
            if (!validateInpMethods.isScheduleMethodNone(data.records.rentOptions.scheduleRentMethod)) {
                return true;
            }
            else {
                return false;
            }
        };

        model.isActualRentGl = function () {
            var arRecords = model.getAREmptyRecords();
            if (arRecords.length > 0) {
                return false;
            }
            else {
                return true;
            }
        };



        model.setValidActualRentGL = function (flag) {
            model.saveValidations.validActualRentGL = flag;
        };

        model.isValidActualRentGL = function (flag) {
            return model.saveValidations.validActualRentGL;
        };



        /* Setting Loass To lease gl Flags */
        model.validateLossGain = function () {
            if (model.isLossGainMethod()) {
                if (model.isLossGainGl()) {
                    model.setValidLossGainGL(true);
                }
                else {
                    model.setValidLossGainGL(false);
                }
            }
            else {
                model.setValidLossGainGL(true);
            }
        };


        model.isLossGainMethod = function () {
            if (!validateInpMethods.isLossToLeaseMethodNone(data.records.rentOptions.lossToLeaseMethod)) {
                return true;
            }
            else {
                return false;
            }
        };


        model.isLossGainGl = function () {
            var lossToLese = model.getLossLeaseEmptyRecords();
            if (lossToLese) {
                return false;
            }
            else {
                return true;
            }
        };

        model.setValidLossGainGL = function (flag) {
            model.saveValidations.ValidLossGainGL = flag;
        };

        model.isValidLossGainGL = function () {
            return model.saveValidations.ValidLossGainGL;
        };

        model.setEitherOfGlFlag = function (flag) {
            model.saveValidations.eitherOfGlFlag = flag;
        };

        model.isEitherOfGlFlag = function () {
            return model.saveValidations.eitherOfGlFlag;
        };

        model.isValid = function () {
            var sgFlag = true, flg = true;
            if (model.isIncomeModelSg() || model.isScheduleModelSg()) {
                sgFlag = model.isValidSG();
            }
            if (sgFlag) {
                if (!model.isIncomeModelSg() || !model.isScheduleModelSg()) {
                    flg = model.marketAndScheduleRentValidations();
                }
            }

            if (sgFlag && flg) {
                return true;
            }
            return false;


        };

        model.marketAndScheduleRentValidations = function () {
            if (!model.isMarketRentMethod() && !model.isActualRentMethod()) {
                /*Both market rent and actual rent are NONE */
                return true;
            }
            else if (model.isMarketRentMethod() && (!model.isActualRentMethod() || model.isScheduleModelSg()) && !model.isIncomeModelSg()) {
                /* Market Rent is not None and actual rent is None,
                so Market Rent should not be empty */
                if (model.isMarketRentGl()) {
                    model.setValidMarketRentGL(true);
                    return true;
                }
                model.setValidMarketRentGL(false);
                return false;
            }
            else if ((!model.isMarketRentMethod() || model.isIncomeModelSg()) && model.isActualRentMethod() && !model.isScheduleModelSg()) {
                /* Market Rent is  None and actual rent is not None,
                so actual Rent should not be empty */
                if (model.isActualRentGl()) {
                    model.setValidActualRentGL(true);
                    return true;
                }
                model.setValidActualRentGL(false);
                return false;

            }
            else if (model.isMarketRentMethod() && model.isActualRentMethod() && !model.isIncomeModelSg() && !model.isScheduleModelSg()) {
                /* Market Rent is not None and actual rent is not None,
                so either of the one can be empty */
                if (model.isMarketRentGl() || model.isActualRentGl()) {
                    model.setEitherOfGlFlag(true);
                    return true;
                }
                model.setEitherOfGlFlag(false);
                return false;

            }
            return true;
        };

        model.isIncomeModelSg = function () {
            if (data.records.rentOptions.incomeModel === "Service group") {
                return true;
            }
            return false;
        };

        model.isScheduleModelSg = function () {
            if (data.records.rentOptions.scheduleRentMethod === "Service group") {
                return true;
            }
            return false;
        };


        model.isValidSG = function () {
            serviceGroup = [];
            /**
             *  IF BOTH INPUT TYPES ARE NOT NULL
             *  STEP-1:  SG1=MR,AR --- atleast one gl for both MR and AR-- then show validation
             *  STEP-2:  SG2=MR,AR --- atleast one gl for both MR and AR-- then show validation
               
            */
            if (model.isIncomeModelSg() && model.isScheduleModelSg()) {
              //  if (model.isMarketRentMethod() && model.isActualRentMethod()) {
                    angular.forEach(data.records.propertyServiceGroups, function (item) {
                        if (item.actualRentGL !== "" || item.marketRentGL !== "") {
                            sgFlag = true;
                        }
                        else {
                            serviceGroup.push(item.serviceGroupName);
                        }
                    });
              //  }
                //if (serviceGroup.length === 0) {
                //    return true;
                //}
                //return false;
            }
            else if (model.isIncomeModelSg()) {
                /*
                IF MR INPUT TYPE NOT NULL
                STEP-1:  SG1=MR --- MR SHOULD NOT EMPTY-- then show validation
                STEP-2:  SG2=MR --- MR SHOULD NOT EMPTY-- then show validation
                
               */
              //  if (model.isMarketRentMethod()) {
                    angular.forEach(data.records.propertyServiceGroups, function (item) {
                        if (item.marketRentGL !== "") {
                            sgFlag = true;
                        }
                        else {
                            serviceGroup.push(item.serviceGroupName);
                        }
                    });
               // }

            }
            else if (model.isScheduleModelSg()) {
                /*
                IF MR INPUT TYPE NOT NULL
                STEP-1:  SG1=AR --- AR SHOULD NOT EMPTY-- then show validation
                STEP-2:  SG2=AR --- AR SHOULD NOT EMPTY-- then show validation                 
               */
               // if (model.isActualRentMethod()) {
                    angular.forEach(data.records.propertyServiceGroups, function (item) {
                        if (item.actualRentGL !== "") {
                            sgFlag = true;
                        }
                        else {
                            serviceGroup.push(item.serviceGroupName);
                        }
                    });
               // }
            }

            if (serviceGroup.length === 0) {
                return true;
            }
            return false;
        };

        model.setValidationFlags = function () {
            if ((model.isValid()) && model.isValidLossGainGL()) {
                model.saveValidations.flgSeniorLiving = true;
            }
            else if (!model.isValid() || !model.isValidLossGainGL()) {
                model.saveValidations.flgSeniorLiving = false;
            }
        };


        model.isSeniorLivingSave = function () {
            return model.saveValidations.flgSeniorLiving;
        };

        

        model.showValidations = function () {
            if (!model.isEitherOfGlFlag()) {
                exHandling.validateBothGL();
            }
            else if (!model.isValidMarketRentGL()) {
                exHandling.validateMarketRentGL();
            }
            else if (!model.isValidActualRentGL()) {
                exHandling.validateActualRentGL();
            }
           else if (serviceGroup.length > 0) {
                exHandling.validateSG(serviceGroup[0]);
            }
            else if (!model.isValidLossGainGL()) {
                exHandling.validateLossGain();
            }
        };

        model.reset = function () {
            angular.copy(model.baseParams, model.saveValidations);
        };



        return model;
    }

    angular
        .module("budgeting")
        .factory('validateSeniorLiving', [
                            'RentOptionSettings',
                            'rentOptionsErrorHandling',
                            'rentOptionsNotifications',
                            '$filter',
                            'RentOptionsValidateMethods',
                             validateSeniorLiving]);
})(angular);
