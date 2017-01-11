(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/mastercharts/masterchart-status.html";

    templateHtml = "<span ng-if='record.status==\"In-Progress\"'>" +
                            "<span ng-switch='record.isAlternativeCOA'>" +
                            "<a ng-switch-when='true' " +
                            "class='link' href='#/admin/coa/wiz/new/alt/{{record.masterChartID}}'>{{record.name}}" +
                            "</a>" +
                            "<a ng-switch-when='false' " +
                            "class='link' href='#/admin/coa/wiz/new/normal/{{record.masterChartID}}'>{{record.name}}" +
                            "</a>" +
                            "</span>" +
                            "<span ng-class ='{inprogressicon:true}'></span>" +
                            "</span>" +
                            "<span ng-if='record.status==\"Completed\"'>" +
                            "<a class='link' href='#/admin/coa/editmasterchart/{{record.masterChartID}}'>{{record.name}}</a>" +
                            "</span>";


    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }


    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);


})();