//  Users List Actions Model

(function (angular) {
    "use strict";

    function factory(langTranslate, gridActions) {
        var model = gridActions();
        var translate = langTranslate('mastercharts').translate;
        model.get = function (record) {

            var copyParamsData = {

                "masterChartID": record.masterChartID,
                "copyMasterChartflag": false

            };

            var altParamsData = {

                "masterChartID": record.masterChartID,
                "copyMasterChartflag": true

            };
            return {
                className: 'rp-actions-menu-1',

                actions: [
                     {
                         data: record,
                         text: translate('bdgt_masterchart_actions_view'),
                         iconClassName: 'chart-view',
                         method: model.getMethod('viewMasterChart')
                     },
                    {
                        data: record,
                        text: translate('bdgt_masterchart_actions_edit'),
                        iconClassName: 'chart-edit',
                        method: model.getMethod('editMasterChart')
                    },
                    {
                        text: translate('bdgt_masterchart_actions_defaultAdjustment'),
                        iconClassName: 'chart-assign',
                        href: '#/admin/coa/defadj/' + record.masterChartID
                    },
                    {

                        data: copyParamsData,
                        text: translate('bdgt_masterchart_actions_copyAsMasterChart'),
                        method: model.getMethod('copyMasterChart'),
                        iconClassName: 'chart-copy'

                    },
                    {

                        data: altParamsData,
                        text: translate('bdgt_masterchart_actions_copyAsAlternateChart'),
                        method: model.getMethod('copyMasterChart'),
                        iconClassName: 'chart-copy'

                    },
                    {
                        text: translate('bdgt_masterchart_actions_print'),
                        iconClassName: 'chart-print',
                        href: '#/admin/coa/editmasterchart/' + record.masterChartID
                    },
                    {
                        data: record.masterChartID,
                        text: translate('bdgt_masterchart_actions_delete'),
                        method: model.getMethod('deleteMasterChart'),
                        iconClassName: 'chart-delete'
                    }
                ]
            };
        };
        return model;
    }

    angular
        .module("budgeting")
        .factory('masterchartListActionsDef', ['appLangTranslate', 'rpGridActions', factory]);
})(angular);

