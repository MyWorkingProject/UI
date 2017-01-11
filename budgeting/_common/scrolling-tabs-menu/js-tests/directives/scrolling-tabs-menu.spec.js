//  Tabs Menu Directive Test

describe('Tabs Menu Directive', function () {
    var rootScope, scope, tOut, tmElem,
        compile,  originalTimeout;

    function getElem() {
        var html = "<rp-tabs-menu></rp-tabs-menu>",
            elem = angular.element(html),
            body = angular.element('body');

        body.append(elem);
        elem = compile(elem)(scope);
        scope.$digest();
        return elem;
    }

    beforeEach(function () {
        module('rp.common.tabsMenu');
        module('rp.common.standalone');
        inject(function ($compile, $rootScope, timeout) {
            compile = $compile;
            rootScope = $rootScope;
            scope = $rootScope.$new();
            tOut = timeout;
        });

    });

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    });

    afterEach(function () {
        angular.element('body').children().remove();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('Tabs Menu Directive intialization ', function () {
        tmElem = getElem();
        expect(tmElem.length).toBe(1);
    });

});

