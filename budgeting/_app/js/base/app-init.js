//  Initialize Angular App Modules

(function (angular) {

    var base, dependencies;

    base = ["app"];

    dependencies = [
        "rpActionsMenu",
        "rpAuthorization",
        "rpBreadcrumbs",
        "rpBusyIndicator",
        "rpCollapsibleList",
        "rpComplexGrid",
        "rpDatepicker",
        "rpDatetimepicker",
        "rpDateRange",
        "rpDraggable",
        "rpDroppable",
        "rpExpandableList",
        "rpFloatScroll",
        "rpFormInput",
        "rpFormInputDate",
        "rpFormInputText",
        "rpFormSelectMenu",
        "rpGlobalHeader",
        "rpGrid",
        "rpInlineDialog",
        "rpInputDate",
        "rpLanguage",
        "rpNotifications",
        "rpPageTitle",
        "rpPagination",
        "rpPopover",
        "rpPrimaryNav",
        "rpPropertyPicker",
        "rpSessionInfo",
        "rpSlideToggle",
        "rpTabsMenu",
        "rpToggle",
        "rpUser",
        "rpWorkspaces",
        "rpScrollingTabsMenu",
        "rpFormTextarea",
        "rpDaterangepicker"


    ];

    dependencies.forEach(function (moduleName) {
        angular.module(moduleName, []);
    });

    angular
        .module("budgeting", dependencies.concat(base));
})(angular);
