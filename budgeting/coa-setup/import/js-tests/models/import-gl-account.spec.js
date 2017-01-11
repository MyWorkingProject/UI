// Tests for Import GL Account Controller

describe('Import GL Account Model', function () {
    var translator, breadcrumbs, impGlSvc, locationObj, model, filterObj;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        breadcrumbs = RealPage.spy();
        breadcrumbs._createMethods(['updateCurrent']);

        locationObj = RealPage.spy();
        locationObj._createMethods(['path']);

        var svcMethods = [
            'getChartData',
            'getActiveImportOptions',
            'updateWizStep',
            'delStagingData',
            'then'
        ];

        impGlSvc = RealPage.spy();
        impGlSvc._createMethods(svcMethods);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('rpBreadcrumbsModel', breadcrumbs);
            $provide.value('importGlService', impGlSvc);
            $provide.value('$location', locationObj);
        });

    });

    beforeEach(inject(function (appLangTranslate, rpBreadcrumbsModel, importGlService, $location, $filter, importGLModel) {
        translator = appLangTranslate;
        breadcrumbs = rpBreadcrumbsModel;
        impGlSvc = importGlService;
        locationObj = $location;
        filterObj = $filter;
        model = importGLModel;
    }));

    it('on setChartID set chart id value', function () {
        var id = 1;
        model.setChartID(id);
        expect(model.form.chartID).toBe(1);
    });

    it('on getChartID get chart id value', function () {
        var id = model.getChartID();
        expect(id).toBe(0);
    });

    it('on isWizardUpdate to set wizard', function () {
        var path = '/admin/coa/wiz/import';
        model.isWizardUpdate(path);
        expect(model.form.wizard).toBe(true);
    });

    it('on isWizardUpdate not to set wizard', function () {
        var path = '/admin/coa/import';
        model.isWizardUpdate(path);
        expect(model.form.wizard).toBe(false);
    });

    it('on getBreadcrumbs master chart data', function () {
        var id = 1;
        model.getBreadcrumbs(id);

        expect(impGlSvc._called.getChartData).toBe(true);
    });

    it('on updateBreadCrumb update master chart name in bread crumb', function () {
        var resp = {
            records: [
                {
                    name: 'Test Masterchart'
                }
            ]
        };

        model.updateBreadCrumb(resp);
        expect(breadcrumbs._called.updateCurrent).toBe(true);
    });

    it('on getActiveImportOptions get active import options', function () {
        model.getActiveImportOptions();
        expect(impGlSvc._called.getActiveImportOptions).toBe(true);
    });

    it('on getReqData get current wizard type and step', function () {
        var id = model.getReqData();
        expect(id.wizardType).toBe("MasterChart");
    });

    it('on updateActiveImportOptions to show only active items accounting check', function () {
        var resp = {
            records: [
                {
                    featureCode: "OneSite Accounting",
                    active: false
                },
                {
                    featureCode: "MRI",
                    active: true
                },
                {
                    featureCode: "Yardi",
                    active: true
                }
            ]
        };
        var called = false;
        model.isItemAccounting = function () {
            called = true;
            return called;
        };
        model.updateActiveImportOptions(resp);
        expect(called).toBe(true);
    });

    it('on updateActiveImportOptions to show only active items MRI check', function () {
        var resp = {
            records: [
                {
                    featureCode: "OneSite Accounting",
                    active: true
                },
                {
                    featureCode: "MRI",
                    active: false
                },
                {
                    featureCode: "Yardi",
                    active: true
                }
            ]
        };
        var called = false;
        model.isItemMri = function () {
            called = true;
            return called;
        };
        model.updateActiveImportOptions(resp);
        expect(called).toBe(true);
    });

    it('on updateActiveImportOptions to show only active items YARDI check', function () {
        var resp = {
            records: [
                {
                    featureCode: "OneSite Accounting",
                    active: true
                },
                {
                    featureCode: "MRI",
                    active: true
                },
                {
                    featureCode: "Yardi",
                    active: false
                }
            ]
        };
        var called = false;
        model.isItemYardi = function () {
            called = true;
            return called;
        };
        model.updateActiveImportOptions(resp);
        expect(called).toBe(true);
    });

    it('on getNotActiveOptions to get active options to import', function () {
        var resp = {
            records: [
                {
                    featureCode: "OneSite Accounting",
                    active: true
                },
                {
                    featureCode: "MRI",
                    active: true
                },
                {
                    featureCode: "Yardi",
                    active: false
                }
            ]
        };
        var id = model.getNotActiveOptions(resp.records);
        expect(id[0].featureCode).toBe("Yardi");
    });

    it('on isItemAccounting check is feature accounting', function () {
        var bln = model.isItemAccounting('OneSite Accounting');

        expect(bln).toBe(false);

        var bln2 = model.isItemAccounting('Accounting');

        expect(bln2).toBe(true);
    });

    it('on isItemMri check is feature MRI', function () {
        var bln = model.isItemMri('OneSite Accounting');

        expect(bln).toBe(false);

        var bln2 = model.isItemMri('MRI');

        expect(bln2).toBe(true);
    });

    it('on isItemYardi check is feature YARDI', function () {
        var bln = model.isItemYardi('OneSite Accounting');

        expect(bln).toBe(false);

        var bln2 = model.isItemYardi('Yardi');

        expect(bln2).toBe(true);
    });

    it('on updateWizStep to update the wizard step completion', function () {
        var data = {
            "wizardType": "MasterChart",
            "referenceID": 1,
            "stepID": 2
        };
        model.updateWizStep(data);

        expect(impGlSvc._called.updateWizStep).toBe(true);
    });

    it('on delStagingData to delete staging data', function () {
        var params = {
            chartID: 1
        };
        model.delStagingData();

        expect(impGlSvc._called.delStagingData).toBe(true);
    });

    it('on getselectedVal to get selected source value', function () {
        model.form.selVal = "Accounting";
        var retData = model.getselectedVal();

        expect(retData).toBe("Accounting");
    });

    it('on reset copy default data to form data', function () {
        model.emptyData = {
            chartID: 0,
            wizard: false,
            selVal: ""
        };

        model.reset();

        expect(model.form.chartID).toBe(0);

    });

    it('on loadNextView check for selection and load next view', function () {
        var called = false;
        model.getImportFrom = function () {
            called = true;
            return "";
        };

        model.loadNextView();
        expect(called).toBe(true);
    });

    it('on getImportFrom return selected route', function () {
        model.form = {
            importFrom: {
                "OneSite Accounting": "/acc",
                "OneSite Leasing & Rents": "/lr",
                "MRI": "/mri",
                "Yardi": "/yardi",
                "CSV File": "/csv"
            }
        };

        model.form.selVal = "OneSite Accounting";
        var routeVal = model.getImportFrom();

        expect(routeVal).toBe("/acc");

        model.form.selVal = "";
        var routeVal2 = model.getImportFrom();
        expect(routeVal2).toBe("");
    });

    it('on goToView move on to new view location', function () {
        model.form.wizard = true;
        model.form.chartID = 1;
        var val = "/acc";
        model.goToView(val);

        expect(locationObj._called.path).toBe(true);
    });

    it('on isAccounting  check if accounting selected or not', function () {
        model.form.selVal = "OneSite Accounting";
        var bln = model.isAccounting();

        expect(bln).toBe(true);


        model.form.selVal = "OneSite";
        var bln2 = model.isAccounting();
        expect(bln2).toBe(false);
    });

});

