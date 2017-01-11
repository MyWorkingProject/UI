//  App Startup

(function () {
    "use strict";

    var cdnVer = "v1.0.0";

    RealPage.startup.load([
        {
            js: "../" + cdnVer + "/lib/app/js/scripts.min.js",
            css: "../" + cdnVer + "/lib/app/css/styles.min.css"
        },
        {
            js: "app/js/scripts.min.js",
            css: 'app/css/styles.min.css'
        }
    ]);
})();
