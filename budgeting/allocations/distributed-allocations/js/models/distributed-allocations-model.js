//  Users List model

(function (angular) {
    'use strict';

    function factory($filter, formConfig, errorHandling) {

        var model = {};
        model.config = formConfig;

        model.setmodel = function (params) {
            model.modelType = params.modelType;
            model.modelYear = params.modelYear;

        };

        model.saveData = function (model) {
            var postData = {};
            postData = model;            
        };

        model.getFormDetails = function(){
            //var returnObj = {
            //    budgetType : params.budgetType,
            //    budgetYear : params.budgetYear,
            //    comment: model.comment
            //};
            var comment= model.comment;
            return comment;
        };

    

        return model;

    }
    angular
        .module('budgeting')
        .factory('distributedFormModel', [
                "$filter",
               "distributedFormConfig",
               "distErrorHandling",
                factory
        ]);
})(angular);
