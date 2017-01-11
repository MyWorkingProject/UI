//  Task Touch Service

angular.module("budgeting").service('taskTouch', ['$rootScope', 'point', 'rectangle', 'dataShare', 'windowSize', 'DraggableTouch', 'taskManager', 'workspaceSvc',

    function ($rootScope, point, rectangle, dataShare, windowSize, DraggableTouch, taskManager, workspaceSvc) {
        var taskMgr = taskManager(),
            taskZoneVersion = dataShare('taskZoneVersion');

        function taskTouch(element, model) {
            var s = this;
            s.model = model;
            s.element = element;
            s.$element = angular.element(element);
            setTimeout(s.init.bind(s));
        }

        var p = taskTouch.prototype;

        p.init = function () {
            var s = this;
            s.title = s.$element.children('h3');
            s.model.outerWidth.set(s.$element.outerWidth(true));

            s.setDraggable().bindEvents().recordRegions().setWatch();
            return s;
        };

        p.setDraggable = function () {
            var ev, s = this;
            s.draggable = DraggableTouch(s.element);
            ev = s.draggable.events;

            ev.touchEnd.watch(taskMgr.reorderTasks.bind(taskMgr));

            ev.touchStart.watch(function (e) {
                taskMgr.setActiveTask(point().fromTouchEvent(e));
            });

            ev.touchMove.watch(function (e) {
                taskMgr.movePlaceholder(point().fromTouchEvent(e));
            });
            return s;
        };

        p.updateZoneVersion = function () {
            var s = this;
            setTimeout(function () {
                taskZoneVersion.set(Date.now());
            }, 200);
            return s;
        };

        p.recordRegions = function () {
            var s = this;
            s.head = rectangle().fromElement(s.title);
            s.body = rectangle().fromElement(s.$element);
            s.model.zone = s.body.clone();

            s.body.shiftY(s.head.height).shiftHeight(-s.head.height);

            s.draggable.recordParentOffset();
            return s;
        };

        p.setWatch = function () {
            var s = this;
            s.cancelZoneWatch = taskZoneVersion.watch(s.recordRegions.bind(s));
            s.cancelActiveWatch = s.model.isActive.watch(s.updateZoneVersion.bind(s));
            s.cancelWindowSizeWatch = windowSize.subscribe(s.recordRegions.bind(s));
            return s;
        };

        p.activateDrag = function (e) {
            var s = this;
            clearTimeout(s.activateDragTimer);
            s.activateDragTimer = setTimeout(function () {
                $rootScope.$apply(function () {
                    s.draggable.onTouchStart(e);
                });
            }, 300);
            return s;
        };

        p.deactivateDrag = function () {
            var s = this;
            clearTimeout(s.activateDragTimer);
            return s;
        };

        p.onTap = function () {
            var s = this;
            s.$element.addClass('hover');
            workspaceSvc.goTo(s.model.title);
            setTimeout(function () {
                s.$element.removeClass('hover');
            }, 100);
            return s;
        };

        p.onTouchStart = function (e) {
            var s = this;
            if (!s.touchStart) {
                s.touchStart = point().fromTouchEvent(e);
                s.touchLatest = point().fromTouchEvent(e);
            }
            if (s.head.contains(s.touchStart)) {
                s.activateDrag(e);
            }
            return s;
        };

        p.onTouchMove = function (e) {
            var s = this;
            s.deactivateDrag();
            s.touchLatest = point().fromTouchEvent(e);
            return s;
        };

        p.onTouchEnd = function (e) {
            var s = this,
                tap = s.touchStart.isSame(s.touchLatest) && s.body.contains(s.touchStart);

            if (tap) {
                s.onTap();
            }

            s.deactivateDrag();

            s.touchStart = undefined;
            s.touchLatest = undefined;
            return s;
        };

        p.bindEvents = function () {
            var s = this;
            s.$element
                .on('touchend.task', s.onTouchEnd.bind(s))
                .on('touchmove.task', s.onTouchMove.bind(s))
                .on('touchstart.task', s.onTouchStart.bind(s));
            return s;
        };

        p.destroy = function () {
            var s = this;
            s.cancelZoneWatch();
            s.draggable.destroy();
            s.cancelWindowSizeWatch();
            s.model.isActive.destroy();
            s.model.outerWidth.destroy();
            return s;
        };

        return function (element, model) {
            return new taskTouch(element, model);
        };
    }
]);
