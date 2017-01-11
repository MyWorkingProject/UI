(function () {

    "use strict";

    function factory(moment, langTranslate) {
        var translate, status;
        translate = langTranslate('mastercharts').translate;
        var linkMc = '#/admin/coa/editmasterchart';
        var linkWzd = 'admin/coa/wiz/new/normal/0';

        var htmlChartName = "<span ng-if='column.model.status==\"In-Progress\"'>" +
            "<span ng-switch='column.model.isAlternativeCOA'>" +
            "<a ng-switch-when='true' " +
            "class='link' href='#/admin/coa/wiz/new/alt/{{column.model.masterChartID}}'>{{column.model.name}}" +
            "</a>" +
            "<a ng-switch-when='false' " +
            "class='link' href='#/admin/coa/wiz/new/normal/{{column.model.masterChartID}}'>{{column.model.name}}" +
            "</a>" +
            "</span>" +
            "<span ng-class ='{inprogressicon:true}'></span>" +
            "</span>" +
            "<span ng-if='column.model.status==\"Completed\"'>" +
            "<a class='link' href='#/admin/coa/edit-masterchart/{{column.model.masterChartID}}'>{{column.model.name}}</a>" +
            "</span>";

        var AlternativeCOAHtml = "<span class='text'> " +
            "{{column.model.isAlternativeCOA?'Yes':'No'}}" +
            "</span>";

        return [
            {
                key: 'action',
                type: 'actionsMenu'
            },
            {
                key: 'name',
                html: htmlChartName
                }, {
                key: 'isAlternativeCOA',
                html: AlternativeCOAHtml,
                className: 'is-alternative-coa'
                }, {
                key: 'mappedChartNames',
                text: 'mappedChartNames',
                className: 'mapped-chart-names'
                }, {
                key: 'lastModifiedByName',
                text: 'lastModifiedByName',
                className: 'last-modified-by-name'
                }, {
                key: 'lastModifiedDate',
                type: 'date',
                className: 'last-modified-date',
                text: 'lastModifiedDate'

                }];
    }
    angular
        .module("budgeting")
        .factory('masterChartColumns', ['moment', 'appLangTranslate', factory]);

})();
