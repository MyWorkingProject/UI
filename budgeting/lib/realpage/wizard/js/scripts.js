//  Source: _lib\realpage\wizard\js\_bundle.inc
angular.module("rpWizard", []);

//  Source: _lib\realpage\wizard\js\models\wizard-nav.js
//  Wizard Nav Model

(function (angular, und) {
    "use strict";

    function factory(location) {
        var list,
            model = {},
            states = {};

        model.setList = function (listData) {
            model.currentStep = {};
            model.list = list = listData;

            list.forEach(function (item, index) {
                states[item.id] = item.state;
                if (item.state.current) {
                    model.setCurrent(item, index);
                }
                item.state.first = index === 0;
                item.state.last = index === list.length - 1;
            });

            if (!model.currentStep.id) {
                model.setCurrent(list[0], 0);
            }
        };

        model.setCurrent = function (item, index) {
            item.state.current = true;
            model.currentStep.index = index;
            angular.extend(model.currentStep, item);
            if (item.href) {
                location.url(item.href);
            }
        };

        model.next = function () {
            var nextStep = list[model.currentStep.index + 1];
            model.activate(nextStep.id);
        };

        model.prev = function () {
            var prevStep = list[model.currentStep.index - 1];
            model.activate(prevStep.id);
        };

        model.getState = function (id) {
            return states[id];
        };

        model.getActiveState = function () {
            return model.currentStep === und ? {} : list[model.currentStep.index].state;
        };

        model.activate = function (id) {
            if (states[id].disabled) {
                return;
            }

            list.forEach(function (step, index) {
                step.state.current = step.id == id;
                if (step.id == id) {
                    model.setCurrent(step, index);
                }
            });
        };

        model.complete = function (id, bool) {
            states[id].complete = bool;
        };

        model.enable = function (id, bool) {
            states[id].disabled = !bool;
        };

        model.updateNavHref = function (ind, newUrl) {
            list[ind].href = newUrl;
        };

        model.updateNavTitle = function (ind, newTitle) {
            list[ind].navTitle = newTitle;
        };

        return model;
    }

    angular
        .module("rpWizard")
        .factory('rpWizardNavModel', ['location', factory]);
})(angular);

//  Source: _lib\realpage\wizard\js\templates\wizard-nav.js
//  Wizard Nav Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/realpage/wizard/wizard-nav.html";

    templateHtml = "" +

    "<div class='rp-wizard-nav' ng-class='dir.state'>" +
        "<div class='current-step' ng-click='dir.showMenu()'>" +
            "<p class='step-info'>" +
                "<strong class='current'>{{dir.model.currentStep.index+1}}</strong>" +
                " of " +
                "<strong class='total'>{{dir.model.list.length}}</strong>" +
            "</p>" +
            "<p class='count'>{{dir.model.currentStep.index+1}}</p>" +
            "<p class='title-wrap'>" +
                "<span class='title'>{{dir.model.currentStep.navTitle}}</span>" +
            "</p>" +
        "</div>" +
        "<div class='rp-wizard-nav-list-wrap'>" +
            "<span class='close' ng-click='dir.hideMenu()'>" +
            "</span>" +
            "<ul class='rp-wizard-nav-list'>" +
                "<li ng-repeat='navItem in dir.model.list' " +
                    "ng-click='dir.activate(navItem.id)' " +
                    "class='nav-item' ng-class='navItem.state'>" +
                    "<span class='count'>{{$index+1}}</span>" +
                    "<span class='title-wrap'>" +
                        "<span class='title'>" +
                            "{{navItem.navTitle}}" +
                        "</span>" +
                    "</span>" +
                "</li>" +
            "</ul>" +
        "</div>" +
    "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("rpWizard")
        .run(['$templateCache', installTemplate]);
})(angular);

//  Source: _lib\realpage\wizard\js\directives\wizard-nav.js
//  Wizard Nav Directive

(function (angular, und) {
    "use strict";

    function rpWizardNav(model) {
        function link(scope, elem, attr) {
            var dir = {},
                state = {};

            function init() {
                dir.state = state;
                dir.model = model;
                scope.dir = dir;
            }

            dir.showMenu = function () {
                state.active = true;
            };

            dir.hideMenu = function () {
                state.active = false;
            };

            dir.activate = function (navItem) {
                state.active = false;
                model.activate(navItem);
            };

            init();
        }

        return {
            scope: {},
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "templates/realpage/wizard/wizard-nav.html"
        };
    }

    angular
        .module("rpWizard")
        .directive('rpWizardNav', ['rpWizardNavModel', rpWizardNav]);
})(angular);


//  Source: _lib\realpage\wizard\js\directives\wizard-step.js
//  Wizard Step Directive

(function (angular, und) {
    "use strict";

    function rpWizardStep(nav) {
        var index = 1;

        function link(scope, elem, attr) {
            var wizId,
                dir = {},
                state = {};

            function init() {
                if (attr.rpWizardStepId === und) {
                    logc(elem);
                    logc('rpWizardStep: Id is undefined!');
                    return;
                }
                else {
                    wizId = attr.rpWizardStepId;
                }

                scope[wizId] = dir;
            }

            dir.getState = function () {
                return nav.getState(wizId);
            };

            dir.next = function () {
                nav.next();
            };

            dir.prev = function () {
                nav.prev();
            };

            dir.goTo = function (stepId) {
                nav.activate(stepId);
            };

            dir.setComplete = function () {
                nav.complete(wizId, true);
            };

            dir.setIncomplete = function () {
                nav.complete(wizId, false);
            };

            dir.enable = function () {
                nav.enable(wizId, true);
            };

            dir.disable = function () {
                nav.enable(wizId, false);
            };

            init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpWizard")
        .directive('rpWizardStep', ['rpWizardNavModel', rpWizardStep]);
})(angular);

//  Source: _lib\realpage\wizard\js\directives\wizard.js
//  Wizard Directive

(function (angular, und) {
    "use strict";

    function rpWizard(nav) {
        function link(scope, elem, attr) {
            var dir = {};

            function init() {
                if (attr.rpWizardId !== und) {
                    scope[attr.rpWizardId] = dir;
                }
                else {
                    logc(elem);
                    logc('Wizard: wizard id is not defined!');
                }
            }

            dir.next = function () {
                nav.next();
            };

            dir.prev = function () {
                nav.prev();
            };

            dir.getState = function () {
                var state = nav.getActiveState();
                return {
                    last: state.last || false,
                    first: state.first || false
                };
            };

            init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpWizard")
        .directive('rpWizard', ['rpWizardNavModel', rpWizard]);
})(angular);

