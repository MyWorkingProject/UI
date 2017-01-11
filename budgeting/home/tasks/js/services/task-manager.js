//  Tasks Manager Service

angular.module("budgeting").service('taskManager', ['point', 'watchable', 'dataShare',
    function (point, watchable, dataShare) {
        var instance,
            placeholderIndex,
            placeholder = {
                title: '',
                details: [],
                id: 'placeholder',
                outerWidth: watchable(0),
                className: 'placeholder',
                isActive: watchable(true)
            },
            taskZoneVersion = dataShare('taskZoneVersion');

        function taskManager() {}

        var p = taskManager.prototype;

        p.setScope = function (scope) {
            var s = this;
            s.scope = scope;
            s.updateTasks();
            return s;
        };

        p.updateTasks = function () {
            var s = this;
            s.tasks = [];
            s.scope.tasks.forEach(function (task) {
                s.tasks.push(task);
            });
            return s;
        };

        p.setActiveTask = function (point) {
            var s = this;

            s.activeTask = undefined;
            s.activeTaskIndex = undefined;

            s.tasks.forEach(function (task, index) {
                if (task.isActive.get() && task.zone.contains(point)) {
                    s.activeTask = task;
                    s.activeTaskIndex = index;
                }
            });

            s.insertTask(s.activeTaskIndex, placeholder);
            return s;
        };

        p.movePlaceholder = function (point) {
            var s = this,
                activeIndex;

            s.tasks.forEach(function (task, index) {
                if (task.isActive.get() && task.zone.contains(point)) {
                    activeIndex = index;
                }
            });

            if (activeIndex === undefined) {
                return s;
            }

            activeIndex += activeIndex > s.activeTaskIndex ? 1 : 0;

            if (placeholderIndex != activeIndex) {
                s.removeTask('placeholder').insertTask(activeIndex, placeholder);
                placeholderIndex = activeIndex;
            }

            return s;
        };

        p.insertTask = function (insertIndex, task) {
            var s = this;
            s.scope.tasks.insertAt(insertIndex, task);
            return s;
        };

        p.removeTask = function (taskId) {
            var s = this;
            s.scope.tasks = s.scope.tasks.filter(function (task) {
                return task.id != taskId;
            });
            return s;
        };

        p.reorderTasks = function () {
            var s = this,
                insertAtIndex = placeholderIndex;

            if (placeholderIndex === undefined) {
                insertAtIndex = s.activeTaskIndex;
            }

            s.removeTask('placeholder').removeTask(s.activeTask.id);

            insertAtIndex -= placeholderIndex > s.activeTaskIndex ? 1 : 0;

            s.insertTask(insertAtIndex, s.activeTask);

            s.updateTasks();
            s.activeTask = undefined;
            placeholderIndex = undefined;
            s.activeTaskIndex = undefined;

            setTimeout(function () {
                taskZoneVersion.set(Date.now());
            }, 100);

            return s;
        };

        return function () {
            if (!instance) {
                instance = new taskManager();
            }
            return instance;
        };
    }
]);
