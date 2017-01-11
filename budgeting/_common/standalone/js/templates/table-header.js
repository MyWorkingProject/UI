//  Table Headers Template

angular.module("budgeting").run(["$templateCache",
    function($templateCache) {
        $templateCache.put("templates/shared/table-header.html",

            "<div class='table-head'>" +
                "<div class='row'>" +
                    "<div ng-repeat='header in model.headers' " +
                        "class='cell {{header.className}}' " +
                        "ng-class='{sortable: header.isSortable, " +
                            "asc: model.sortBy == header.name && !model.reverse, " +
                            "desc: model.sortBy == header.name && model.reverse }' " +
                        "ng-click='tableHeader.sortBy(header)' >" +
                        "<span class='cell-text' ng-if='header.type == undefined' >" +
                            "{{header.text}}" +
                            "<span ng-if='header.isSortable' " +
                                "class='icon'>" +
                            "</span>" +
                        "</span>" +
                        "<span class='cell-text' ng-if='header.type == \"checkbox\"' >" +
                            "<input id='{{header.id}}' ng-true-value='1' " +
                                "ng-false-value='0' type='checkbox' />" +
                        "</span>" +
                    "</div>" +
                "</div>" +
            "</div>"

        );
    }
]);
