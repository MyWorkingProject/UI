//  Workspace Details Nav Model

(function (angular) {
    "use strict";

    function validateAffordable(RentOptionSettings, exHandling, notifications, $filter, validateInpMethods) {
        var model = {};
        var data;
        model.baseParams = {
            validationMethods:[],
            ValidMarketRentPercent: false,
            validActualRentPercent: false,
            validMarketRentGl: false,
            validActualRentGL: false,         
            flgSaveAffordable: false,        
            mrZeroPerc: false,
            arZeroperc: false,
            saveAffordable: false

        };

        model.saveValidations = {};

        angular.copy(model.baseParams, model.saveValidations);

        model.validateAffordable = function () {
            data = RentOptionSettings.getRentOptionObject();
             model.validateMarketRent();
             model.validateActualRent();         
            model.validateLossGain();       
           model.varlidateMR();        
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
            var mrRecords = $filter('filter')(data.records.marketRentGLAccounts, { glAccountNumber: '' }, true);
            if (mrRecords.length > 0) {
                return false;
            }
            else {
                return true;
            }
        };

        model.validateMRPercentage = function (data) {
            var percentage = 0;
            if (RentOptionSettings.isAffordableType()) {
                angular.forEach(data, function (item) {
                    percentage = percentage + parseFloat(item.incomePercent);
                });
                if (percentage === 0) {
                    model.setZeroMRPerc(true);
                }
                else if (percentage !== 100) {
                    model.setMarketRentPercentage(false);
                }
                else {
                    model.setMarketRentPercentage(true);
                }
            }
        };

        model.setZeroMRPerc = function (flag) {
            model.saveValidations.mrZeroPerc = flag;
        };

        model.setZeroARPerc = function (flag) {
            model.saveValidations.arZeroperc = flag;
        };

        model.getZeroMRPerc = function (flag) {
            return model.saveValidations.mrZeroPerc;
        };

        model.getZeroARPerc = function (flag) {
            return model.saveValidations.arZeroperc;
        };


        model.setValidMarketRentGL = function (flag) {
            model.saveValidations.validMarketRentGl = flag;
        };

        model.isValidMarketRentGL = function (flag) {
            return model.saveValidations.validMarketRentGl;
        };


        model.setMarketRentPercentage = function (flag) {
            model.saveValidations.ValidMarketRentPercent = flag;
        };


        model.isMarketRentPercentage = function () {
            return model.saveValidations.ValidMarketRentPercent;
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
            var arRecords = $filter('filter')(data.records.scheduleRentGLAccounts, { glAccountNumber: '' }, true);
            if (arRecords.length > 0) {
                return false;
            }
            else {
                return true;
            }
        };

        model.validateARPercentage = function (data) {
            var percentage = 0;
            if (RentOptionSettings.isAffordableType()) {
                angular.forEach(data, function (item) {
                    percentage = percentage + parseFloat(item.incomePercent);
                });
                if (percentage === 0) {
                    model.setZeroARPerc(true);
                }
                else if (percentage !== 100) {
                    model.setActualRentPercentage(false);
                }
                else {
                    model.setActualRentPercentage(true);
                }
            }
        };

        model.setValidActualRentGL = function (flag) {
            model.saveValidations.validActualRentGL = flag;
        };

        model.isValidActualRentGL = function (flag) {
            return model.saveValidations.validActualRentGL;
        };

        model.setActualRentPercentage = function (flag) {
            model.saveValidations.ValidActualRentPercent = flag;
        };


        model.isActualRentPercentage = function (flag) {
            return model.saveValidations.ValidActualRentPercent;
        };


        /* validation for Market Gl Conditions */
        model.validateMarketRent = function () {
            if (model.isMarketRentMethod()) {
                if (model.isMarketRentGl()) {
                    model.setValidMarketRentGL(true);
                    model.validateMRPercentage(data.records.marketRentGLAccounts);
                }
                else {
                    model.setValidMarketRentGL(false);
                    model.validateMRPercentage(data.records.marketRentGLAccounts);
                }
            }
            else {
                model.setValidMarketRentGL(true);
                model.setMarketRentPercentage(true);
            }
        };



        /* validation for Actual Gl Conditions */
        model.validateActualRent = function () {
            if (model.isActualRentMethod()) {
                if (model.isActualRentGl()) {
                    model.setValidActualRentGL(true);
                    model.validateARPercentage(data.records.scheduleRentGLAccounts);
                }
                else {
                    model.setValidActualRentGL(false);
                    model.validateARPercentage(data.records.scheduleRentGLAccounts);
                }
            }
            else {
                model.setValidActualRentGL(true);
                model.setActualRentPercentage(true);
            }
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
            if ((data.records.rentOptions.lossToLeaseGLAccount !== "" && data.records.rentOptions.lossToLeaseGLAccount !== undefined) || (data.records.rentOptions.gainToLeaseGLAccount !== "" &&  data.records.rentOptions.gainToLeaseGLAccount !== undefined)) {
                return true;
            }
            else {
                return false;
            }
        };

        model.setValidLossGainGL = function (flag) {
            model.saveValidations.ValidLossGainGL = flag;
        };

        model.isValidLossGainGL = function () {
            return model.saveValidations.ValidLossGainGL;
        };

        model.varlidateMR = function () {
            if (model.getMrGLAndPercent() && model.getarGLAndPercent()) {
                model.saveValidations.saveAffordable = true;
            }
            else if (model.getMrGLAndPercent() && model.isARGLEmpty()) {
                model.saveValidations.saveAffordable = true;
            }
            else if (model.isMRGLEmpty() && model.getarGLAndPercent()) {
                model.saveValidations.saveAffordable = true;
            }
            else {
                model.saveValidations.saveAffordable = false;
            }
        };

        model.isMRGLEmpty = function () {
            if (!model.isValidMarketRentGL() && model.getZeroMRPerc()) {
                return true;
            }
            return false;
        };

        model.isARGLEmpty = function () {
            if (!model.isValidActualRentGL() && model.getZeroARPerc()) {
                return true;
            }
            return false;
        };


        model.getMrGLAndPercent = function () {
            if (model.isValidMarketRentGL() && model.isMarketRentPercentage()) {
               return true;
            }
            return false;
        };
       

        model.getarGLAndPercent = function () {
            if (model.isValidActualRentGL() && model.isActualRentPercentage()) {
                return true;
            }
            return false;
        };

     

        model.marketAndScheduleRentValidations = function () {
            model.saveValidations.validationMethods = [];
            if (!model.isMarketRentMethod() && !model.isActualRentMethod()) {
                /*Both market rent and actual rent are NONE */
                return true;
            }
            else if (model.isMarketRentMethod() && !model.isActualRentMethod()) {
                /* Market Rent is not None and actual rent is None,
                so Market Rent should not be empty */
                if (model.isMarketRentGl()) {
                    model.setValidMarketRentGL(true);
                    model.validateMRPercentage(data.records.marketRentGLAccounts);
                }
                else {
                    model.setValidMarketRentGL(false); //push marketRentGL to array
                    model.validateMRPercentage(data.records.marketRentGLAccounts);//check for marketRentPercentage
                    model.pushValidationMethods("marketRentGL");
                }
                if (model.isValidMarketRentGL() && model.isMarketRentPercentage()) {
                    return true;
                }
                else {
                    model.pushValidationMethods(model.isMarketRentPercentage() === true ? "" : "marketRentPercentage");
                    return false;
                }
            }
            else if (!model.isMarketRentMethod() && model.isActualRentMethod()) {
                /* Market Rent is  None and actual rent is not None,
                so actual Rent should not be empty */
                if (model.isActualRentGl()) {
                    model.setValidActualRentGL(true);
                    model.validateARPercentage(data.records.scheduleRentGLAccounts);
                }
                else {
                    model.setValidActualRentGL(false);//Push acutal Rent
                   model.validateARPercentage(data.records.scheduleRentGLAccounts);//push percentage also
                    model.pushValidationMethods("actualRentGL");
                }
                if (model.isValidActualRentGL() && model.isActualRentPercentage()) {
                    return true;
                }
                else {
                    model.pushValidationMethods(model.isActualRentPercentage() === true ? "" : "actualRentPercentage");
                    return false;
                }

            }
            else if (model.isMarketRentMethod() && model.isActualRentMethod()) {
                /* Market Rent is not None and actual rent is not None,
                so either of the one can be empty */
                model.validateMRPercentage(data.records.marketRentGLAccounts);
                model.validateARPercentage(data.records.scheduleRentGLAccounts);                    
                if (model.saveValidations.saveAffordable) {
                    return true;
                }
                model.setEitherOfGlFlag(false);//push either of GL
                model.setValidationMethodsForBoth();              
                return false;

            }
        };

        model.setValidationMethodsForBoth = function () {
            if (!model.isMarketRentGl()){
                model.pushValidationMethods("marketRentGL");
            }
            else if (!model.isMarketRentPercentage()) {
                model.pushValidationMethods("marketRentPercentage");
            }
            if (!model.isActualRentGl()) {
                model.pushValidationMethods("actualRentGL");
            }
            else if (!model.isActualRentPercentage()) {
                model.pushValidationMethods("actualRentPercentage");
            }           
           
           
        };

        model.pushValidationMethods = function (validationMethod) {
            if(validationMethod !==""){
                model.saveValidations.validationMethods.push(validationMethod);
            }           
        };

        model.getMethodsToValidate=function(){
            return model.saveValidations.validationMethods;
        };

        //setEitherOfGlFlag
        model.setEitherOfGlFlag = function (flag) {
            model.saveValidations.eitherOfGlFlag = flag;
        };

        model.isEitherOfGlFlag = function () {
            return model.saveValidations.eitherOfGlFlag;
        };



        model.setValidationFlags = function () {
            if (model.marketAndScheduleRentValidations() && model.isValidLossGainGL()) {
                model.saveValidations.flgSaveAffordable = true;
            }
            else {
                model.saveValidations.flgSaveAffordable = false;
            }
        };

        model.isAffordableSave = function () {
            return model.saveValidations.flgSaveAffordable;
        };

        model.showValidations = function () {

            var validationMethods=model.getMethodsToValidate();
            if (validationMethods.length > 0) {
                if (validationMethods[0] === "marketRentGL") {
                    exHandling.validateMarketRentGL();
                }
                else if (validationMethods[0] === "marketRentPercentage") {
                    exHandling.marketRentPercentage();
                }
                else if (validationMethods[0] === "actualRentGL") {
                    exHandling.validateActualRentGL();
                }
                else if (validationMethods[0] === "actualRentPercentage") {
                    exHandling.actualRentPercentage();
                }
                else if (validationMethods[0] === "eitherOfGL") {
                    exHandling.validateBothGL();
                }
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
        .factory('validateAffordable', [
                            'RentOptionSettings',
                            'rentOptionsErrorHandling',
                            'rentOptionsNotifications',
                            '$filter',
                            'RentOptionsValidateMethods',
                             validateAffordable]);
})(angular);
