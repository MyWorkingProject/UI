//  User Properties Model

(function (angular) {
    "use strict";
    var fn = angular.noop;
    function factory(createUpdateGlModel, glModel, exHandling, grid, listSVC) {
        var translate, model, form;

        model = {};


        model.saveUpdateGLAccount = function () {
            var resp = createUpdateGlModel.getNewGlRecord();
            if (createUpdateGlModel.isNewGL()) {
                //New GL Account
                var promise = model.saveGlAccount(resp);
                promise.then(model.onSaveUpdateGlSuccess, model.showSaveUpdErrorMessage);
            }
            else {
                //Update GL Account
                model.updateGLAccountByCondition(resp);

            }
        };

        model.updateGLAccountByCondition = function (resp) {

            if (glModel.isAddedToSiteFlag() || !glModel.isPropertyChart()) {
                var promise = model.updateGlAccount(resp, false);
                promise.then(model.onSaveUpdateGlSuccess, model.showSaveUpdErrorMessage);
            }
            else {
               var  resPromise = model.updateGlAccount(resp, true);
               resPromise.then(model.onSaveUpdateGlSuccess, model.showSaveUpdErrorMessage);
            }
        };

        /* SERVICE CALL*/
        model.saveGlAccount = function (data) {
            return listSVC.saveGlAccount(data).$promise;
        };

        model.onSaveUpdateGlSuccess = function (data) {
            createUpdateGlModel.editFormTitle("new");
            createUpdateGlModel.slideToggleGlForm();
            createUpdateGlModel.showSuccessNotification();
             grid.load();
        };

        model.showSaveUpdErrorMessage = function (resp) {
            createUpdateGlModel.showSaveUpdErrorMessage(resp);
        };

        model.editGLAccount = function (record) {
            var paramsData;
            glModel.isAddedToSite(record);
            createUpdateGlModel.loadResetForm();
            paramsData = glModel.getEditParams(record);
            createUpdateGlModel.editFormTitle("update");
            var promise = model.getGlAccountDetailsById(paramsData);
            promise.then(model.updateGlAccountForm, exHandling.getglByIDException);
        };

        model.updateGlAccountForm = function (record) {
            createUpdateGlModel.updateGlForm(record);
            var value = createUpdateGlModel.getAccountType();
            model.loadAccountCategory(value);
            createUpdateGlModel.enableAccountNumber();

        };

        model.loadAccountCategory = function (value) {
            if (value) {
                var promise = model.getAccCategory(value);
                promise.then(model.updateAccCategory, exHandling.getAccountcategoryException);
            }
            else {
                createUpdateGlModel.resetAccountCatForm();
            }
        };

        model.getAccCategory = function (val) {
            var params = {
                masterChartID: glModel.getMasterChartID(),
                accountTypeID: val
            };
            return listSVC.getAccCategory(params).$promise;
        };

        model.updateAccCategory = function (resp) {
            createUpdateGlModel.updateAccCategory(resp);
        };

        model.getGlAccountDetailsById = function (params) {
            var resp;
            if (!glModel.isPropertyChart()) {
                resp = listSVC.getGlAccountGlById(params).$promise;

            }
            else {
                resp = listSVC.getPropertyGlByID(params).$promise;
            }
            return resp;
        };


        model.updateGlAccount = function (data, isPropChart) {
            var resp;
            if (!glModel.isPropertyChart()) {
                return listSVC.updateGlAccount(data).$promise;
            }
            else {
                return listSVC.updatePropertyGlAccount(data).$promise;

            }


        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('manageGlEditSaveGl', [
            'createUpdateGlModel',
            'manageGlAccountModel',
            'manageGlErrorHandling',
            'manageGlGridFactory',
            'manageGLAccountsSvc',
            factory
        ]);
})(angular);