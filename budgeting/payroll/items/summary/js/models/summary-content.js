//  Provides lang content for summary Model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('payroll.item.summary').translate,
            model = {
                employeeHeaderTitle: translate('employee_header_title'),
                jobPositionHeaderTitle: translate('job_position_header_title')
            };

        return model;
    }

    angular
        .module("budgeting")
        .factory("summaryContentModel", [
            'appLangTranslate',
            factory]);
})(angular);
