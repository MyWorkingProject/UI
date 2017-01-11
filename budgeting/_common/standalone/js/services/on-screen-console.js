//  On Screen Console Service

angular.module("budgeting").service('onScreenConsole', [
    function () {
        var instance,
            body = angular.element('body');

        function onScreenConsole() {
            var s = this;
            s.init();
        }

        var p = onScreenConsole.prototype;

        p.init = function () {
            var s = this;
            s.console = angular.element('<div />');
            s.console.css({
                left: 0,
                bottom: 0,
                height: 300,
                width: '100%',
                display: 'none',
                position: 'fixed',
                overflowY: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.025)'
            });
            body.append(s.console);
            return s;
        };

        p.log = function () {
            var s = this,
                args = Array.prototype.slice.call(arguments),
                line = angular.element('<p>' + args.join(', ') + '</p>');
            line.css({
                color: '#666',
                fontSize: '12px',
                lineHeight: '20px',
                fontFamily: 'arial'
            });

            if (!s.isVisible) {
                s.show();
            }

            s.console.append(line);
            return s;
        };

        p.show = function () {
            var s = this;
            if (!s.isVisible) {
                s.isVisible = true;
                s.console.show();
            }
            return s;
        };

        p.hide = function () {
            var s = this;
            s.console.hide();
            s.isVisible = false;
            return s;
        };

        return function (element) {
            if (!instance) {
                instance = new onScreenConsole();
            }
            return instance;
        };
    }
]);
