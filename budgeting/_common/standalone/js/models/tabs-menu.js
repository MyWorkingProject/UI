//  Tabs Menu Model

(function (angular) {
    "use strict";

    function factory(eventStream) {
        return function () {
            var model = {};

            model.list = [];

            model.events = {
                change: eventStream()
            };

            model.setOptions = function (options) {
                if (options && options.forEach) {
                    options.forEach(model.addOption);
                }
            };

            model.addOption = function (option) {
                option.isActive = model.list.length === 0;
                model.list.push(option);
                if (option.isActive) {
                    model.selected = option;
                }
            };

            model.activate = function (option) {
                if (option.isActive) {
                    return;
                }
                model.list.forEach(function (listItem) {
                    listItem.isActive = listItem.text == option.text;
                });
                model.selected = option;
                model.events.change.publish(option);
            };

            return model;
        };
    }

    angular
        .module("budgeting")
        .factory('btTabsMenuModel', ['eventStream', factory]);
})(angular);
