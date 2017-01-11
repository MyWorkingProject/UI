//  SampleCg Model

(function (angular) {
    'use strict';

    function factory(marketModel) {
        var state, model;

        state = {
            edit: true
        };

        model = {
            state: state,
            gridReady: false
        };

        model.edit = function (bool) {
            bool = bool === undefined ? true : bool;
            model.state.edit = bool;
            //return model;
        };

        model.reset = function () {
            model.state.edit = false;
            model.gridReady = false;
        };
    
         model.setGridReady = function(val){
           model.gridReady = val;  
       };

       model.isGridReady = function(val){
          return model.gridReady; 
       };

       model.setEditMode = function(){
            model.state.edit = !marketModel.isModelFinal();
       };  

        return model;
    }

    angular
          .module('budgeting')
          .factory('MarketRentEditModel', ['MarketRentModel',factory]);
})(angular);

