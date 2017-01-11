//  Task Service

angular.module("budgeting").service('task', ['point', 'rectangle', 'Draggable', 'windowSize', 'dataShare', 'taskManager', 'workspaceSvc',

    function (point, rectangle, Draggable, windowSize, dataShare, taskManager, workspaceSvc) {
        var taskMgr = taskManager(),
            dragActive = dataShare('dragActive'),
            taskZoneVersion = dataShare('taskZoneVersion');

        function Task(element, model) {
            var s = this;
            s.model = model;
            s.element = angular.element(element);
            setTimeout(s.init.bind(s));
        }

        var p = Task.prototype;

        p.init = function () {
            var s = this;

            s.title = s.element.children('h3');
            s.model.outerWidth.set(s.element.outerWidth(true));

            s.setDraggable().recordRegions().setWatch();
            return s;
        };

        p.setDraggable = function () {
            var ev, s = this;
            s.draggable = Draggable(s.element);

            ev = s.draggable.events;

            ev.restore.watch(taskMgr.reorderTasks.bind(taskMgr));

            ev.mouseDown.watch(function (e) {
                taskMgr.setActiveTask(point().fromEvent(e));
            });

            ev.mouseMove.watch(function (e) {
                taskMgr.movePlaceholder(point().fromEvent(e));
            });
            return s;
        };

        p.recordRegions = function () {
            var s = this;
            s.head = rectangle().fromElement(s.title);
            s.body = rectangle().fromElement(s.element);
            s.model.zone = s.body.clone();

            s.draggable.recordParentOffset();

            s.body.shiftY(s.head.height).shiftHeight(-s.head.height);
            return s;
        };

        p.setWatch = function () {
            var s = this;

            s.model.isActive.watch(function () {
                setTimeout(function () {
                    taskZoneVersion.set(Date.now());
                }, 200);
            });

            s.zoneWatch = taskZoneVersion.watch(s.recordRegions.bind(s));
            s.windowSizeWatch = windowSize.subscribe(s.recordRegions.bind(s));
            return s;
        };

        p.setClass = function (classNames, isActive) {
            var s = this;
            s.element[isActive ? 'addClass' : 'removeClass'](classNames);
            return s;
        };

        p.onMouseDown = function (e) {
            var s = this,
                pnt = point().fromEvent(e);

            e.preventDefault();

            s.mouseDownEvent = e;

            if (s.head.contains(pnt)) {
                s.draggable.onMouseDown(e);
            }
            else {
                s.setClass('active', true);
            }

            return s;
        };

        p.onMouseMove = function (e) {
            var s = this,
                pnt = point().fromEvent(e);

            if (!dragActive.get() && s.body) {
                s.setClass('hover', s.body.contains(pnt));
            }
            return s;
        };

        p.onMouseUp = function (e) {
            var s = this;
            logc("In mouse Up");
            logc(s);
            var mde = s.mouseDownEvent,
                pnt = point().fromEvent(mde),
                isClick = mde && e.pageX === mde.pageX && e.pageY === mde.pageY;

            s.setClass('active', false);

            if (isClick && !s.head.contains(pnt)) {
                workspaceSvc.goTo(s.model.title);
            }
            return s;
        };

        p.onMouseLeave = function () {
            var s = this;
            s.setClass('hover active', false);
            return s;
        };

        p.destroy = function () {
            var s = this;
            s.zoneWatch();
            s.windowSizeWatch();
            s.draggable.destroy();
            s.model.isActive.destroy();
            s.model.outerWidth.destroy();
            return s;
        };

        return function (element, model) {
            return new Task(element, model);
        };
    }
]);
