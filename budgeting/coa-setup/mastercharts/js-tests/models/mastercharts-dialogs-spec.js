// Roles List Dialog Model Tests

describe('Masterchart List Dialog', function () {
    var model, dialog, masterchartListActions;

    beforeEach(module('budgeting.coaSetup.mastercharts'));

    beforeEach(function () {
        var mocks = {
            'rp.common.dialog': ['rpDialogModel']
        };

        RealPage.ngMocks.install(mocks);
    });

    beforeEach(function () {
        var spy1 = RealPage.spy();
        spy1._createMethods(['getDeleteButtonText', 'getDelDialogTitle', 'getDelDialogQues', 'getDelDialogInfo']);


        module(function ($provide) {
            $provide.value('masterchartListActions', spy1);
        });


        function injector(a, b,c) {
            model = a;
            dialog = b();
            masterchartListActions = c;
        }

        inject(['masterchartDialogs', 'rpDialogModel','masterchartListActions', injector]);
    });

    afterEach(function () {
        dialog._reset();
    });

    it('should have dialog key', function () {
        expect(model.dialog).not.toBe(undefined);
    });

    it('subscribe method calls subscribe method on dialog', function () {
        var cb = {};
        model.subscribe(cb);
        expect(dialog._called.subscribe).toBe(true);
        expect(dialog._callData.subscribe[0]).toBe(cb);
    });

    it('confirmDelete method calls update and show methods on dialog', function () {
        model.confirmDeleteMasterchart();
        expect(dialog._called.show).toBe(true);
        expect(dialog._called.update).toBe(true);
        expect(dialog._callData.update[0].type).toBe('warn');
    });
});

