//  Users List Model

(function (angular) {
    "use strict";

    function factory(langTranslate,csvSVC,eventStream) {
        var text, state, model;
        var translate;
        translate = langTranslate('contracts-csv').translate;
        model = {};
        model.translate = translate;
        model.emptyData = {
            file:undefined,
            showGird:false
        };
        model.toolTip={
                    toolTipText :translate('bdgt_contracts_helpToolText')
        };
        
        model.state = {
            toolTipAlert: false
        };

        model.form = {};
        model.ready = false;
        angular.copy(model.emptyData, model.form);
        
       model.reset = function () {
            angular.copy(model.emptyData, model.form);
            model.update();
       }; 
        
       model.getUploadedFile = function () {
            return model.form.file;
        }; 

        model.getCsvTemplate = function () {
            var params = {
                            importType: "GetContractsTemplate"
                        };
            return csvSVC.getCSVTemplate(params);
        };

        model.getResponseData = function(resp){
             var ret = "";
                //ret.push('"' + Object.keys(resp[0]).join('","') + '"');
                for (var i = 0; i < resp.length; i++) {
                    var line = [];
                    ret = ret + resp[i];
                   /* for (var key in resp[i]) {
                        if (resp[i].hasOwnProperty(key)) {
                            line.push('"' + resp[i][key] + '"');
                        }
                    }
                    ret.push(line.join(','));*/
                }
                return ret;
                //return ret.join('\n');
        };


       model.getContractCsvData = function(data){
            return csvSVC.getContractsList(data);
       }; 

       model.loadCSVFile = function (fileData) {
            var fd = new FormData();
            fd.append(fileData.name, fileData);
            return csvSVC.saveCSVData(fd).$promise;
        }; 

        model.isToolTipisMenuOn = function () {
            return model.state.toolTipAlert;
        };

        model.updateTipisMenuOn = function (flag) {
            model.state.toolTipAlert = flag;
        };

        
        model.buildDataToPost = function (chekedRows) {
            var PostData = [];
            angular.forEach(chekedRows, function (item) {               
                //var data = model.buildJsonDataToPost(item.vendorContractID);
                PostData.push(item);
            });
            return PostData;
        };


        model.deleteSelContracts = function(records){
           var data =  model.buildDataToPost(records);
           return csvSVC.deleteContract(data).$promise;
        };

        model.saveImportedContracts = function(){
            return csvSVC.saveImportedData().$promise;
        };

        model.deleteAllStagingData = function(){
            model.getDeleteAllStagingPromise().then(model.delSuccc);
        };

        model.delSuccc = function(){

        };

        model.showGirdData = function(){
            model.form.showGird = true;
        };

        model.hideGirdData = function(){
            model.form.showGird = false;
        };

        model.getDeleteAllStagingPromise = function(){
              return csvSVC.deleteAllVendorContracts().$promise;
        };

        model.events = {
            update: eventStream(),
            load: eventStream()
        };

        model.update = function () {
            model.ready = true;
            model.events.update.publish(model.form.file);
        };

        model.loadParentGrid = function () {
            model.events.load.publish();
        };

        model.subscribe = function (eventName, callback) {
            if (model.events[eventName]) {
                return model.events[eventName].subscribe(callback);
            }
            else {
                logc("contract CSV service: " + eventName + " is not a valid event name");
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('contractsCSVModel', [
                'appLangTranslate','contractCSVSVC','eventStream',
                factory
        ]);
})(angular);
