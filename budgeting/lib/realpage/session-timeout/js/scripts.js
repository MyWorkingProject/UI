//  Source: _lib\realpage\session-timeout\js\_bundle.inc
angular.module("rpSessionTimeout", []);

//  Source: _lib\realpage\session-timeout\js\directives\session-timeout.js
//  Session Timeout Directive

(function (angular) {
    "use strict";

    var body;

    function directive(session, timeout, $interval) {
        function link(scope, elem, attr) {
            var vm = {},
                timer1, timer2, timer3,
                evt = 'mousemove.sessionTimer';

            vm.init = function () {
                scope.vm = vm;
                body = angular.element('body');
                vm.hideNotice();
                session.events.update.subscribe(vm.reset.bind(vm));
                vm.startCountdown();
            };

            vm.showNotice = function () {
                elem.show();
                body.on(evt, vm.extendSession);
            };

            vm.hideNotice = function () {
                elem.hide();
                body.off(evt);
            };

            vm.reset = function () {
                vm.hideNotice();
                timeout.cancel(timer1);
                timeout.cancel(timer2);
                $interval.cancel(timer3);
                vm.startCountdown();
            };

            vm.redirect = function () {
                vm.hideNotice();
                session.destroy();
                window.location.href = '/ui/signin/';
            };

            vm.startCountdown = function () {
                timer1 = timeout(function () {
                    timer2 = timeout(vm.redirect, 90000);

                    var t = 90000,
                        sec = t / 1000;

                    vm.updateDisplay(sec);

                    t -= 1000;

                    timer3 = $interval(function () {
                        sec = t / 1000;

                        vm.updateDisplay(sec);

                        t -= 1000;
                    }, 1000);

                    vm.showNotice();
                }, session.get().timeout - 90000);
            };

            vm.updateDisplay = function (sec) {
                if (sec > 59) {
                    vm.min = Math.floor(sec / 60);
                    vm.sec = sec - vm.min * 60;
                }
                else {
                    vm.min = 0;
                    vm.sec = sec;
                }
            };

            vm.extendSession = function () {
                vm.reset();
                session.extend();
            };

            vm.init();
        }

        return {
            scope: {},
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "templates/realpage/session-timeout/session-timeout.html"
        };
    }

    angular
        .module("rpSessionTimeout")
        .directive('sessionTimeout', ['session', 'timeout', '$interval', directive]);
})(angular);

//  Source: _lib\realpage\session-timeout\js\templates\session-timeout.js
//  Session Timeout Template

(function (angular) {
    "use strict";

    var templateHtml = "" +
        "<div class='session-timeout-wrap'>" +
            "<div class='session-timeout'>" +
                "<span class='close' ng-click='vm.extendSession()' />" +
                "<h2>Are You Still There?</h2>" +
                "<span class='icon' />" +
                "<p>For security reasons, your session will end soon due to inactivity.</p>" +
                "<p>Your session will end in <strong>{{vm.min}}m {{vm.sec}}s</strong>.</p>" +
            "</div>" +
        "</div>";

    function template($templateCache) {
        $templateCache.put('templates/realpage/session-timeout/session-timeout.html', templateHtml);
    }

    angular
        .module("rpSessionTimeout")
        .run(['$templateCache', template]);
})(angular);

//  Source: _lib\realpage\session-timeout\js\services\session-timeout.js
//  Session Timeout Service

(function (angular) {
    "use strict";

    function sessionTimeoutSvc(session) {
        var svc = {};

        return svc;
    }

    angular
        .module("rpSessionTimeout")
        .factory('sessionTimeoutSvc', ['session', sessionTimeoutSvc]);
})(angular);

