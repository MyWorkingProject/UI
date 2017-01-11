//  Draggable Service

angular.module("budgeting").service('Draggable', ['windowSize', 'watchable', 'BodySvc', 'point', 'dataShare',
    function (windowSize, watchable, bodySvc, point, dataShare) {
        var dragActive = dataShare('dragActive');

        function Draggable(element) {
            var s = this;
            s.element = element;
            s.init();
        }

        var p = Draggable.prototype;

        p.init = function () {
            var s = this;

            s.events = {
                restore: watchable(),
                mouseDown: watchable(),
                mouseMove: watchable()
            };

            s.recordParentOffset();
            s.windowSizeWatch = windowSize.subscribe(s.recordParentOffset.bind(s));
            return s;
        };

        p.setPosition = function (e) {
            var s = this;
            s.element.css({
                top: e ? s.offset.top + e.pageY : '',
                left: e ? s.offset.left + e.pageX : ''
            });
            return s;
        };

        p.recordParentOffset = function () {
            var s = this,
                par = s.element.parent();

            s.parOffset = {
                top: par.offset().top,
                left: par.offset().left
            };
            return s;
        };

        p.onMouseDown = function (e) {
            var s = this,
                el = s.element;

            dragActive.set(true);

            e.offsetY = e.offsetY || e.pageY - el.offset().top;
            e.offsetX = e.offsetX || e.pageX - el.offset().left;

            s.offset = {
                top: -s.parOffset.top - e.offsetY - 1,
                left: -s.parOffset.left - e.offsetX - 1
            };

            s.setPosition(e).events.mouseDown.set(e);

            el.addClass('drag');

            s.mouseUpWatch = bodySvc.mouseUp.watch(s.restore.bind(s));
            s.mouseLeaveWatch = bodySvc.mouseLeave.watch(s.restore.bind(s));
            s.mouseMoveWatch = bodySvc.mouseMove.watch(s.onMouseMove.bind(s));

            return s;
        };

        p.onMouseMove = function (e) {
            var s = this,
                el = s.element;

            s.setPosition(e).events.mouseMove.set(e);

            return s;
        };

        p.restore = function () {
            var s = this,
                el = s.element;

            s.setPosition().events.restore.set(Date.now());

            el.removeClass('drag');

            setTimeout(function () {
                dragActive.set(false);
            }, 100);

            s.mouseUpWatch();
            s.mouseMoveWatch();
            s.mouseLeaveWatch();
            return s;
        };

        p.destroy = function () {
            var s = this;
            s.windowSizeWatch();
            s.events.restore.destroy();
            s.events.mouseDown.destroy();
            s.events.mouseMove.destroy();
            return s;
        };

        return function (element) {
            return new Draggable(element);
        };
    }
]);
