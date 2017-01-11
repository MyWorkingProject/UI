
(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var state, model, prev;
        var translate;
        translate = langTranslate('addProperties').translate;
        model = {};        
        model.text = {           
            select: translate('bdgt_addProperties_selectBtn'),
            cancel: translate('bdgt_addProperties_cancelBtn'),
            headerTxt: translate('bdgt_addProperties_header'),
            filter: translate('bdgt_addProperties_filter'),
            noDataFound: translate('bdgt_addProperties_get_noDataFound')
        };  
        return model;
    }

    angular
        .module("budgeting")
        .factory('addPropertiesModel', [
                'appLangTranslate',   
                factory
        ]);
})(angular);
