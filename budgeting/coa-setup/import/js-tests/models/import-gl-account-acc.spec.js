// Tests for Import GL Account Accounting Model

describe('Import GL Accounting/CSV/Yardi Model', function () {
    var translator, impGlSvc, model, filterObj;

    beforeEach(module('budgeting.coaSetup.import'));

    beforeEach(function () {

        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appTranslate.name = name;
            return appTranslate;
        };

        var svcMethods = [
            'getProps',
            'getGlAccs',
            'getAccTypes',
            'getStagingData',
            'abort',
            'get',
            'saveGls',
            'delGls',
            'getCsvTemp',
            'loadCSV',
            'getYardiProp',
            'getYardiGls',
            'updateAccType',
            'then'
        ];

        impGlSvc = RealPage.spy();
        impGlSvc._createMethods(svcMethods);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('importGlService', impGlSvc);
        });

    });

    beforeEach(inject(function (appLangTranslate, $filter, importGlService, importGlAccModel) {
        translator = appLangTranslate;
        filterObj = $filter;
        impGlSvc = importGlService;
        model = importGlAccModel;
    }));


    it('on getUploadedFile get the csv file uploaded', function () {
        model.form.files[0] = true;
        var bln = model.getUploadedFile();
        expect(bln).toBe(true);
    });

    it('on getProperties get the properties of accounting', function () {
        model.getProperties();
        expect(impGlSvc._called.getProps).toBe(true);
    });

    it('on loadPropOptions load property options in dropdown', function () {
        var resp = {
            records:
                [{
                    'propertyID': 1,
                    'propertyName': 'Meadow Bay'
                }
                ]
        };
        model.loadPropOptions(resp);
        expect(model.form.propertyData.options[1].propertyName).toBe('Meadow Bay');
    });

    it('on getGlAccs get gls of selected property', function () {
        model.form.selectedPropertyID = 1;
        model.getGlAccs(1);

        expect(impGlSvc._called.getGlAccs).toBe(true);
    });

    it('on getFiltOptions to get account type filter options', function () {
        model.getFiltOptions();

        expect(impGlSvc._called.getAccTypes).toBe(true);
    });

    it('on updateFilters to fill the filter options model', function () {
        var data = {
            records: [{
                'name': 'Asset',
                'value': 'Asset'
            }
            ]
        };
        var obj = model.updateFilters(data);
        expect(obj[1].name).toBe('Asset');

        var obj2 = model.updateFilters(data);
        expect(obj[0].name).toBe('All');
    });

    it('on updateAssgnTypes to fill the assign type options for yardi gls', function () {
        var data = [{
            'name': 'Asset',
            'value': 'Asset'
        }
        ];
        model.updateAssgnTypes(data);
        expect(model.form.srcAssgnType.options[1].name).toBe('Asset');

        model.updateAssgnTypes(data);
        expect(model.form.srcAssgnType.options[0].name).toBe('-- Select Assign Type --');
    });

    it('on updateUnassignedType to set unassigned filter for account type of yardi', function () {
        var data = {
            records: [{
                'name': 'Asset',
                'value': 'Asset'
            }
            ]
        };

        var rtrn = model.updateUnassignedType(data);
        expect(rtrn.records[0].name).toBe('Asset');
    });

    it('on getStagingData to get staging data gls', function () {
        model.getStagingData(1, {});

        expect(impGlSvc._called.getStagingData).toBe(true);
        expect(impGlSvc._called.abort).toBe(true);
        expect(impGlSvc._called.get).toBe(true);
    });

    it('on saveGlAccs to save gls', function () {
        model.saveGlAccs(1, {});

        expect(impGlSvc._called.saveGls).toBe(true);
    });

    it('on delGlAccs  to save gls', function () {
        model.delGlAccs({});

        expect(impGlSvc._called.delGls).toBe(true);
    });

    it('on getCsvTemplate  to get csv template', function () {
        model.getCsvTemplate();

        expect(impGlSvc._called.getCsvTemp).toBe(true);
    });

    it('on loadCSVFile to upload csv file to import gls', function () {
        var fileData = {
            name: 'importglaccount.csv',
            records: [{
                'name': 'Asset',
                'value': 'Asset'
            }
            ]
        };

        model.loadCSVFile(1, fileData);
        expect(impGlSvc._called.loadCSV).toBe(true);
    });

    it('on getYardiProp to get yardi properties', function () {
        model.getYardiProp();

        expect(impGlSvc._called.getYardiProp).toBe(true);
    });

    it('on loadYardiProp to get yardi property', function () {
        model.getYardiProp = function () {
            return true;
        };
        var bln = model.loadYardiProp();

        expect(bln).toBe(true);
    });

    it('on updateYardiProp to get charts of yardi and to fill dropdown', function () {
        var data = {
            records: [{
                'propertyName': 'Avista',
                'propertyID': 1,
                "entityID": "av"
            }
            ]
        };

        model.updateYardiProp(data);
        expect(model.form.selCharts.options[1].propertyName).toBe('Avista');

        model.updateYardiProp(data);
        expect(model.form.selCharts.options[0].propertyName).toBe('-- Select Property --');
    });

    it('on getYardiAccs to get yardi gl accounts', function () {
        var data = {
            records: [{
                'propertyName': 'Avista',
                'propertyID': 1,
                "entityID": "av"
            }
            ]
        };

        model.updateYardiProp(data);
        expect(model.form.selCharts.options[1].propertyName).toBe('Avista');

        model.form.selctedChartId = 1;
        model.getYardiAccs(1);

        expect(impGlSvc._called.getYardiGls).toBe(true);
    });

    it('on updateAccType to update account type', function () {
        model.updateAccType();

        expect(impGlSvc._called.updateAccType).toBe(true);
    });

    it('on updateToolTipState to toggle tool tip state', function () {
        model.updateToolTipState();

        expect(model.form.tooltipState).toBe(true);
    });


    it('on hideToolTipState to hide tool tip state', function () {
        model.hideToolTipState();

        expect(model.form.tooltipState).toBe(false);
    });

    it('on getPropertyID to get selected property id', function () {
        model.form.selectedPropertyID = 1;
        var val = model.getPropertyID();

        expect(val).toBe(1);
    });

    it('on getModelFilterOptions to get filter options', function () {
        var val = model.getModelFilterOptions();

        expect(val[0].name).toBe('All');
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

    it('on showLoadBtn to show load button', function () {
        model.showLoadBtn();

        expect(model.form.showLoadBtn).toBe(true);
    });

    it('on hideLoadBtn to hide load button', function () {
        model.hideLoadBtn();

        expect(model.form.showLoadBtn).toBe(false);
    });

    it('on getYardiSelectedChartId  to get selected yardi chart/property id', function () {
        model.form.selctedChartId = 1;
        var val = model.getYardiSelectedChartId();

        expect(val).toBe(1);
    });

    it('on toggleAssignWorkFlow to toggle assign workflow state', function () {
        model.toggleAssignWorkFlow();

        expect(model.form.toggleAsgnType.state.open).toBe(true);
    });

    it('on getSelAssgnType to get assign type', function () {
        model.form.selAssgnType = 'Asset';
        var val = model.getSelAssgnType();

        expect(val).toBe('Asset');
    });


    it('on selAssgnTypeIsEmpty check if assign type is empty or not', function () {
        model.form.selAssgnType = '';
        var bln = model.selAssgnTypeIsEmpty();

        expect(bln).toBe(true);

        model.form.selAssgnType = 'Asset';

        var bln2 = model.selAssgnTypeIsEmpty();
        expect(bln2).toBe(false);
    });

    it('on isPropertyID check if selected property is empty or not', function () {
        model.form.selectedPropertyID = 0;
        var bln = model.isPropertyID(0);

        expect(bln).toBe(true);

        model.form.selectedPropertyID = 1;

        var bln2 = model.isPropertyID(0);
        expect(bln2).toBe(false);
    });

    it('on isSelectedChartID check if selected chart is empty or not', function () {
        model.form.selctedChartId = 0;
        var bln = model.isSelectedChartID(0);

        expect(bln).toBe(true);

        model.form.selctedChartId = 1;

        var bln2 = model.isSelectedChartID(0);
        expect(bln2).toBe(false);
    });

    it('on getSelGlsToAssgnTypeObj to get object of selected gls', function () {
        var data = [{
            "glAccountID": 1
        }, {
            "glAccountID": 2
        }, {
            "glAccountID": 3
        }];
        model.form.selAssgnType = 'Asset';
        var val = model.getSelGlsToAssgnTypeObj(data);

        expect(val.glAccountIDs).toBe('3,2,1');

        model.form.selAssgnType = '';
        var val2 = model.getSelGlsToAssgnTypeObj(data);

        expect(val2.glAccountIDs).toBe('');
    });

    it('on selAcssIsNotEmpty check if selected accounts is empty or not', function () {
        var data = {
            "glAccountIDs": "3,2,1"
        };
        var bln = model.selAcssIsNotEmpty(data);

        expect(bln).toBe(true);

        var bln2 = model.selAcssIsNotEmpty({ "glAccountIDs": "" });
        expect(bln2).toBe(false);
    });

    it('on isHelpIconInfo  return current tooltip state', function () {
        var val = model.isHelpIconInfo();

        expect(val).toBe(false);
    });

    it('on setHelpIconInfo to set state of tooltip', function () {
        model.setHelpIconInfo(true);

        expect(model.form.tooltipState).toBe(true);
    });
});

