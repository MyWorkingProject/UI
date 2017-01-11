describe("Budget report model, unti test cases", function() {
    var model, $filter,$location;
    var appTranslate;
    beforeEach(module("budgeting.budgetmodel.reports"));


    beforeEach(function() {
       
        var appTranslate = RealPage.spy();
        appTranslate._createMethods(['translate']);

        var spy1 = function(name) {
            appTranslate.name = name;
            return appTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['path']);


        module(function($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('$location', spy2);
        });

    });

beforeEach(function() {
    function injector(a, b, c,d) {
        appTranslate = a;
        $filter = b;
        model = c;
        $location=d;
    }

    inject([
        'appLangTranslate','$filter',
         'BdgtReportsListModel','$location', injector
        ]);
});


it("shodul return true when data has url", function() {
    var data={url:"#"};
    var outPut = model.isLink(data);
    expect(outPut).toBe(true);
});

it("should return false when data has no url", function() {
    var data={};
    var outPut = model.isLink(data);
    expect(outPut).toBe(false);
});

it("should return model reports rows", function() {
    var data={id:1};
    model.listData=data;
    var outPut = model.getReports();
    expect(outPut).toEqual(data);
});

it("should clear the report name and report rows should be reset", function() {
    model.originalData={id:1};
    model.listData={};
    model.reportName="Report";
    model.reset();
    expect(model.originalData).toEqual(model.listData);
    expect(model.reportName).toEqual("");
});

it("navigating to model package when retport type is package", function() {
    model.navigateReport("Package");
    expect($location._called.path).toBe(true);
    expect($location._callData.path[0]).toEqual("/#");
});

it("navigating to model Narrative when retport type is Narrative", function() {
    model.navigateReport("Narrative");
    expect($location._called.path).toBe(true);
    expect($location._callData.path[0]).toEqual("/#");
});

it("navigating to model reportGrps when retport type is reportGrps", function() {
    model.navigateReport("reportGrps");
    expect($location._called.path).toBe(true);
    expect($location._callData.path[0]).toEqual("/#");
});

it("navigating to model portfolio when retport type is portfolio", function() {
    model.navigateReport("portfolio");
    expect($location._called.path).toBe(true);
    expect($location._callData.path[0]).toEqual("/#");
});

it("navigating to model multiYear when retport type is multiYear", function() {
    model.navigateReport("multiYear");
    expect($location._called.path).toBe(true);
    expect($location._callData.path[0]).toEqual("/#");
});

it("navigating nothing when retport type is InValid", function() {
    model.navigateReport("InValid");
    expect($location._called.path).toBe(undefined);
});

it("calling search when report name is empty", function() {
    model.reportName="";
    model.search();
});

it("calling search when report name is not empty", function() {
    model.reportName="Report";
    model.search();
});

it("calling filter Records when report name is found in the list", function() {
    model.originalData=[{
                "name": "Custom Reports",
                "status": "Active",
                "subItems": [
                    {
                        "name": "Custom Trend Reports",
                        "summary": "View customized trend report",
                        "url": "#"
                    },
                    {
                       "name": "Custom Budget Planning Reports",
                        "summary": "View customized planning report",
                        "url": "#"
                    },
                    {
                        "name": "Custom Budget Detail Reports",
                        "summary": "View customized Detail report",
                        "url": "#"
                    }
                ]
            }];
    model.filterRecords("trend");
    expect(model.listData.length).toEqual(1);
    expect(model.listData[0].subItems[0]).toEqual(model.originalData[0].subItems[0]);
});

it("calling filter Records when report name is not found in the list", function() {
    model.originalData=[{
                "name": "Custom Reports",
                "status": "Active",
                "subItems": [
                    {
                        "name": "Custom Trend Reports",
                        "summary": "View customized trend report",
                        "url": "#"
                    },
                    {
                       "name": "Custom Budget Planning Reports",
                        "summary": "View customized planning report",
                        "url": "#"
                    },
                    {
                        "name": "Custom Budget Detail Reports",
                        "summary": "View customized Detail report",
                        "url": "#"
                    }
                ]
            }];
    model.filterRecords("test");
    expect(model.listData.length).toEqual(0);
});

it("calling addData when main itme is already added", function() {
    var srchRecords=[{name:"Test","subItems":[]}];
    var item={name:"Test"};
    var reportItem ={name:"Test",summary:"Test",url:"Test"};

    model.originalData=[{
                "name": "Custom Reports",
                "status": "Active",
                "subItems": [
                    {
                        "name": "Custom Trend Reports",
                        "summary": "View customized trend report",
                        "url": "#"
                    },
                    {
                       "name": "Custom Budget Planning Reports",
                        "summary": "View customized planning report",
                        "url": "#"
                    },
                    {
                        "name": "Custom Budget Detail Reports",
                        "summary": "View customized Detail report",
                        "url": "#"
                    }
                ]
            }];
    model.addData(srchRecords,item,reportItem);
    expect(srchRecords[0].subItems[0]).toEqual(reportItem);
});

it("calling addData when main itme is not added", function() {
    var srchRecords=[{name:"No","subItems":[]}];
    var item={name:"Test"};
    var reportItem ={name:"Test",summary:"Test",url:"Test"};

    model.originalData=[{
                "name": "Custom Reports",
                "status": "Active",
                "subItems": [
                    {
                        "name": "Custom Trend Reports",
                        "summary": "View customized trend report",
                        "url": "#"
                    },
                    {
                       "name": "Custom Budget Planning Reports",
                        "summary": "View customized planning report",
                        "url": "#"
                    },
                    {
                        "name": "Custom Budget Detail Reports",
                        "summary": "View customized Detail report",
                        "url": "#"
                    }
                ]
            }];
    model.addData(srchRecords,item,reportItem);
    expect(srchRecords[1].subItems[0]).toEqual(reportItem);
});

it("calling get sub item method", function() {
    var reportItem ={name:"Test",summary:"Test",url:"Test"};
    var outPut = model.getSubItem(reportItem);
    expect(outPut.name).toEqual(reportItem.name);
    expect(outPut.summary).toEqual(reportItem.summary);
    expect(outPut.url).toEqual(reportItem.url);
});

it("calling show all method when report name is empty", function() {
    model.reportName="";
    model.originalData={id:1};
    model.listData={};
    model.showAll();
    expect(model.originalData).toEqual(model.listData);
});

it("calling show all method when report name is not empty", function() {
    model.reportName="Test";
    model.originalData={id:1};
    model.listData={};
    model.showAll();
    expect(model.originalData).not.toEqual(model.listData);
});



});