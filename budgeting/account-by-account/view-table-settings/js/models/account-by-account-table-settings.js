//AccountByAccountView Model


(function (angular) {
    "use strict";

    function accountByAccountTableSettings(langTranslate,accountByAccountView,$filter) {     
        var model = {},translate;
        translate = langTranslate('account-by-account-table-view').translate;
      

        model.getLangValue = function (key) {
            return translate(key);
        };

        model.changeRowOptions=function(column){
            if(column.key==="firstReferenceData"){
              var obj=$filter('filter') (accountByAccountView.form.initialPeriodOptions.columns.data ,{key:column.key},true);
              var objVarPer=$filter('filter') (accountByAccountView.form.initialPeriodOptions.columns.data ,{key:'variancePercent'},true);
              var objVarAmt=$filter('filter') (accountByAccountView.form.initialPeriodOptions.columns.data ,{key:'varianceAmount'},true);
            objVarPer[0].state.active=column.state.active;
            objVarAmt[0].state.active=column.state.active;

            }
        };
        

        return model;
    }

    angular
        .module("budgeting")
        .factory('accountByAccountTableSettings', [ 
                                            'appLangTranslate',
                                            'accountByAccountView',
                                            '$filter',
                                            accountByAccountTableSettings]);
})(angular);
