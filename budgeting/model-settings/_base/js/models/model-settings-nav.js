//ModelSettingsNav

(function (angular) {
    "use strict";

    function ModelSettingsNav($rootScope, langTranslate,$filter) {
        var translate;
        translate = langTranslate('ModelSettings').translate;

        var model = {};
        model.emptyData = {
            distID: 0,
            _data: [{
                href: "#/model-settings/:distID/rent",
                className: "",
                isActive: true,
                text: translate('model_settings_rent_options')
            }, {
                href: "#/model-settings/:distID/occupancy",
                className: "",
                isActive: false,
                text: translate('model_settings_occupancy_options')
            }, {
                href: "#/model-settings/:distID/lease",
                className: "",
                isActive: false,
                text: translate('model_settings_lease_options')
            }, {
                href: "#/model-settings/:distID/comments-rule",
                className: "",
                isActive: false,
                text: translate('model_settings_comments_options')
            }, {
                href: "#/model-settings/:distID/other",
                className: "",
                isActive: false,
                text: translate('model_settings_other_options')
            }]
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);


        model.init = function () {
            $rootScope.$on('$locationChangeStart', model.updateState);
            return model;
        };

        model.data = function () {
            return model.form._data;
        };

        model.updateState = function (ev, next, current) {
            var url = '#' + next.split('#')[1];
            model.setState(url);
        };

        model.setState = function (url) {
            model.form._data.forEach(function (tab) {
                tab.isActive = tab.href == url;
            });
        };

        model.removeLeaseOptions = function(resp){
            if(resp.assettype.toLowerCase() ==="senior living"){
                var leaseRecord = $filter('filter')(model.form._data,{ href: '/lease' });
                var recordIndex = -1;
               if(leaseRecord.length>0){
                model.form._data.forEach(function (item, itemIndex) {
                    if (leaseRecord[0].href === item.href) {
                        recordIndex = itemIndex;
                    }
                });
                 model.form._data.remove(recordIndex);                
                }
            }
        };

        model.setDistID = function (id) {
            model.form.distID = id;
        };

        model.setNavUrls = function () {
            model.form._data.forEach(function (item) {
                item.href = item.href.replace(":distID", model.form.distID);
            });
        };

        model.getPageTitle = function (resp) {
            var title;
            switch(resp.budgetType){
               case "Budget":
                 title= translate("model_settings_page_title");
                 break;
               case "Forecast":
                 title= translate("model_settings_page_title_forecast");
                 break;
               case "Proforma":
                 title=  translate("model_settings_page_title_proforma");
                 break;
            }
            return title;
           
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('ModelSettingsNav', [
            '$rootScope',
            'appLangTranslate',
            '$filter',
            ModelSettingsNav]);
})(angular);
