//  Source: _lib\realpage\actions-menu\js\_bundle.inc
angular.module("rpActionsMenu", []);

//  Source: _lib\realpage\actions-menu\js\services\actions-menu.js
//  Actions Menu Html Service

(function (angular) {
    "use strict";

    function factory() {
        var svc = {};

        svc.get = function (instName) {
            var html = '' +

            '<div class="{{::' + instName + '.model.className}} dropdown">' +
                '<button data-toggle="dropdown" aria-expanded="false" ' +
                    'class="btn btn-block white {{::' + instName + '.model.toggle.className}}">' +
                    '<i class="{{::' + instName + '.model.toggle.text}} pull-right"></i>' +
                    '{{::' + instName + '.model.toggle.text}}' +
                '</button>' +
                '<ul class="dropdown-menu dropdown-menu-scale dropdown-menu-width">' +
                    '<li ng-hide="action.hide" ' +
                        'class="dropdown-item {{::action.className}}" ' +
                        'ng-repeat="action in ' + instName + '.model.actions">' +
                        '<a ng-if="action.href" ' +
                            'href="{{::action.href}}" ' +
                            'ng-class="{icon: action.iconClassName}" ' +
                            'class="action-link {{::action.iconClassName}}">' +
                            '{{::action.text}}' +
                        '</a>' +

                        '<span ng-if="!action.href" ' +
                            'ng-class="{icon: action.iconClassName}" ' +
                            'ng-click="' + instName + '.activate(action)" ' +
                            'class="action-link {{::action.iconClassName}}">' +
                            '{{::action.text}}' +
                        '</span>' +
                    '</li>' +
                '</ul>' +
            '</div>';

            return angular.element(html);
        };

        return svc;
    }

    angular
        .module("rpActionsMenu")
        .factory("rpActionsMenuHtml", [factory]);
})(angular);

//  Source: _lib\realpage\actions-menu\js\models\actions-menu.js
//  Actions Menu Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            return {
                actions: [],

                className: "",

                toggle: {
                    text: "",
                    className: "rp-icon-more no-bg"
                }
            };
        };
    }

    angular
        .module("rpActionsMenu")
        .factory('rpActionsMenuModel', [factory]);
})(angular);

//  Source: _lib\realpage\actions-menu\js\directives\actions-menu.js
//  Actions Menu Directive

(function (angular, und) {
    "use strict";

    var body,
        index = 0;

    function actionsMenu($compile, timeout, html) {
        function link(scope, elem, attr) {
            index++;

            var model,
                inner,
                dir = {},
                state = {},
                menuBusy = false,
                modelWatch = angular.noop,
                instName = 'rpActionsMenu' + index,
                click = 'click.actionsMenu' + index;

            dir.init = function () {
                dir.state = state;
                state.active = false;
                scope.$on('$destroy', dir.destroy);
                body = body || angular.element('body');
                modelWatch = scope.$watch(dir.evalModel, dir.setModel);
                dir.setModel().exposeInstance().decorate();
            };

            dir.evalModel = function () {
                return scope.$eval(attr.model);
            };

            dir.setModel = function (m) {
                model = dir.model = m || dir.evalModel();

                if (model) {
                    modelWatch();
                }

                return dir;
            };

            dir.exposeInstance = function () {
                instName = attr.rpInstanceName ? attr.rpInstanceName : instName;
                scope[instName] = dir;
                return dir;
            };

            dir.decorate = function () {
                inner = html.get(instName);
                $compile(inner)(scope);
                elem.append(inner);
            };

            dir.onClick = function () {
                if (menuBusy || state.active) {
                    return;
                }
                else if (model.dynamicActions) {
                    if (typeof model.getActions == 'function') {
                        menuBusy = true;
                        model.getActions(model).then(function (data) {
                            model.actions = data;
                            dir.showMenu();
                        });
                    }
                    else {
                        logc('rpActionsMenu: model.getActions is not a function!');
                    }
                }
                else {
                    dir.showMenu();
                }
            };

            dir.showMenu = function () {
                menuBusy = false;
                state.active = true;
                timeout(function () {
                    body.off(click).on(click, dir.hideMenu);
                });
            };

            dir.hideMenu = function () {
                body.off(click);
                menuBusy = false;
                scope.$apply(function () {
                    state.active = false;
                });
            };

            dir.activate = function (action) {
                var data = action.dataKey ? scope.$eval(action.dataKey) : und;
                if (typeof action.method == 'function') {
                    action.method(action.data, data);
                }
            };

            dir.destroy = function () {
                inner.remove();
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpActionsMenu")
        .directive('rpActionsMenu', ['$compile', 'timeout', 'rpActionsMenuHtml', actionsMenu]);
})(angular);

