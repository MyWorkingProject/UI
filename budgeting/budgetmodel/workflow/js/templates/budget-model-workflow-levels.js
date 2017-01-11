// templates/budgeting/budget-model/workflow/level-sections.html

//  Level Sections Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/budgeting/budget-model/workflow/level-sections.html";

    templateHtml = '<div class="workflow-page-content" ng-repeat="level in levels">' +
    '<div class="level-toggle-div" ng-click="dir.toggleLevel(level.sequence)">' +
        '<span class="level-toggle" ng-class="{open:level.state.open,close:!level.state.open}"></span><span class="workflow-level-value">Level {{level.sequence}}</span>' +
    '</div>' +
    '<div class="workflow-level-section" ng-class="{open:level.state.open,close:!level.state.open}">' +
        '<span class="scroll-left" ng-click="dir.scrollLeftElement(level.sequence,330,250);"></span>' +
        '<span class="scroll-right" ng-click="dir.scrollRightElement(level.sequence,330,250);"></span>' +
        '<div id="workflow-level-section-wrap{{level.sequence}}" class="workflow-level-section-wrap">' +
            '<div class="workflow-level-slider">' +
                '<ul class="level-div-border" ng-repeat="role in level.workflows">' +
                    '<li><span class="role-name">{{role.roleName}}</span><span ng-class="{Inactive:role.status == \'\',Submitted:role.status == \'Submitted\',Approved:role.status == \'Approved\',needAttention:role.needsAttention}"></span></li>' +
                    '<li><span class="due-date-label">Due Date: </span><span class="due-date" ng-class="{dateRed:role.needsAttention}">{{role.dueDate}}</span></li>' +
                    '<li class="sub-section-divider"><span class="submit-date-label">{{role.statusTitle}} Date: </span><span class="submit-date">{{role.statusDate}}</span></li>' +
                    '<li><span class="submit-by-label">{{role.statusTitle}} By: </span><span class="submit-by">{{role.statusBy}}</span></li>' +
                    '<li class="sub-section-divider" ng-class="{active:role.showHideDetails.state.active,inactive:!role.showHideDetails.state.active}"><span class="sections-label">Sections: </span><span class="sections">{{role.sections}}</span></li>' +
                    '<li class="sub-section-divider" ng-class="{active:role.showHideDetails.state.active,inactive:!role.showHideDetails.state.active}"><span class="users-label">Users: </span><span class="users">{{role.users}}</span></li>' +
                    '<li>' +
                        '<rp-toggle class="details-toggle"' +
    'model="role.showHideDetails.state.active"' +
    'options="{activeText: \'Show Details\',defaultText: \'Hide Details\'}">' +
'</rp-toggle>' +
'</li>' +
'</ul>' +
'</div>' +
'</div>' +
'</div>' +
'</div>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);
})(angular);
