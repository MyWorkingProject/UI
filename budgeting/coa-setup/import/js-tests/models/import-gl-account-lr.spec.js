// Tests for Import GL Account L&R Model

describe('Import GL L&R Model', function () {
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
            'getLrCharts',
            'getLrProps',
            'saveLrGls',
            'abort',
            'get',
            'getImpStatus',
            'then'
        ];

        impGlSvc = RealPage.spy();
        impGlSvc._createMethods(svcMethods);

        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('importGlService', impGlSvc);
        });

    });

    beforeEach(inject(function (appLangTranslate, $filter, importGlService, importGlLrModel) {
        translator = appLangTranslate;
        filterObj = $filter;
        impGlSvc = importGlService;
        model = importGlLrModel;
    }));

    it('on getCharts get charts of L&R center', function () {
        model.getCharts();

        expect(impGlSvc._called.getLrCharts).toBe(true);
    });

    it('on loadCharts call service to get charts of L&R center', function () {
        model.getCharts = function () {
            return true;
        };
        var bln = model.loadCharts();
        expect(bln).toBe(true);
    });

    it('on setChartOptions to append charts in the dropdown options', function () {
        var data = {
            records: [{
                "masterChartName": "Standard OneSite"
            }]
        };
        model.setChartOptions(data);

        expect(model.form.propertyData.options[1].masterChartName).toBe("Standard OneSite");
    });

    it('on getProperties to get properties of selected chart', function () {
        model.form.selectedPropertyID = 1;
        model.getProperties();

        expect(impGlSvc._called.getLrProps).toBe(true);
        expect(impGlSvc._called.abort).toBe(true);
        expect(impGlSvc._called.get).toBe(true);
    });

    it('on saveGlAccs to save gls of selected properties', function () {
        var data = [
              {
                  "propertyID": 1,
                  "parentSiteID": 1,
                  "type": "",
                  "message": "",
                  "importDate": "",
                  "asOfDate": "",
                  "status": "",
                  "count": 0,
                  "year": 0,
                  "propertyID_CSV": "",
                  "type_CSV": ""
              }
        ];
        model.saveGlAccs(1, data);

        expect(impGlSvc._called.saveLrGls).toBe(true);
    });

    it('on getStatus to get status of importing of Gls', function () {
        var data = '1,2,3';
        model.getStatus(data);

        expect(impGlSvc._called.getImpStatus).toBe(true);
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

    it('on showLoadBtn to change load button state to true', function () {
        model.showLoadBtn();

        expect(model.form.showLoadBtn).toBe(true);

    });

    it('on hideLoadBtn to change load button state to false', function () {
        model.hideLoadBtn();

        expect(model.form.showLoadBtn).toBe(false);

    });

    it('on selectedPropertyIDForm to get selected propertyID', function () {
        model.form.selectedPropertyID = 1;
        var val = model.selectedPropertyIDForm();

        expect(val).toBe(1);

    });

    it('on updateRefreshRecordsMessage update message and import date coloumn values to display in the grid', function () {
        var respdata = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "Import Queued",
                      "importDate": null
                  }
            ]
        };

        var data = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "Import Queued",
                      "importDate": null
                  }, {
                      "propertyID": 2,
                      "message": "Import successful",
                      "importDate": '03/21/2016'
                  }
            ]
        };
        var val = model.updateRefreshRecordsMessage(respdata, data);

        expect(val.records[0].importDate).toBe('');
    });

    it('on updateMessageCol update message and import date coloumn values', function () {
        var respdata = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "Import Queued",
                      "importDate": null
                  }
            ]
        };

        var data = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "",
                      "importDate": null
                  }, {
                      "propertyID": 2,
                      "message": "Import successful",
                      "importDate": '03/21/2016'
                  }
            ]
        };
        model.updateMessageCol(respdata.records[0], data.records[0]);

        expect(data.records[0].importDate).toBe('');
        expect(data.records[0].message).toBe('Import Queued');

        respdata = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "Import not attempted",
                      "importDate": '03/21/2016'
                  }
            ]
        };

        model.updateMessageCol(respdata.records[0], data.records[0]);

        expect(data.records[0].importDate).toBe('03/21/2016');
        expect(data.records[0].message).toBe('');

        respdata = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "Import",
                      "importDate": '03/21/2016'
                  }
            ]
        };

        model.updateMessageCol(respdata.records[0], data.records[0]);

        expect(data.records[0].importDate).toBe('03/21/2016');
        expect(data.records[0].message).toBe('Import Failed');
    });

    it('on updateRecordsMessage update coloumn value keys in the model', function () {
        var respdata = {
            records: [
                  {
                      "propertyID": 1,
                      "message": "Import",
                      "importDate": '03/21/2016'
                  }
            ]
        };

        var val = model.updateRecordsMessage(respdata);

        expect(val.records[0].importDate).toBe('03/21/2016');
        expect(val.records[0].message).toBe('Import Failed');
    });

    it('on getSelPropsToSave to get selected properties object', function () {
        var respdata = {
            records: [
                  {
                      "propertyID": 1,
                      "parentSiteID": 1,
                      "message": "Import",
                      "importDate": '03/21/2016',
                      "selectedBit": true
                  }, {
                      "propertyID": 2,
                      "parentSiteID": 1,
                      "message": "",
                      "importDate": null,
                      "selectedBit": false
                  }
            ]
        };

        var val = model.getSelPropsToSave(respdata);

        expect(val[0].propertyID).toBe(1);
        expect(val[1]).toBe(undefined);
    });

    it('on getRefreshSelProp to get selected properties object', function () {
        var records = [
              {
                  "propertyID": 1,
                  "parentSiteID": 1,
                  "message": "Import",
                  "importDate": '03/21/2016',
                  "selectedBit": true
              }, {
                  "propertyID": 2,
                  "parentSiteID": 1,
                  "message": "",
                  "importDate": null,
                  "selectedBit": true
              }
        ];

        var val = model.getRefreshSelProp(records);

        expect(val).toBe('1,2');
    });

    it('on getSelectedPropertyIDForm to check selectedpropertyid', function () {
        model.form.selectedPropertyID = "-- Select Chart --";
        var val = model.getSelectedPropertyIDForm();

        expect(val).toBe(true);

        model.form.selectedPropertyID = "Standard OneSite";
        var val2 = model.getSelectedPropertyIDForm();

        expect(val2).toBe(false);
    });

    it('on updateToolTipState to toggle tooltip state', function () {
        model.updateToolTipState();

        expect(model.form.tooltipState).toBe(true);

    });

    it('on hideToolTipState to hide tool tip state', function () {
        model.hideToolTipState();

        expect(model.form.tooltipState).toBe(false);
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

