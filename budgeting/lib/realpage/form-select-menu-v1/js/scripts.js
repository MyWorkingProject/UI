//  Source: _lib\realpage\form-select-menu-v1\js\_bundle.inc
angular.module("rpFormSelectMenu", []);

//  Source: _lib\realpage\form-select-menu-v1\js\templates\templates.inc.js
angular.module('rpFormSelectMenu').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/form-select-menu-v1/templates/form-select-menu.html",
"<div class=\"rp-select-menu\" ng-class=\"selectMenu.getState()\"><span ng-if=\"config.readonly\" class=\"rp-select-menu-readonly\" title=\"{{selectMenu.getDisplayText()}}\"></span><select class=\"rp-form-select-field\" id=\"{{::config.id}}\" name=\"{{::config.fieldName}}\" ng-blur=\"selectMenu.onBlur()\" ng-change=\"selectMenu.onChange(rpModel)\" ng-disabled=\"config.disabled\" ng-focus=\"selectMenu.onFocus()\" ng-model-options=\"config.modelOptions\" ng-model=\"rpModel\" ng-mouseout=\"selectMenu.onMouseout()\" ng-mouseover=\"selectMenu.onMouseover()\" ng-options=\"option.value as option.name for option in config.options\" ng-readonly=\"config.readonly\" ng-required=\"config.required\" title=\"{{selectMenu.getDisplayText()}}\"></select><div class=\"rp-select-menu-inner\"><span title=\"{{selectMenu.getDisplayText()}}\" class=\"rp-select-menu-value\">{{selectMenu.getDisplayText()}}</span></div><ul class=\"rp-form-error-msgs\"><li ng-if=\"msg.active\" class=\"rp-form-error-msg\" ng-repeat=\"msg in config.errorMsgs\">{{msg.text}}</li></ul></div>");
}]);

//  Source: _lib\realpage\form-select-menu-v1\js\models\form-select-menu.js
//  Select Menu Model

(function (angular) {
    "use strict";

    function factory() {
        var index = 0;

        return function (cfg) {
            index++;
            cfg = cfg || {};

            var fieldId = "select-menu-" + index;

            var model = {
                disabled: false,
                displayText: "",
                dynamicDisplayText: true,
                errorMsgs: [
                    // {
                    //     name: "sample",
                    //     text: "Sample validation error message"
                    // }
                ],
                fieldName: fieldId,
                id: fieldId,
                modelOptions: {
                    allowInvalid: true
                },
                nameKey: "name",
                onChange: angular.noop,
                readonly: false,
                required: false,
                valueKey: "value",
                validators: {
                    // sample: function (modelValue, viewValue) {
                    //     return true/false;
                    // }
                }
            };

            angular.extend(model, cfg);

            model.keys = [];
            model.options = [];

            model.setOptions = function (options) {
                if (options && options.push) {
                    options.forEach(model.addOption);
                }
                else {
                    logc("rpFormSelectMenuConfig.setOptions: options should be an array!");
                }

                return model;
            };

            model.addOption = function (option) {
                var validOption = option[model.nameKey] !== undefined &&
                    option[model.valueKey] !== undefined,
                    uniqueOption = model.keys.indexOf(option[model.nameKey]) == -1;

                if (validOption && uniqueOption) {
                    model.keys.push(option[model.nameKey]);

                    model.options.push({
                        name: option[model.nameKey],
                        value: option[model.valueKey]
                    });
                }

                return model;
            };

            model.getOptionName = function (optionValue) {
                var name;

                model.options.forEach(function (option) {
                    if (option.value === optionValue) {
                        name = option.name;
                    }
                });

                return name;
            };

            model.getOptionValue = function (optionName) {
                var value;

                model.options.forEach(function (option) {
                    if (option.name === optionName) {
                        value = option.value;
                    }
                });

                return value;
            };

            model.flushOptions = function () {
                model.keys.flush();
                model.options.flush();
                return model;
            };

            model.destroy = function () {
                model = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpFormSelectMenu")
        .factory("rpFormSelectMenuConfig", [factory]);
})(angular);

//  Source: _lib\realpage\form-select-menu-v1\js\directives\form-select-menu.js
//  Select Menu Directive

(function (angular) {
    "use strict";

    function rpFormSelectMenu(timeout) {
        function link(scope, elem, attr) {}

        return {
            scope: {
                config: "=",
                rpModel: "="
            },
            link: link,
            restrict: "E",
            replace: true,
            templateUrl: "realpage/form-select-menu-v1/templates/form-select-menu.html"
        };
    }

    angular
        .module("rpFormSelectMenu")
        .directive("rpFormSelectMenu", ["timeout", rpFormSelectMenu]);
})(angular);

//  Source: _lib\realpage\form-select-menu-v1\js\directives\form-select-field.js
//  Select Field Directive

(function (angular) {
    "use strict";

    function rpFormSelectField(timeout) {
        function link(scope, elem, attr, ctrl) {
            var config = scope.config;

            if (!config) {
                return;
            }

            var dir = {
                state: {
                    hover: false,
                    focus: false
                }
            };

            dir.init = function () {
                dir.errorState = {};
                scope.selectMenu = dir;

                if (dir.hasValidators()) {
                    angular.extend(ctrl.$validators, config.validators);
                }

                Object.keys(ctrl.$validators).forEach(function (key) {
                    dir.errorState[key] = false;
                });
            };

            dir.hasValidators = function () {
                return config.validators &&
                    Object.keys(ctrl.$validators).length !== 0;
            };

            dir.getState = function () {
                angular.extend(dir.state, {
                    dirty: ctrl.$dirty,
                    error: ctrl.$invalid,
                    touched: ctrl.$touched,
                    readonly: config.readonly,
                    disabled: config.disabled
                }, dir.errorState, ctrl.$error);

                config.errorMsgs.forEach(function (msg) {
                    msg.active = ctrl.$error[msg.name];
                });

                return dir.state;
            };

            dir.onFocus = function () {
                dir.state.focus = true;
            };

            dir.onBlur = function () {
                dir.state.focus = false;
            };

            dir.onMouseover = function () {
                dir.state.hover = true;
            };

            dir.onMouseout = function () {
                dir.state.hover = false;
            };

            dir.onChange = function (data) {
                var onChange = config.onChange;

                if (onChange) {
                    if (typeof onChange == "function") {
                        timeout(function () {
                            onChange(data);
                        });
                    }
                    else {
                        logw("rpFormSelectMenu: onChange callback is not a function!");
                    }
                }
            };

            dir.getDisplayText = function () {
                if (config.dynamicDisplayText) {
                    return config.getOptionName(scope.rpModel);
                }
                else {
                    return config.displayText;
                }
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "C",
            require: "ngModel"
        };
    }

    angular
        .module("rpFormSelectMenu")
        .directive("rpFormSelectField", ["timeout", rpFormSelectField]);
})(angular);

