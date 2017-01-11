

describe('Manage GL Accounts Actions Module', function () {
    var model, appLangTranslate, manageGLAccountsSvc, manageGlAccountModel, manageGlErrorHandling, createUpdateGlModel,
       manageGlGridFactory, manageglNotifications, manageGlEditSaveGl, $q, promise, $rootScope, dialog;


    beforeEach(module('budgeting.coaSetup.manageGlAccount'));

    beforeEach(function () {

        var mocks = {
            'realpage.common.dialog': ['rpDialogModel']
        };

        RealPage.ngMocks.install(mocks);

        var appLangTranslate = RealPage.spy();
        appLangTranslate._createMethods(['translate']);

        var spy1 = function (name) {
            appLangTranslate.name = name;
            return appLangTranslate;
        };

        var spy2 = RealPage.spy();
        spy2._createMethods(['updateGLAccountActions', 'moveGlToMasterChart', 'deleteGLAccount']);



        var spy4 = RealPage.spy();
        spy4._createMethods(['isPropertyChart', 'getPropertyId']);

        var spy5 = RealPage.spy();
        spy5._createMethods(['showDeleteGlException', 'actionsException']);

        var spy6 = RealPage.spy();
        spy6._createMethods(['restAccountCategory', 'getAccountCategory', 'resetAccountCatForm']);

        var spy7 = RealPage.spy();
        spy7._createMethods(['getSelectedGls', 'load']);


        var spy8 = RealPage.spy();
        spy8._createMethods(['showErrorNotification', 'load']);

        var spy9 = RealPage.spy();
        spy9._createMethods(['loadAccountCategory']);



        module(function ($provide) {
            $provide.value('appLangTranslate', spy1);
            $provide.value('manageGLAccountsSvc', spy2);

            $provide.value('manageGlAccountModel', spy4);
            $provide.value('manageGlErrorHandling', spy5);
            $provide.value('createUpdateGlModel', spy6);
            $provide.value('manageGlGridFactory', spy7);
            $provide.value('manageglNotifications', spy8);
            $provide.value('manageGlEditSaveGl', spy9);
        });


        function injector(a, b, c, e, f, g, h, i, j, k, l, m) {
            appLangTranslate = a;
            manageGLAccountsSvc = b;
            dialog = c();

            manageGlAccountModel = e;
            manageGlErrorHandling = f;
            createUpdateGlModel = g;
            manageGlGridFactory = h;
            manageglNotifications = i;
            manageGlEditSaveGl = j;
            model = k;
            $q = l;
            $rootScope = m;
        }

        inject(['appLangTranslate',
            'manageGLAccountsSvc',
            'rpDialogModel',

            'manageGlAccountModel',
            'manageGlErrorHandling',
            'createUpdateGlModel',
            'manageGlGridFactory',
            'manageglNotifications',
            'manageGlEditSaveGl',
            'manageGlAccountActionsModel', '$q', '$rootScope',

            injector]);
    });


    it('showHideAccountCategoryForm method shows and hides category form', function () {
        model.toggleAccountCategory =
            {
                state: {
                    open: true
                },
                isAcToggleOn: true
            };
        model.showHideAccountCategoryForm();
        expect(createUpdateGlModel._called.resetAccountCatForm).toBe(true);
    });

    it('flagShowHideAccountCategoryForm method calls for setting account category form', function () {
        model.toggleAccountCategory =
            {
                state: {
                    open: true
                },
                isAcToggleOn: true
            };
        model.flagShowHideAccountCategoryForm();
    });

    it('showHideMenuList method calls for showing and hiding of menu list', function () {
        model.state =
            {
                menuIsOn: {
                    status: true
                }
            };
        model.showHideMenuList('true');
    });

    it('deactivateForm method called ', function () {
        model.toggleAccountCategory =
           {
               state: {
                   open: true
               },
               isAcToggleOn: true
           };
        model.deactivateForm();
    });


    it('isMenuOn method called ', function () {
        model.state =
           {
               menuIsOn: {
                   status: true
               }
           };
        model.isMenuOn();
    });

    it('isActionMenu method called ', function () {
        model.state =
           {
               actionMenuAlert: true
           };
        model.isActionMenu();
    });

    it('showHideactionMenuAlert method called ', function () {
        model.state =
           {
               actionMenuAlert: true
           };
        model.showHideactionMenuAlert('true');
    });


    it('showHideactionMenuAlert method called ', function () {
        model.state =
           {
               actionMenuAlert: true
           };
        model.showHideactionMenuAlert('true');
    });

    it('showHideactionMenuAlertFlag method called ', function () {
        model.state =
           {
               actionMenuAlert: true
           };
        model.showHideactionMenuAlertFlag();
    });

    it('updateFlagCat method called ', function () {
        model.types =
           {
               flagAccountCategory: 'true'
           };
        model.updateFlagCat('true');
    });

    it('buildActionList method calls for building data to pass to service', function () {

        model.buildActionList('abc', '1');
        manageGlAccountModel._returnData.isPropertyChart = true;
        manageGlAccountModel._returnData.propertyId = 1;
        expect(manageGlGridFactory._called.getSelectedGls).toBe(true);

    });


    it('buildActionListToPost method calls for building data to pass to service', function () {
        var data = {
            glAccountID: 1,
            isSiteAccount: false
        };
        manageGlAccountModel._returnData.isPropertyChart = true;
        manageGlAccountModel._returnData.propertyId = 1;
        model.buildActionListToPost(data);
    });

    it('buildActionListToPost method calls for building data to pass to service', function () {
        var data = {
            glAccountID: 1,
            isSiteAccount: false
        };
        manageGlAccountModel._returnData.isPropertyChart = false;
        manageGlAccountModel._returnData.propertyId = 1;
        model.buildActionListToPost(data);
    });

    it('buidMoveToMasterchartList used to build data of master chart list', function () {

        var data = {
            masterChartID: 1,
            glAccountID: 1
        };
        model.buidMoveToMasterchartList(data);
    });

    it('showErrorDilog mothod calls notification model', function () {
        model.showErrorDilog('title', 'info');
        expect(manageglNotifications._called.showErrorNotification).toBe(true);

    });

    it('loadAssignCatExDialog mothod calls notification model', function () {
        model.loadAssignCatExDialog();
        expect(manageglNotifications._called.showErrorNotification).toBe(true);
    });

    it('delete mothod calls to delete gl accounts', function () {
        var data =
            {
                "glAccountID": 1
            };
        model.delete();
        expect(manageGlGridFactory._called.getSelectedGls).toBe(true);
    });

    it('subscribeEvent for delete called', function () {

        model.selRows = {
            "glAccountID": 1
        };
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.deleteGLAccount = {
            $promise: promise
        };

        var paramsData = {
            glAccountID: 1
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.subscribeEvent('continue');
        model.deleteGlAcc(paramsData);
        Defered.resolve(data);
        $rootScope.$apply();


    });


    it('subscribeEvent for delete called', function () {      
        model.subscribeEvent('cancel');

    });


    it('getAccountCategoryType called', function () {
        model.types = { isAccountCategory: true };
        model.getAccountCategoryType();

    });


    it('setAccountCategoryType called', function () {
        model.types = { isAccountCategory: true };
        model.setAccountCategoryType();

    });

    it('updateInitList called', function () {
        model.types = { initList: true };
        model.updateInitList();

    });

    it('updateInitListWatch called', function () {
        model.types = { initList: true };
        model.updateInitListWatch();

    });

    it('isInitListAccess called', function () {
        model.types = { initList: true };
        model.isInitListAccess();

    });

    it('assignAccountCategory called', function () {
        var data={           
            "records": [
              {
                  "glAccountID": 10972,
                  "masterChartID": 40,
                  "glAccountNumber": "53120",
                  "accountTypeID": 6
              
              },
              {
                  "glAccountID": 11012,
                  "masterChartID": 40,
                  "glAccountNumber": "57135",
                  "accountTypeID": 7
              }
            ]

        };
        var chekedRows = [
           
              {
                  "glAccountID": 10972,
                  "masterChartID": 40,
                  "glAccountNumber": "53120",
                  "accountTypeID": 6

              },
              {
                  "glAccountID": 11012,
                  "masterChartID": 40,
                  "glAccountNumber": "57135",
                  "accountTypeID": 7
              }
           

       ];
      
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.assignAccountCategory();
     
    });

    it('assignAccountCategory called for no row selection', function () {
     
        var chekedRows = [            
        ];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.assignAccountCategory();     
          expect(manageglNotifications._called.showErrorNotification).toBe(true);
    });

    it('assignAccountCategory called for isValidTypeSelected method for true', function () {      
        var chekedRows = [

              {
                  "glAccountID": 10972,
                  "masterChartID": 40,
                  "glAccountNumber": "53120",
                  "accountTypeID": 6

              },
              {
                  "glAccountID": 11012,
                  "masterChartID": 40,
                  "glAccountNumber": "57135",
                  "accountTypeID": 6
              }

        ];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.assignAccountCategory();
    });

    it('submitAssignCategory method calls on Submit account category of actions seletion', function () {
        var chekedRows = [

             {
                 "glAccountID": 10972,
                 "masterChartID": 40,
                 "glAccountNumber": "53120",
                 "accountTypeID": 6

             },
             {
                 "glAccountID": 11012,
                 "masterChartID": 40,
                 "glAccountNumber": "57135",
                 "accountTypeID": 6
             }

        ];
       
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
     
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };     
        model.submitAssignCategory();
        Defered.resolve(data);
        $rootScope.$apply();


    });

    it('submitAssignCategory validation method called', function () {
        var chekedRows = [

             {
                 "glAccountID": 10972,
                 "masterChartID": 40,
                 "glAccountNumber": "53120",
                 "accountTypeID": 6

             },
             {
                 "glAccountID": 11012,
                 "masterChartID": 40,
                 "glAccountNumber": "57135",
                 "accountTypeID": 7
             }

        ];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.submitAssignCategory();   
    });

    it('unmarkBudgetUse method called', function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.unmarkBudgetUse();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('markBudgetUse method called', function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.markBudgetUse();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('setDebitBalance method called', function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.setDebitBalance();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('setCreditBalance method called', function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.setCreditBalance();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('restrictPayrollAccess method called', function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.restrictPayrollAccess();
        Defered.resolve(data);
        $rootScope.$apply();

    });


    it('unRestrictPayrollAccess method called', function () {
        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.updateGLAccountActions = {
            $promise: promise
        };

        var paramsData = {
            "glAccountID": 1,
            "fieldName": "abc",
            "fieldValue": 1,
            "ActSiteID": 1,
            "IsPropertyTable": true
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.unRestrictPayrollAccess();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('moveToMasterChart method called', function () {
        var chekedRows = [

             {
                 "glAccountID": 10972,
                 "masterChartID": 40,
                 "glAccountNumber": "53120",
                 "accountTypeID": 6,
                 "isSiteAccount":true

             },
             {
                 "glAccountID": 11012,
                 "masterChartID": 40,
                 "glAccountNumber": "57135",
                 "accountTypeID": 7,
                 "isSiteAccount": true
             },
              {
                  "glAccountID": 11012,
                  "masterChartID": 40,
                  "glAccountNumber": "57135",
                  "accountTypeID": 7,
                  "isSiteAccount": false
              }

        ];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.moveGlToMasterChart = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "glAccountID": 1
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.moveToMasterChart();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('moveToMasterChart method called and checking condition if masterchart is already exist', function () {
        var chekedRows = [

             {
                 "glAccountID": 10972,
                 "masterChartID": 40,
                 "glAccountNumber": "53120",
                 "accountTypeID": 6,
                 "isSiteAccount": true

             },
             {
                 "glAccountID": 11012,
                 "masterChartID": 40,
                 "glAccountNumber": "57135",
                 "accountTypeID": 7,
                 "isSiteAccount": true
             }

        ];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;

        var Defered = $q.defer();
        promise = Defered.promise;

        manageGLAccountsSvc._returnData.moveGlToMasterChart = {
            $promise: promise
        };

        var paramsData = {
            "masterChartID": 1,
            "glAccountID": 1
        };
        var data = { records: { messageText: "Success" }, status: 200 };
        model.moveToMasterChart();
        Defered.resolve(data);
        $rootScope.$apply();

    });

    it('moveToMasterChart method called and checking condition if masterchart is already exist', function () {
        var chekedRows = [];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.moveToMasterChart();
        expect(manageGlGridFactory._called.load).toBe(true);
    });

    it('validateActionMenu validates if any row of grid selected', function () {
        var chekedRows = [

           {
               "glAccountID": 10972,
               "masterChartID": 40,
               "glAccountNumber": "53120",
               "accountTypeID": 6,
               "isSiteAccount": true

           },
           {
               "glAccountID": 11012,
               "masterChartID": 40,
               "glAccountNumber": "57135",
               "accountTypeID": 7,
               "isSiteAccount": true
           }

        ];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.validateActionMenu();
    });

    it('validateActionMenu validates if any row of grid selected', function () {
        var chekedRows = [];
        manageGlGridFactory._returnData.getSelectedGls = chekedRows;
        model.validateActionMenu();
    });

    it('validateActionMenu validates if any row of grid selected', function () {
        model.reset();
    });


});

