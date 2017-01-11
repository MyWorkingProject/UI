//  Salary Grid Constants Model

(function(angular) {
    "use strict";

    function factory(
        bmGridConstant) {
        var model = angular.merge({}, bmGridConstant);

        model.templateConfig.serviceGroupName = "occupancy-renewals/occupancy-vacancy-summary/templates/service-group-name.html";

        model.templateConfig.commentCount = "occupancy-renewals/occupancy-vacancy-summary/templates/comment-count.html";

        model.methodConfig.serviceGroupEvent = 'onServiceGroupClick';
        model.methodConfig.commentEvent = 'onOpenComments';
        model.columns.title.key = "serviceName";

        model.columns.total.state = {
            active: true,
            locked: false
        };

        model.detailscolumn = {
            commentCount: {
                key: "commentCount",
                text: "",
                width: 60,
                state: {
                    active: true,
                    locked: true
                },
                isDataColumn: false
            },
            unitCount: {
                key: "unitCount",
                text: "Units",
                width: 60,
                state: {
                    active: true,
                    locked: true
                },
                isDataColumn: false
            }
        };

        model.getTemplateConfigs = function() {
            return model.templateConfig;
        };

        model.getColumns = function() {
            return model.columns;
        };

        model.getRowConfigs = function() {
            return model.rowConfig;
        };

        model.getMethodConfigs = function() {
            return model.methodConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("ovDetailsConstantModel", [
            'bmGridConstantModel',
            factory
        ]);
})(angular);