
(function (angular) {
    "use strict";

    function PayrollReportViewBase(langTranslate) {
        var translate;
        translate = langTranslate('payrollReportViewTabs').translate;

        var model = {};
        model.emptyData = {
            distID: 0,
            _data: {}
        };

        model.text={
            pageTitle: translate('bdgt_payroll_pageTitle')
        };

          model.setNavUrls = function () {         
            model.form._data=[{
                //href: "#/budgetmodel/"+model.form.distID+"/payroll/reports/itemView",
                className: "",
                isActive: true,
                text: translate('bdgt_payroll_payrollItemView')
            }, {
               // href: "#/budgetmodel/"+model.form.distID+"/payroll/reports/glView",
                className: "",
                isActive: false,
                text: translate('bdgt_payroll_payrollglAccountView')
            }];
        };

        
        model.getLangValue = function (key) {
            return translate(key);
        };

        model.form = {};
        
        model.init=function(){
             angular.copy(model.emptyData, model.form);
             return model;
        };
       

        model.data = function () {
            return model.form._data;
        };      

        model.setDistID = function (id) {
            model.form.distID = id;
        };

         model.getDistID = function () {
           return  model.form.distID;
        };
      
        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        }; 

        return model.init();
    }

    angular
        .module("budgeting")
        .factory('PayrollReportViewBase', [          
            'appLangTranslate',
            PayrollReportViewBase]);
})(angular);
