// Tests for Import Category Model

describe('Import Category Model', function () {
    var translator, breadcrumbs, impCatSvc, model, filterObj;

    beforeEach(module('budgeting.coaSetup.importCategory'));

    beforeEach(function () {

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        breadcrumbs = RealPage.spy();
        breadcrumbs._createMethods(['updateCurrent']);

        var svcMethods = [
            'getProps',
            'getCategories',
            'loadFileData',
            'getCsvTemplate',
            'saveCategories',
            'updateCrumbs',
            '$promise',
            'then'
        ];

        impCatSvc = RealPage.spy();
        impCatSvc._createMethods(svcMethods);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('rpBreadcrumbsModel', breadcrumbs);
            $provide.value('importCategoryService', impCatSvc);
        });

    });

    beforeEach(inject(function (appLangTranslate, $filter, rpBreadcrumbsModel, importCategoryService, importCategoryModel) {
        translator = appLangTranslate;
        breadcrumbs = rpBreadcrumbsModel;
        impCatSvc = importCategoryService;
        filterObj = $filter;
        model = importCategoryModel;
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

    it('on getSelVal to get selected value', function () {
        model.form.selVal = 1;
        var id = model.getSelVal();
        expect(id).toBe(1);
    });

    it('on resetValsToDefault to reset all values to default on selection change of dropdown', function () {
        model.resetValsToDefault();
        expect(model.form.selectCSV).toBe(false);
        expect(model.form.showPropertyData).toBe(false);
        expect(model.form.showDataGrid).toBe(false);
        expect(model.form.propertyData.options[1]).toBe(undefined);
    });

    it('on isAccSelection return true if accounting selected', function () {
        model.form.selVal = "OneSite Accounting";
        var bln = model.isAccSelection();
        expect(bln).toBe(true);

        model.form.selVal = "CSV File";
        var bln2 = model.isAccSelection();
        expect(bln2).toBe(false);
    });

    it('on isCsvSelection return true if csv selected', function () {
        model.form.selVal = "OneSite Accounting";
        var bln = model.isCsvSelection();
        expect(bln).toBe(false);

        model.form.selVal = "CSV File";
        var bln2 = model.isCsvSelection();
        expect(bln2).toBe(true);
    });

    it('on setAccOperations should set operations for accounting', function () {
        var called = false;
        model.loadProperties = function () {
            called = true;
        };
        model.setAccOperations();
        expect(model.form.loadBtnClick).toBe("page.loadGlCategories");
        expect(model.form.saveBtnClick).toBe("page.saveGlAccounts");
        expect(called).toBe(true);
    });

    it('on setCsvOperations should set operations for csv', function () {
        model.setCsvOperations();
        expect(model.form.loadBtnClick).toBe("page.loadCSVData");
        expect(model.form.saveBtnClick).toBe("page.saveGlAccountsCsv");
    });

    it('on srcChangeUpdate should to set operations depends on source selection', function () {
        var called = false;
        model.loadProperties = function () {
            called = true;
        };
        model.form.selVal = "OneSite Accounting";
        model.srcChangeUpdate();
        expect(model.form.loadBtnClick).toBe("page.loadGlCategories");
        expect(model.form.saveBtnClick).toBe("page.saveGlAccounts");
        expect(called).toBe(true);

        model.form.selVal = "CSV File";
        model.srcChangeUpdate();
        expect(model.form.loadBtnClick).toBe("page.loadCSVData");
        expect(model.form.saveBtnClick).toBe("page.saveGlAccountsCsv");

        model.form.selVal = "";
        model.srcChangeUpdate();
    });

    //it('on loadProperties should get properties from service', function () {
    //    model.loadProperties();
    //    expect(impCatSvc._called.getProps).toBe(true);
    //    expect(impCatSvc._called.$promise).toBe(true);
    //    expect(impCatSvc._called.then).toBe(true);
    //});

    it('on updateProperties should append properties to dropdown', function () {
        var resp = {
            records: [{
                "propertyID": 1,
                "propertyName": "Meadow Bay"
            }, {
                "propertyID": 2,
                "propertyName": "Meadow Bay 2"
            }]
        };
        model.updateProperties(resp);
        expect(model.form.propertyData.options[1].propertyID).toBe(1);
        expect(model.form.showPropertyData).toBe(true);
    });

    it('on getCategoriesAcc should get accouting categories from service', function () {
        model.form.selectedPropertyID = 1;
        model.getCategoriesAcc();
        expect(impCatSvc._called.getCategories).toBe(true);
    });

    it('on loadFile should load file for csv categories from service', function () {
        model.form.chartID = 1;
        var file = {
            name: 'GL Account Category.csv'
        };
        model.loadFile(file);
        expect(impCatSvc._called.loadFileData).toBe(true);
    });

    it('on getCsvTemplate should get csv template to import categories from csv', function () {
        model.getCsvTemplate();
        expect(impCatSvc._called.getCsvTemplate).toBe(true);
    });


    it('on saveCategories should save categories using service', function () {
        model.form.chartID = 1;
        var type = 'osa';
        var data = {
            records: [
        {
            "accountCategoryID": 1,
            "accountCategory": "Rent Revenue",
            "glAccountType": "Asset",
            "accountTypeID": 1,
            "masterChartID": 1,
            "sequence": 1
        },
            {
                "accountCategoryID": 2,
                "accountCategory": "Other Revenue",
                "glAccountType": "Income",
                "accountTypeID": 5,
                "masterChartID": 1,
                "sequence": 2
            },
        {
            "accountCategoryID": 3,
            "accountCategory": "Administrative Expenses",
            "glAccountType": "Expense",
            "accountTypeID": 6,
            "masterChartID": 1,
            "sequence": 3
        }
            ]
        };
        model.saveCategories(type, data);
        expect(impCatSvc._called.saveCategories).toBe(true);
    });

    it('on updateBreadcrumbs should update breadcrumbs using service', function () {
        model.form.chartID = 1;
        model.updateBreadcrumbs();
        expect(impCatSvc._called.updateCrumbs).toBe(true);
    });

   it('on filterSvc should filter data as per filtered text', function () {
        var filt = { "accountCategory": "Revenue" };
        var data = {
            records: [
        {
            "accountCategoryID": 1,
            "accountCategory": "Rent Revenue",
            "glAccountType": "Asset",
            "accountTypeID": 1,
            "masterChartID": 1,
            "sequence": 1
        },
            {
                "accountCategoryID": 2,
                "accountCategory": "Other Revenue",
                "glAccountType": "Income",
                "accountTypeID": 5,
                "masterChartID": 1,
                "sequence": 2
            },
        {
            "accountCategoryID": 3,
            "accountCategory": "Administrative Expenses",
            "glAccountType": "Expense",
            "accountTypeID": 6,
            "masterChartID": 1,
            "sequence": 3
        }
            ]
        };
        var rtrnObj = model.filterSvc(filt, data);
        expect(rtrnObj.records.length).toBe(2);
   });

   it('on reset copy default data to form data', function () {
       model.defData = {
           chartID: 0,
           wizard: false,
           selVal: ""
       };

       model.reset();

       expect(model.form.chartID).toBe(0);

   });

   it('on setWizardVals should set wizard values', function () {

       var path = "/admin/coa/wiz/categories";
       model.setWizardVals(path);

       expect(model.form.wizard).toBe(true);
   });

   it('on setBreadCrumbs should set current step value in breadcrumb', function () {

       var resp = {
           records: [{
               name: "Current Chart Name"
           }]
       };
       model.setBreadCrumbs(resp);

       expect(breadcrumbs._called.updateCurrent).toBe(true);
   });

   it('on getPostCalled should get the postCalled value', function () {
       var bln = model.getPostCalled();
       expect(bln).toBe(false);
   });

   it('on setPostCalled should set the postCalled value', function () {
       model.setPostCalled(true);
       expect(model.postCalled).toBe(true);
   });

   it('on selectCsvForm should get the selected csv form or not', function () {
       var bln = model.selectCsvForm();
       expect(bln).toBe(false);
   });

   it('on getSelectedProperty should get the selected property form or not', function () {
       var bln = model.getSelectedProperty();
       expect(bln).toBe(0);
   });

   it('on isValidSelectedProperty should check for valid selection', function () {
       var bln = model.isValidSelectedProperty();
       expect(bln).toBe(true);

       model.form.selectedPropertyID = 1;
       var bln2 = model.isValidSelectedProperty();
       expect(bln2).toBe(false);
   });

   it('on getUploadedFile should get the uploaded file', function () {
       var bln = model.getUploadedFile();
       //expect(bln).toBe({});
   });
});

