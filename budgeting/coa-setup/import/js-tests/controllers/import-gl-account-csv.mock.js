// Import GL Account CSV Controller Mock

(function (angular) {
    "use strict";

    function BdgtImprtGlCsv($scope, $stateParams, model, errModel, gridModel, viewSpecGrid, timeout) {
        var methods, pagination, stateParams,
            vm = this,
            mock = RealPage.spy();

        methods = [
            'loadProperties',
            'reset',
            'isPropertyID',
            'hideLoadBtn',
            'showLoadBtn',
            'getGlAccs',
            'getGlAccsError',
            'getFiltOptions',
            'getFiltOptionsError',
            'updateFilters',
            'updateGrid',
            'getDefaultFilter',
            'getStagingData',
            'getStagingDataError',
            'getFilterObj',
            'saveGlAccs',
            'saveGlAccsError',
            'getGlsToDelete',
            'delGlAccs',
            'delGlAccsError',
            'getCsvTemplate',
            'getUploadedFile',
            'loadCSVFile',
            'updateToolTipState',
            'isHelpIconInfo',
            'setHelpIconInfo',
            'then'
        ];

        model = RealPage.spy();
        model._createMethods(methods);

        $stateParams = {
            chartID: 1
        };


        var errModelMethods = [
            'reset',
            'getCsvTemplateError',
            'loadCSVFileError',
            'getFiltOptionsError',
            'delGlAccsError',
            'showDelGlsSuccMsg',
            'showSaveSuccessMessage',
            'saveGlAccsError'
        ];

        errModel = RealPage.spy();
        errModel._createMethods(errModelMethods);

        var gridModelMethods = [
            'setChartID',
            'reset',
            'setGridReady',
            'updateGrid',
            'load',
            'hasGlSelections',
            'deleteGls',
            'then'
        ];

        gridModel = RealPage.spy();
        gridModel._createMethods(gridModelMethods);

        viewSpecGrid = RealPage.spy();
        viewSpecGrid._createMethods(['setGridData']);

        module(function ($provide) {
            $provide.value('importGlAccModel', model);
            $provide.value('importGlAccMsgModel', errModel);
            $provide.value('importGlGridModel', gridModel);
            $provide.value('ImportViewSpecModel', viewSpecGrid);
            $provide.value('$stateParams', stateParams);
        });
        //methods = [
        //    'init',
        //    'updateModel',
        //    'afterUpdate',
        //    'startDrag',
        //    'drag',
        //    'endDrag',
        //    'goTo',
        //    'destroy'
        //];

        //mock._createMethods(methods);

        //methods.forEach(function (methodName) {
        //    vm[methodName] = mock[methodName];
        //});
    }

    RealPage.ngMocks
        .namespace('budgeting.coaSetup.import')
        .mockCtrl('BdgtImprtGlCsv', ['$scope', '$stateParams', 'importGlAccModel', 'importGlAccMsgModel', 'importGlGridModel', 'ImportViewSpecModel', '$timeout', BdgtImprtGlCsv]);
})(angular);

