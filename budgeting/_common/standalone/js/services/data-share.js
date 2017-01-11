//  Data Share Service

angular.module("budgeting").service('dataShare', ['watchable',
    function (watchable) {
        var instances = {};

        function log() {
            logc(instances);
        }

        function dataShare(data) {
            var s = this;
            s.data = watchable(data);
        }

        var p = dataShare.prototype;

        p.get = function () {
            var s = this;
            return s.data.get();
        };

        p.set = function (data) {
            var s = this;
            return s.data.set(data);
        };

        p.watch = function (fn) {
            var s = this;
            return s.data.watch(fn);
        };

        p.destroy = function () {
            var s = this;
            s.data.destroy();
            return s;
        };

        p.log = log;

        return function (name, value) {
            if (!instances[name]) {
                instances[name] = new dataShare(value);
            }
            return instances[name];
        };
    }
]);
