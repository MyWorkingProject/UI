//  Source: _lib\realpage\busy-indicator\js\_bundle.inc
angular.module("rpBusyIndicator", []);

//  Source: _lib\realpage\busy-indicator\js\templates\busy-indicator.js
//  Busy Indicator Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/realpage/busy-indicator/busy-indicator.html";

    templateHtml = "" +
        "<div class='rp-busy-indicator {{model.className}} {{model.themeName}}' " +
            "ng-style='model.style' >" +
            "<p class='message-1'>" +
                "Still loading, just a moment" +
                "<dotter model='dotterModel'></dotter>" +
            "</p>" +
            "<p class='message-2'>" +
                "Sorry, we couldn’t complete your request<br/>" +
                "at this time. Please try again later.<br/>" +
                "<span class='button small white' ng-click='model.retry()'>" +
                    "Try again" +
                "</span>" +
            "</p>" +
        "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("rpBusyIndicator")
        .run(['$templateCache', installTemplate]);
})(angular);

//  Source: _lib\realpage\busy-indicator\js\services\busy-indicator-model.js
//  Busy Indicator Model Service

(function (angular) {
    "use strict";

    var fn = angular.noop;

    function service(eventStream) {
        return function () {
            var model,
                events = eventStream();

            model = {
                retry: fn,

                cancel: fn,

                style: {},

                isBusy: false,

                events: events,

                setThemeName: function (themeName) {
                    model.themeName = themeName;
                },

                busy: function () {
                    model.isBusy = true;
                    events.publish('busy');
                },

                error: function () {
                    events.publish('error');
                },

                off: function () {
                    model.isBusy = false;
                    events.publish('off');
                },

                destroy: function () {
                    events.destroy();
                }
            };

            return model;
        };
    }

    angular
        .module("rpBusyIndicator")
        .factory('rpBusyIndicatorModel', ['eventStream', service]);
})(angular);

//  Source: _lib\realpage\busy-indicator\js\directives\busy-indicator.js
//  Busy Indicator Directive

(function (angular) {
    "use strict";

    function rpBusyIndicator(cdnVer, timeout, eventStream) {
        function link(scope, elem, attr) {
            var model,
                dir = {},
                dotterModel = {
                    events: eventStream()
                };

            dir.init = function () {
                if (!scope.model) {
                    logc("rpBusyIndicator: model is undefined!");
                    return;
                }

                model = scope.model;
                scope.dotterModel = dotterModel;

                dir.setStyles();

                if (model.isBusy) {
                    dir.setState("busy");
                }

                model.events.subscribe(dir.setState);


                scope.dir = dir;
            };

            dir.setStyles = function () {
                var ht = elem.outerHeight(),
                    bgi = "../" + cdnVer + "/lib/realpage/busy-indicator/images/default.gif";

                model.style.backgroundImage = "url('" + bgi + "')";
                model.style.lineHeight = ht + "px";

                return dir;
            };

            dir.setState = function (state) {
                var states = ["busy", "error", "off"];

                if (states.contains(state)) {
                    dir[state]();
                }
            };

            dir.busy = function () {
                model.className = "busy";
                timeout.cancel(dir.timer1);
                dir.timer1 = timeout(dir.showMsg, 10000);
            };

            dir.showMsg = function () {
                model.className = "busy msg";
                dotterModel.events.publish("start");
                dir.timer2 = timeout(model.error, 50000);
            };

            dir.error = function () {
                model.cancel();
                model.className = "error";
                timeout.cancel(dir.timer1);
                timeout.cancel(dir.timer2);
                dotterModel.events.publish("stop");
            };

            dir.off = function () {
                model.className = "";
                timeout.cancel(dir.timer1);
                timeout.cancel(dir.timer2);
                dotterModel.events.publish("stop");
                return dir;
            };

            dir.init();
        }

        return {
            scope: {
                model: "="
            },
            link: link,
            restrict: "E",
            replace: true,
            templateUrl: "templates/realpage/busy-indicator/busy-indicator.html"
        };
    }

    angular
        .module("rpBusyIndicator")
        .directive("rpBusyIndicator", [
            "cdnVer",
            "timeout",
            "eventStream",
            rpBusyIndicator
        ]);
})(angular);

