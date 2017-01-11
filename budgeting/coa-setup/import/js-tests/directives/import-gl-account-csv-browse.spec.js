//  CSV Browse Directive Test

describe('CSV Browse Directive', function () {
    var rootScope, scope, compile, body, elem, $controller;

    body = angular.element('body');

    function getElem() {
        var html = "<csv-browse file-data='fileInput'></csv-browse>",
            elem = angular.element(html);

        body.append(elem);

        elem = compile(elem)(scope);
        scope.$digest();

        return elem;
    }

    beforeEach(function () {

        var mocks = {
            'budgeting.coaSetup.import': ['BdgtImprtGlCsv'],
        };

        RealPage.ngMocks.install(mocks);
    });

    beforeEach(function () {
        module('budgeting.coaSetup.import');

        function injector(a, b, c) {
            rootScope = a;
            $controller = b;
            scope = rootScope.$new();
            compile = c;
            scope.fileInput = "";
        }

        inject(['$rootScope', '$controller', '$compile', injector]);
    });

    afterEach(function () {
        elem.remove();
    });

    it('Should have reference to directive on scope', function () {
        elem = getElem();
        scope.dir.init();
        expect(scope.dir).not.toBe(undefined);
    });

    it('Should assign references for file upload element', function () {
        var called = false;

        elem = getElem();

        scope.dir.change = function () {
            called = true;
        };

        scope.dir.change();

        //timeout.flush();

        expect(called).toBe(true);
    });
});

