//  General comments form data

(function (angular) {
    "use strict";
    function factory() {
        var model = {};
        model.form = {};
        model.emptyData = {
            commentsText: "",
            editCommentText: ""
        };
        angular.copy(model.emptyData, model.form);
        return model;
    }

    angular
        .module("budgeting")
        .factory("generalCommentsFormData", factory);
})(angular);
