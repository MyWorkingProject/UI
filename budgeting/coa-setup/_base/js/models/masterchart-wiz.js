//  Wizard MOdel

(function (angular) {
    "use strict";

    function factory(langTranslate, wizSvc, $location, $filter, wizardNavModel) {
        var model, translate;

        translate = langTranslate('base').translate;

        model = {};

        model.text = {
            backBtn: translate('bdgt_base_backBtn'),
            nextBtn: translate('bdgt_base_nextBtn'),
            step1Title: translate('bdgt_base_step1'),
            step2Title: translate('bdgt_base_step2'),
            step3Title: translate('bdgt_base_step3'),
            step4Title: translate('bdgt_base_step4'),
            step5Title: translate('bdgt_base_step5')
        };

        model.emptyData = {
            chartID: 0,
            chartType: 'normal',
            navModel: [{
                state: {},
                id: 'step1',
                navTitle: model.text.step1Title,
                href: '/admin/coa/wiz/new'
            }, {
                state: {
                    disabled: true
                },
                id: 'step2',
                navTitle: model.text.step2Title,
                href: '/admin/coa/wiz/import'
            }, {
                state: {
                    disabled: true
                },
                id: 'step3',
                navTitle: model.text.step3Title,
                href: '/admin/coa/wiz/categories'
            }, {
                state: {
                    disabled: true
                },
                id: 'step4',
                navTitle: model.text.step4Title,
                href: '/admin/coa/wiz/manageglaccount'
            }, {
                state: {
                    disabled: true
                },
                id: 'step5',
                navTitle: model.text.step5Title,
                href: '/admin/coa/wiz/clonemasterchart'
            }]
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);

        model.setChartID = function () {
            model.form.chartID = model.getChartIDFromUrl();
        };

        model.getChartIDFromUrl = function () {
            return $location.absUrl().substring($location.absUrl().lastIndexOf("/") + 1);
        };

        model.setChartType = function () {
            model.form.chartType = model.getChartTypeFromUrl();
        };

        model.getChartTypeFromUrl = function () {
            return $location.absUrl().substring($location.absUrl().indexOf("/new") + 5, $location.absUrl().lastIndexOf("/"));
        };

        model.updateWizSteps = function () {
            angular.forEach(model.form.navModel, function (item) {
                model.updateItemHref(item);
            });
            if (!model.isChartNormal()) {
                model.removeLastStep();
            }
            model.setInitials();
        };

        model.setInitials = function () {
            if (model.hasChartID()) {
                model.getWizSteps().then(model.navigateToStep, model.onError);
            }
            else {
                model.setListSteps();
            }
        };
        model.isChartNormal = function () {
            if (model.form.chartType !== 'normal') {
                return false;
            }
            return true;
        };

        model.removeLastStep = function () {
            model.form.navModel = $filter('filter')(model.form.navModel, {
                'id': '!step5'
            }, false);
        };

        model.updateItemHref = function (item) {
            if (item.id == 'step1') {
                item.href = item.href + '/' + model.form.chartType + '/' + model.form.chartID;
                return;
            }
            else if (item.id === 'step4') {
                item.href = item.href + '/' + model.form.chartID + '/0';
                return;
            }
            item.href = item.href + '/' + model.form.chartID;
        };

        model.hasChartID = function () {
            if (model.form.chartID > 0) {
                return true;
            }
            return false;
        };

        model.getNavModel = function () {
            return model.form.navModel;
        };

        model.getWizSteps = function () {
            var params = {
                wizType: 1,
                chartID: model.form.chartID
            };
            return wizSvc.getWizStep.get(params).$promise;
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        model.navigateToStep = function (data) {
            if (model.isAlternateChart(data)) {
                model.removeLastStep();
            }
            var lastStepId = model.getLastStepID(data);
            model.setListSteps();
            model.setEnableCompletedSteps(data);
            if (lastStepId <= 5) {
                model.setStepEnable('step' + lastStepId);
                model.setActivateStep('step' + lastStepId);
            }
        };

        model.isAlternateChart = function (data) {
            if (data.records[0].isAlternativeCOA) {
                return true;
            }
            return false;
        };

        model.getLastStepID = function (data) {
            return data.records.length + 1;
        };

        model.setListSteps = function () {
            wizardNavModel.setList(model.getNavModel());
        };

        model.setEnableCompletedSteps = function (data) {
            angular.forEach(data.records, function (item, index) {
                var stepId = 'step' + (index + 1);
                model.setStepComplete(stepId);
                model.setStepEnable(stepId);
            });
        };

        model.setStepComplete = function (step) {
            wizardNavModel.complete(step, true);
        };

        model.setStepEnable = function (step) {
            wizardNavModel.enable(step, true);
        };

        model.setActivateStep = function (step) {
            wizardNavModel.activate(step);
        };

        model.onError = function (resp) {
            logc('Error in master chart base wizard module');
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('bdgtMasterChartWizModel', [
            'appLangTranslate', 'masterChartWizardService', '$location', '$filter', 'rpWizardNavModel',
            factory
        ]);
})(angular);
