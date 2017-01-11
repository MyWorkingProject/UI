//  Source: _lib\realpage\form-input-text-v1\js\_bundle.inc
angular.module("rpFormInputText", []);

//  Source: _lib\realpage\form-input-text-v1\js\templates\templates.inc.js
angular.module('rpFormSelectMenu').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/form-input-text-v1/templates/input-text.html",
"<div class=\"rp-form-input-text\" ng-class=\"inputText.getState()\"><div class=\"rp-form-input-text-table\"><div class=\"rp-form-input-text-row\"><div ng-if=\"config.prefix\" class=\"rp-form-input-text-cell rp-form-input-text-prefix\"><span class=\"rp-form-input-text-prefix-text\">{{::config.prefix}}</span></div><div class=\"rp-form-input-text-cell rp-form-input-text-field-wrap\"><input class=\"rp-form-input-text-field\" id=\"{{::config.id}}\" maxlength=\"{{config.maxlength}}\" minlength=\"{{config.minlength}}\" name=\"{{::config.fieldName}}\" ng-blur=\"inputText.onBlur()\" ng-change=\"inputText.onChange(rpModel)\" ng-disabled=\"config.disabled\" ng-focus=\"inputText.onFocus()\" ng-model-options=\"config.modelOptions\" ng-model=\"rpModel\" ng-mouseout=\"inputText.onMouseout()\" ng-mouseover=\"inputText.onMouseover()\" ng-pattern=\"config.pattern\" ng-readonly=\"config.readonly\" ng-required=\"config.required\" placeholder=\"{{config.placeholder}}\" type=\"{{::config.dataType}}\"></div><div ng-if=\"config.suffix\" class=\"rp-form-input-text-cell rp-form-input-text-suffix\"><span ng-if=\"config.suffix\" class=\"rp-form-input-text-suffix-text\">{{::config.suffix}}</span></div><div ng-if=\"config.iconClass\" class=\"rp-form-input-text-cell rp-form-input-text-icon-wrap\"><span class=\"rp-form-input-text-icon {{config.iconClass}}\"></span></div></div></div><ul class=\"rp-form-error-msgs\"><li ng-if=\"msg.active\" class=\"rp-form-error-msg\" ng-repeat=\"msg in config.errorMsgs\">{{msg.text}}</li></ul></div>");
}]);

//  Source: _lib\realpage\form-input-text-v1\js\models\form-input-text-config.js
//  Form Input Text Model

(function (angular) {
    "use strict";

    function factory() {
        var index = 0;

        return function (cfg) {
            index++;
            cfg = cfg || {};

            var fieldId = "input" + index;

            var defCfg =  {
                prefix: "",
                suffix: "",
                id: fieldId,
                iconClass: "",
                minlength: "",
                maxlength: "",
                disabled: false,
                readonly: false,
                required: false,
                dataType: "text",
                fieldName: fieldId,
                // pattern: /^[0-9a-z]+$/i,
                placeholder: "",
                errorMsgs: [],
                validators: {
                    // sample: function (modelValue, viewValue) {
                    //     return true/false;
                    // }
                },
                modelOptions: {
                    // updateOn: "blur"
                },
                onChange: angular.noop
            };

            return angular.extend(defCfg, cfg);
        };
    }

    angular
        .module("rpFormInputText")
        .factory("rpFormInputTextConfig", [factory]);
})(angular);

//  Source: _lib\realpage\form-input-text-v1\js\directives\form-input-text.js
//  Form Input Text Directive

(function (angular) {
    "use strict";

    function rpFormInputText(baseConfig) {
        function link(scope, elem, attr) {
            scope.config = scope.config || {};
            var config = angular.extend({}, scope.config);
            angular.extend(scope.config, baseConfig(), config);
        }

        return {
            scope: {
                config: "=",
                rpModel: "="
            },
            link: link,
            restrict: "E",
            replace: true,
            templateUrl: "realpage/form-input-text-v1/templates/input-text.html"
        };
    }

    angular
        .module("rpFormInputText")
        .directive("rpFormInputText", ["rpFormInputTextConfig", rpFormInputText]);
})(angular);

//  Source: _lib\realpage\form-input-text-v1\js\directives\form-input-text-field.js
//  Form Input Text Field Directive

(function (angular) {
    "use strict";

    function rpFormInputTextField() {
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
                dir.timer = "";
                dir.errorState = {};
                scope.inputText = dir;

                if (dir.hasValidators()) {
                    angular.extend(ctrl.$validators, config.validators);
                }

                Object.keys(ctrl.$validators).forEach(function (key) {
                    dir.errorState[key] = false;
                });
            };

            dir.hasValidators = function () {
                return config.validators &&
                    Object.keys(config.validators).length !== 0;
            };

            dir.getState = function (data) {
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
                        onChange(data);
                    }
                    else {
                        logw("rpFormInputText: onChange callback is not a function!");
                    }
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
        .module("rpFormInputText")
        .directive("rpFormInputTextField", [rpFormInputTextField]);
})(angular);

