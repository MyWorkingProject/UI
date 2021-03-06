//  Source: _rp-core\_startup\js\_bundle.inc
var RealPage = {};
//  Source: _rp-core\_app\js\startup\js-extensions.js
//  Extending Javascript

(function (Function, String, Array, Date, window, undefined) {
    function define(Obj, key, fn) {
        var prototype = Obj.prototype;

        if (prototype[key]) {
            return;
        }

        var extn = {
            value: fn,
            writable: true,
            enumerable: false,
            configurable: true
        };

        Object.defineProperty(prototype, key, extn);
    }

    //  Function - Delay

    define(Function, 'delay', function (delayTime) {
        var _fn = this,
            args = Array.prototype.slice.call(arguments, 1);
        return window.setTimeout(function () {
            return _fn.apply(_fn, args);
        }, delayTime || 0.01);
    });

    //  Array - Find

    define(Array, 'find', function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }

        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }

        var list = Object(this),
            length = list.length >>> 0,
            thisArg = arguments[1],
            value;

        for (var i = 0; i < length; i++) {
            if (i in list) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
        }
        return undefined;
    });

    //  Array - Empty

    define(Array, 'empty', function () {
        return this.length === 0;
    });

    //  Array - Flush

    define(Array, 'flush', function () {
        while (this.length > 0) {
            this.pop();
        }
        return this;
    });

    //  Array - First

    define(Array, 'first', function () {
        return this[0];
    });

    //  Array - Last

    define(Array, 'last', function () {
        return this[this.length - 1];
    });

    //  Array - Remove

    define(Array, 'remove', function (from, to) {
        if (from > this.length || to > this.length) {
            throw new Error('Array:remove - index out of range');
        }
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        this.push.apply(this, rest);
        return this;
    });

    //  Array - Walk

    define(Array, 'walk', function (fn, scope) {
        if (this === null || this === undefined) {
            throw new TypeError('this is null or not defined');
        }

        if (typeof fn !== 'function') {
            throw new TypeError(fn + ' is not a function');
        }

        for (var i = 0, j = this.length; i < j; i++) {
            this[i] = fn.call(scope || window, this[i], i, this);
        }

        return this;
    });

    //  Array - Indexof

    define(Array, 'indexOf', function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    });

    //  Array - Contains

    define(Array, 'contains', function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    });

    //  Array - Unique

    define(Array, 'unique', function (obj) {
        var i = 0,
            arr = [];
        while (this[i]) {
            if (!arr.contains(this[i])) {
                arr = arr.concat([this[i]]);
            }
            i++;
        }
        return arr;
    });

    //  Array - Insert At

    define(Array, 'insertAt', function (index) {
        this.splice.apply(this, [index, 0]
            .concat(Array.prototype.slice.call(arguments, 1)));
        return this;
    });

    //  Array - Prepend

    define(Array, 'prepend', function (obj) {
        this.reverse();
        this.push(obj);
        this.reverse();
        return this;
    });

    //  String - Uppercase first letter

    define(String, 'ucfirst', function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    });

    //  String - Camelize

    define(String, 'camelize', function () {
        return (this + "").replace(/-\D/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    });

    //  String - Decamelize

    define(String, 'decamelize', function () {
        return (this + "").replace(/[a-z][A-Z]/g, function (str, offset) {
            return str[0] + '-' + str[1].toLowerCase();
        });
    });

    //  String - tokenReplace

    define(String, 'tokenReplace', function (data) {
        return this.replace(/\[([a-z0-9]+)\]/g, function (m, key) {
            return data[key];
        });
    });

    //  Date - Now

    define(Date, 'now', function () {
        return new Date().valueOf();
    });
})(Function, String, Array, Date, window);

//  Source: _rp-core\_app\js\startup\cookie.js
//  Cookie Module

(function (RealPage, document, undefined) {
    "use strict";

    RealPage.cookie = {
        create: function (name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        read: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0, j = ca.length; i < j; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return undefined;
        },

        erase: function (name) {
            this.create(name, "", -1);
        }
    };
})(RealPage, document);

//  Source: _rp-core\_app\js\startup\debug-mode.js
// Determine if in debug mode

(function (RealPage) {
    "use strict";

    RealPage.debugMode = function () {
        return RealPage.cookie.read('debugMode') === 'true';
    };
})(RealPage);

//  Source: _rp-core\_app\js\startup\debug.js
//  Debug Tools

var logc, logw;

(function (window, undefined) {
    "use strict";

    var fn = function () {},
        con = window.console;

    logc = fn;
    logw = fn;

    if (!con || !con.log) {
        return;
    }

    var log = con.log,
        warn = con.warn,

        debug = document.cookie.match('debugMode') ||
        window.location.href.match('osnext') ||
        window.location.href.match('onesitedev');

    if (log.bind) {
        log = log.bind(con);
    }

    if (warn.bind) {
        warn = warn.bind(con);
    }

    logc = debug ? log : fn;
    logw = debug ? warn : fn;
})(window.top);

//  Source: _rp-core\_app\js\startup\app-version.js
//  App Version

(function (RealPage) {
    "use strict";

    var svc = {};

    svc.random = Math.round(Math.random() * 1E10);

    svc.cacheFiles = function () {
        return RealPage.cookie.read('cacheFiles') === 'true';
    };

    svc.gen = function () {
        svc.appVer = RealPage.cookie.read('APPVER') || 123456780;
        svc.appVer = RealPage.debugMode() && !svc.cacheFiles() ? svc.random : svc.appVer;
        return svc;
    };

    svc.get = function () {
        if (svc.appVer) {
            return svc.appVer;
        }

        return svc.gen().appVer;
    };

    svc.append = function (url) {
        var find = /(\.)(css|js|html)/,
            replace = '$1$2?_=' + svc.get();
        return url.replace(find, replace);
    };

    RealPage.appVer = svc;
})(RealPage);

//  Source: _rp-core\_app\js\startup\startup.js
//  Startup Functions

(function (RealPage) {
    "use strict";

    var svc = {};

    svc.types = ['js', 'css'];

    svc.tags = {
        css: '<link rel="stylesheet" type="text/css" href="URL">',
        js: '<script type="text/javascript" src="URL"><\/script>'
    };

    svc.useMin = function (url) {
        var find = RealPage.debugMode() ? '.min' : '';
        return url.replace(find, '');
    };

    svc.writeTag = function (type, url) {
        var tag = svc.tags[type].replace('URL', url);
        document.write(tag);
    };

    svc.load = function (list) {
        list.forEach(function (item) {
            svc.types.forEach(function (type) {
                var url = item[type];

                if (!url) {
                    return;
                }

                url = svc.useMin(url);
                url = RealPage.appVer.append(url);

                svc.writeTag(type, url);
            });
        });
    };

    RealPage.startup = svc;
})(RealPage);

