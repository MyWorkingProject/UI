
(function (angular) {
    "use strict";

    function factory(langTranslate) {
        var state, model, prev;
        var translate;
        translate = langTranslate('selectUnitType').translate;
        model = {};        
        model.text = {           
            select: translate('bdgt_selectUnitType_selectBtn'),
            cancel: translate('bdgt_selectUnitType_cancelBtn'),
            headerTxt: translate('bdgt_selectUnitType_header'),
            filter: translate('bdgt_selectUnitType_filter'),
            noDataFound: translate('bdgt_selectUnitType_get_noDataFound')
        };  
        return model;
    }

    angular
        .module("budgeting")
        .factory('selectUnitTypeModel', [
                'appLangTranslate',   
                factory
        ]);
})(angular);
