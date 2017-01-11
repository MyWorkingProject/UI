//  Draggable Service

angular.module("budgeting").service('DraggableTouch', ['point', 'watchable', 'windowSize',
    'BodySvc', 'onScreenConsole',

    function (point, watchable, windowSize, BodySvc, onScreenConsole) {
        var csl = onScreenConsole(),
            bodySvc = BodySvc;

        function DraggableTouch(element) {
            var s = this;
            s.element = element;
            s.init();
        }

        var p = DraggableTouch.prototype;

        p.init = function () {
            var s = this;

            s.events = {
                touchEnd: watchable(),
                touchMove: watchable(),
                touchStart: watchable()
            };

            s.recordParentOffset();
            s.windowSizeWatch = windowSize.subscribe(s.recordParentOffset.bind(s));
            return s;
        };

        p.setPosition = function (e) {
            var s = this,
                pnt = e ? point().fromTouchEvent(e) : '',
                css = {
                    top: e ? s.offset.top + pnt.y : '',
                    left: e ? s.offset.left + pnt.x : ''
                };

            s.element.css(css);
            return s;
        };

        p.onTouchStart = function (e) {
            var s = this,
                el = s.element,
                pnt = point().fromTouchEvent(e);

            e.offsetY = e.offsetY || pnt.y - el.offset().top;
            e.offsetX = e.offsetX || pnt.x - el.offset().left;

            s.offset = {
                top: -s.parOffset.top - e.offsetY,
                left: -s.parOffset.left - e.offsetX
            };

            s.touchEndWatch = bodySvc.touchEnd.watch(s.onTouchEnd.bind(s));
            s.touchMoveWatch = bodySvc.touchMove.watch(s.onTouchMove.bind(s));

            el.addClass('drag');

            s.setPosition(e).events.touchStart.set(e);

            return s;
        };

        p.onTouchMove = function (e) {
            var s = this,
                el = s.element;

            s.setPosition(e).events.touchMove.set(e);

            return s;
        };

        p.onTouchEnd = function () {
            var s = this,
                el = s.element;

            s.setPosition().events.touchEnd.set(Date.now());

            el.removeClass('drag');

            s.touchEndWatch();
            s.touchMoveWatch();
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

        p.destroy = function () {
            var s = this;
            s.windowSizeWatch();
            s.events.touchEnd.destroy();
            s.events.touchMove.destroy();
            s.events.touchStart.destroy();
            return s;
        };

        return function (element) {
            return new DraggableTouch(element);
        };
    }
]);
