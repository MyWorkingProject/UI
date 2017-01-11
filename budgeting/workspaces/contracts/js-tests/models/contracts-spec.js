// Roles List Actions Model Tests

describe('contracts model', function () {
    var model, contractsSvc, session, $q, $rootScope, promise;

    beforeEach(module('budgeting.workspaces.contracts'));

    beforeEach(function () {

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['getContractsList', 'getExpiredContractsList']);

        var spy3 = RealPage.spy();
        spy3._createMethods([
            'get'
        ]);


        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('contractsSvc', spy2);
            $provide.value('session', spy3);
        });

        function injector(a, b, c, d, e, f, g, h) {
            contractsSvc = a;
            session = b;
            model = c;
            $q = d;
            $rootScope = e;
        }

        inject(['contractsSvc', 'session', 'contractsModel', '$q', '$rootScope', injector]);
    });


    it('get contracts data method called', function () {
        var data = {

        };

        var params = {
            propertyID: 1
        };

        session._returnData.get = { siteID: '1' };

        model.form.allcontracts = { isActive: true };
        model.getContractData(data);

    });

    it('get contracts data method called', function () {
        var data = {

        };

        var params = {
            propertyID: 1
        };

        session._returnData.get = { siteID: '1' };

        model.form.allcontracts = { isActive: false };
        model.getContractData(data);

    });

    it('getExpContractsFlag method', function () {
        model.form.expiringcontracts = {
            isActive: true,
            text: 'Contracts'

        };
        model.getExpContractsFlag();
    });

    it('getExpContractsFlag method', function () {
        model.form.allcontracts = {
            isActive: true,
            text: 'Contracts Notifications'
        
        };

        model.getAllContractsFlag();
    });

    it("reset() should reset all data back to default values", function () {
        var state = { subscribed: false };

        model.form.subscribed = state;
        expect(model.form.subscribed).toBe(state);

        model.reset();
        expect(model.form.subscribed).toEqual(false);
    });


});

