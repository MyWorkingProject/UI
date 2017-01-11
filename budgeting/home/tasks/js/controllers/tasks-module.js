//  Tasks Module Controller

(function (angular) {
    "use strict";

    function TasksModuleCtrl($scope, session, Tasks, taskManager, watchable, cookie, moment, dateRangeModel, httpSVC) {
        var vm = this,
            taskMgr = taskManager(),
            dateRange = dateRangeModel('tasksDateRange').setAnchor('left');

        var httpSvc = httpSVC();

        vm.init = function () {

            $scope.tasks = {
                "tasklist": [{
                    "isActive": true,
                    "className": "task",
                    "title": "Budget Workflow Status",
                    "details": [{
                        "metric": "5",
                        "status": "",
                        "description": "In Progress"
                            }, {
                        "metric": "2",
                        "status": "notify-warning",
                        "description": "Need approval"
                            }, {
                        "metric": "6",
                        "status": "notify-alert",
                        "description": "overdue"
                            }]
                        }, {
                    "isActive": true,
                    "className": "task",
                    "title": "Contracts",
                    "details": [{
                        "metric": "5",
                        "status": "",
                        "description": "Expiring within 30 days"
                            }, {
                        "metric": "2",
                        "status": "notify-alert",
                        "description": "Expired"
                            }]
                        }, {
                    "isActive": true,
                    "className": "task",
                    "title": "Budgeting Tasks",
                    "details": [{
                        "metric": "0",
                        "status": "",
                        "description": "Pending tasks"
                            }, {
                        "metric": "2",
                        "status": "notify-alert",
                        "description": "overdue"
                            }]
                        }, {
                    "isActive": true,
                    "className": "task",
                    "title": "Budgeting Comments",
                    "details": [{
                        "metric": "7",
                        "status": "",
                        "description": "Unread"
                            }]
                        }]
            };

            $scope.busyIndicatorModel = {
                state: watchable(),
                retry: watchable(Date.now())
            };

            return vm;
        };

        vm.initDateRange = function () {
            var today = moment(),
                format = 'MM/DD/YYYY',
                endOfMonth = today.clone().add(1, 'month').date(1).add(-1, 'day');

            $scope.dateRange = dateRange;

            if (dateRange.isEmpty()) {
                dateRange.setRange({
                    startDate: today.format(format),
                    endDate: endOfMonth.format(format)
                });
            }

            $scope.busyIndicatorModel.retry.watch(vm.getTasks);
            dateRange.change.subscribe(vm.getTasks);
            return vm;
        };

        vm.getTasks = function () {
            var range = dateRange.getRange();
            $scope.busyIndicatorModel.state.set('busy');
            // Tasks.get(range, vm.updateTasks);
            httpSvc.getData('/api/budgeting/common/tasks/0').success(function (respData) {

                vm.updateTasks(respData);
            }).error(function (data, status) {
                httpSvc.onError(data, status);
            });

        };

        vm.getSiteName = function () {
            return session.get().siteName || '';
        };

        vm.updateTasks = function (data) {
            var time = Date.now();

            $scope.busyIndicatorModel.state.set('off');

            data.tasklist.forEach(function (task, index) {
                index += time;
                task.id = 'id' + index;
                task.outerWidth = watchable(0);
                task.isActive = watchable(true);
            });

            $scope.tasks = data.tasklist;
            taskMgr.setScope($scope);
        };

        vm.init().initDateRange().getTasks();
    }

    angular
        .module("budgeting")
        .controller('TasksModuleCtrl', [
            '$scope',
            'session',
            'Tasks',
            'taskManager',
            'watchable',
            'cookie',
            'moment',
            'rpDateRangeModel',
            'httpServiceCall',
            TasksModuleCtrl
        ]);
})(angular);
