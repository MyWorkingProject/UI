//  SampleCg Model

(function (angular) {
    'use strict';

    function factory() {
        var model = {};
        model.emptyData = {
              columns: [], headers: [], totals: [], editable: []
        };

        model.form = {};

        angular.copy(model.emptyData, model.form);
        
        model.reset = function(){
            angular.copy(model.emptyData, model.form);
        };
        
        
        model.getColumns = function (payrollItems) {
            if (model.form.columns.length !== 0) {
                return model.form.columns;
            }

            var getKeyItemCol = function (items,val) {
                var item = {
                    width: 100,
                    key: items.itemColumnName,
                    label: items.payrollItemName,
                    state: {
                        active: true,
                        locked: false
                    },
                    isDataColumn: true,
                    classNames: "toggle-text text-right"
                };

                return item;
            };

           
            for( var i=0; i< payrollItems.records.length ; i++)  {
             model.form.columns.push(getKeyItemCol(payrollItems.records[i],i+1));
            }
            
            return model.form.columns;
        };

        model.getHeaders = function (payrollItems) {
            if (model.form.headers.length !== 0) {
                return model.form.headers;
            }
            var getKeyItemHeader = function (items,val) {
                var item = {
                    key: items.itemColumnName,
                    text: items.payrollItemName,
                    isSortable: true
                };

                return item;
            };


            for( var i=0; i< payrollItems.records.length ; i++)  {
                model.form.headers.push(getKeyItemHeader(payrollItems.records[i],i+1));
            }
            return model.form.headers;
        };


  

        return model;
    }

    angular
        .module('budgeting')
        .factory('glConfigSettings', [factory]);
})(angular);
