// Tests for Budgeting Administration Home Screen Controller

describe('Administration Home Controller', function () {
    var $controller, getCtrl, ctrl, model, locationObj;

    beforeEach(module('budgeting.admin.base'));

    beforeEach(function () {

        model = RealPage.spy();

        model.text = {
            'adminNav': 'Core Setup'
        };

        locationObj = RealPage.spy();
        locationObj._createMethods(['path']);

        module(function ($provide) {
            $provide.value('adminModel', model);
            $provide.value('$location', locationObj);
        });

        function injector(a) {
            $controller = a;
        }

        inject(['$controller', injector]);

        getCtrl = function () {
            return $controller('BdgtAdminCtrl', {});
        };

        ctrl = getCtrl();
    });

    it('on init should create references', function () {
        expect(ctrl.bdgtadminnav).toBe(model.text.adminNav);
    });

    it('on navigateToPage should change current location path', function () {
        ctrl.navigateToPage('/admin');
        expect(locationObj._called.path).toBe(true);
    });
});
