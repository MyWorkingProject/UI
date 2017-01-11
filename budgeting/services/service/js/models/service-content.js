// provides lang content for model

(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var translate = langTranslate('services.service').translate,
        model = {
            
                serviceName: translate('service_view_name'),
                glAccount: translate('service_view_glAccount'),
                glAccounts: translate('service_view_glAccounts'),
                inactive: translate('service_view_inactive'),
                amount: translate('service_view_amount'),
                calculationMethod: translate('service_view_calculation_method'),
                residentDay: translate('service_view_per_resident_day'),
                lockAmount: translate('service_view_lock_amount')
        };

        return model;

    }

    angular
       .module("budgeting")
       .factory('serviceContentModel', [
           'appLangTranslate',
       factory]);

})(angular);