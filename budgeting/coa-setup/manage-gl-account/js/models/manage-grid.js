//  User Properties Model

(function (angular) {
    "use strict";
    var fn = angular.noop;
    function factory(createUpdateGlModel, glModel, listSVC, exHandling, manageGlPrintModel) {
        var translate, model, form;
        model = {};

        model.defaultPageProps = {
            filterOptions: [{
                "name": "All",
                "value": ""
            }],
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: ''
            },
            data: [{

            }]
        };

        model.form = angular.extend({}, model.defaultPageProps);


        //model.updateFiltTypes = function (data) {
        //    model.form.filterOptions = model.form.filterOptions.concat(data);
        //    return model.form.filterOptions;
        //};

        model.updateFiltTypes = function (data) {
            if (model.form.filterOptions.length === 1) {
                var accountTypes = model.getAccountTypeArray(data);
                model.form.filterOptions = model.form.filterOptions.concat(accountTypes);
            }
            return model.form.filterOptions;
        };

        model.getAccountTypeArray = function (records) {
            var accTypes = [];
            angular.forEach(records, function (item) {
                var newItem = { "name": item.name, "value": item.name };
                accTypes.push(newItem);
            });
            return accTypes;
        };

        model.loadInitFctns = function (resp) {
            createUpdateGlModel.updateAccType(resp);
            manageGlPrintModel.laodAccountTypeData(resp);
            glModel.setPropertyVals();
            model.hideGLImport();

        };

        model.hideGLImport = function () {
            if (glModel.isChartType()) {
                createUpdateGlModel.hideGlImport();
            }
        };

        //model.getFilterObject = function (filt) {
        //    if (filt.AccountTypeCode && filt.AccountTypeCode !== "" && angular.isNumber(filt.AccountTypeCode)) {
        //        filt.AccountTypeCode = $filter('filter')(model.form.filterOptions, { value: filt.AccountTypeCode }, false)[0].name;
        //    }
        //    else if (filt.AccountTypeCode === "") {
        //        filt.AccountTypeCode = "";
        //    }

        //    return filt;
        //};

        model.getGlAccList = function (pg) {
            var params, resp;
            params = model.BuildGlAccParamsByCondition(pg);
            resp = model.getGlAccResp(params, pg);
            return resp;
        };

        model.getGlAccResp = function (params, pg) {
            var resp;
            if (!glModel.isPropertyChart()) {
                resp = listSVC.getMasterchartGlList(params, pg);
            }
            else {
                resp = listSVC.getPropertyGlList(params, pg);
            }
            return resp;
        };


        model.BuildGlAccParamsByCondition = function (pg) {
            var params;
            if (!glModel.isPropertyChart()) {
                params = model.getChartParams(pg);
            }
            else {
                params = model.getPropertyParams(pg);
            }

            return params;
        };

        model.getChartParams = function (pg) {
            var params;
            params = {
                masterChartID: glModel.getMasterChartID()
                //datafilter: pg
            };
            return params;
        };

        model.getPropertyParams = function (pg) {
            var params;
            params = {
                masterChartID: glModel.getMasterChartID(),
                propertyId: glModel.getPropertyId()
                //datafilter: pg
            };

            return params;
        };


        model.isValidWizardNext = function () {
            if (model.form.data.records.length > 0) {
                return true;
            }
            else {
                exHandling.wizAlertException();
                return false;
            }
        };


        model.reset = function () {
            model.form = angular.extend({}, model.defaultPageProps);

        };
        return model;
    }

    angular
        .module("budgeting")
        .factory('manageGlGrid', [
            'createUpdateGlModel',
            'manageGlAccountModel',
            'manageGLAccountsSvc',
            'manageGlErrorHandling',
            'manageGlPrintModel',
            factory
        ]);
})(angular);