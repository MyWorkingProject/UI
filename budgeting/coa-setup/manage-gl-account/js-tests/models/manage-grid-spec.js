

describe('Manage GL Common Module', function () {
    var model, createUpdateGlModel, manageGlAccountModel, manageGLAccountsSvc, manageGlErrorHandling, manageGlPrintModel,
       $q, promise, $rootScope;


    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);


        var spy1 = RealPage.spy();
        spy1._createMethods(['updateAccType', 'hideGlImport']);

        var spy2 = RealPage.spy();
        spy2._createMethods(['setPropertyVals', 'isChartType', 'isPropertyChart', 'getMasterChartID', 'getPropertyId']);

        var spy3 = RealPage.spy();
        spy3._createMethods(['getMasterchartGlList', 'getPropertyGlList', 'indexOf']);

        var spy4 = RealPage.spy();
        spy4._createMethods(['wizAlertException']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['laodAccountTypeData']);


        module(function ($provide) {
            $provide.value('createUpdateGlModel', spy1);
            $provide.value('manageGlAccountModel', spy2);
            $provide.value('manageGLAccountsSvc', spy3);
            $provide.value('manageGlErrorHandling', spy4);
            $provide.value('manageGlPrintModel', spy5);


        });


        function injector(a, b, c, d, e, f, g, h) {
            createUpdateGlModel = a;
            manageGlAccountModel = b;
            manageGLAccountsSvc = c;
            manageGlErrorHandling = d;
            manageGlPrintModel = e;
            model = f;
            $q = g;
            $rootScope = h;
        }

        inject([
            'createUpdateGlModel',
            'manageGlAccountModel',
            'manageGLAccountsSvc',
            'manageGlErrorHandling',
            'manageGlPrintModel',
            'manageGlGrid',
            '$q',
            '$rootScope',
            injector]);
    });

    it('loadInitFctns method laods all intially loaded functions', function () {
        var resp = { data: 1 };
        model.loadInitFctns(resp);
        expect(createUpdateGlModel._called.updateAccType).toBe(true);
        expect(manageGlPrintModel._called.laodAccountTypeData).toBe(true);
        expect(manageGlAccountModel._called.setPropertyVals).toBe(true);
    });

    it('hideGLImport hides link of gl import based on condition', function () {

        manageGlAccountModel._returnData.isChartType = true;
        model.hideGLImport();
        expect(createUpdateGlModel._called.hideGlImport).toBe(true);

    });

    it('hideGLImport hides link of gl import based on condition', function () {
        manageGlAccountModel._returnData.isChartType = false;
        model.hideGLImport();

    });

    it('getGlAccList builds params list and get data from service call', function () {
        manageGlAccountModel._returnData.isPropertyChart = false;
        var data = { pg: 1 };
        var params = {
            masterChartID: 1
            //datafilter: pg
        };
        model.getGlAccList(data);
    });

    it('getGlAccList builds params list and get data from service call for else block', function () {
        manageGlAccountModel._returnData.isPropertyChart = true;
        var data = { pg: 1 };
        var params = {
            masterChartID: 1
            //datafilter: pg
        };
        model.getGlAccList(data);
    });

    it('isValidWizardNext moves to next step', function () {
        model.form = {
            data: {
                "records": [
                         {
                             "glAccountID": 10972,
                             "masterChartID": 40,
                             "glAccountNumber": "53120"

                         },
                         {
                             "glAccountID": 11012,
                             "masterChartID": 40,
                             "glAccountNumber": "57135"

                         }]
            }
        };

        model.isValidWizardNext();

    });

    it('isValidWizardNext moves to next step', function () {
        model.form = {
            data: {
                "records": [

                ]
            }
        };

        model.isValidWizardNext();
        expect(manageGlErrorHandling._called.wizAlertException).toBe(true);

    });

    it("reset() should reset all data back to default values", function () {
        model.reset();

    });


    it('on updateFiltTypes to fill the filter options model', function () {
        var data = {
            records: [
                {
                    'name': 'All',
                    'value': 'All'
                },
                {
                    'name': 'Asset',
                    'value': 'Asset'
                }
            ]
        };
      model.updateFiltTypes(data);      
    });

    it('on updateFiltTypes to fill the filter options model', function () {
        model.form = {
            filterOptions: [
                   {
                    'name': 'All',
                       'value': 'All'
                   },
                {
                    'name': 'Asset',
                    'value': 'Asset'
                }
            ]
        };
        var data = {
            records: [
                {
                    'name': 'All',
                    'value': 'All'
                },
                {
                    'name': 'Asset',
                    'value': 'Asset'
                }
            ]
        };
        model.updateFiltTypes(data);
    });

});

