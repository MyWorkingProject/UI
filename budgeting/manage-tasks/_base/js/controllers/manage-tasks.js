(function (angular) {
    var fn = angular.noop;

    function ManageTasksCtrl($scope, model, tabsModel, dataModel, $stateParams,/* newEditModel, */ $location, formConfig) {
        var vm = this, watch1;
        var taskType = $stateParams.type;

        vm.init = function () {
            vm.model = model;
            vm.dataModel = dataModel;
            $scope.state = model.getState();
            vm.tabsModel = tabsModel;
            model.setOptions();
            vm.formConfig=formConfig;
            logc(vm.formConfig.status);
            watch1 = $scope.$on('$destroy', vm.destroy);
           // vm.watchForm();
            model.getTaskData(taskType);
        };

       
        vm.destroy = function () {
            watch1();
            model.reset();
            dataModel.reset();
            //tabsModel.resetTab();
        };

        vm.getUsers =function(query){
            dataModel.getUsers(query,taskType);
        };

        vm.getProperties =function(query){
            dataModel.getProperties(query,taskType);
        };

        vm.getModels =function(query){
            dataModel.getModels(query,taskType);
        };

      /*  vm.watchForm = function () {
            vm.formWatch = $scope.$watch('newTaskForm', vm.setForm);
        };

        vm.setForm = function (form) {
            vm.formWatch();
            vm.form = formManager().setForm(form);
            vm.form.setKeys(['title', 'description', 'startDate', 'dueDate']);
        }; */

        vm.submit = function (form) {
            var data, id;
          
             if (form.$invalid) {
                     form.$setSubmitted(); 
                }
                else{
                  if(model.isValidData() && model.isValidDates()){
                        dataModel.saveData(model.getFormDetails());
                        model.reset();
                        $location.path('/workspaces/budget-tasks');  
                    }               
                }
        };

        vm.isDataValid = function(){
            if(!model.isTitleValid()){
                $scope.newTaskForm["title"].$setTouched();
                $scope.newTaskForm["title"].$setValidity("required", true);
                return false;
            }   
            else if(!model.isStartValid()){
                $scope.newTaskForm["startDate"].$setTouched();
                $scope.newTaskForm["startDate"].$setValidity("required", true);
                return false;
            }
            else if(!model.isDueValid()){
                $scope.newTaskForm["dueDate"].$setTouched();
                $scope.newTaskForm["dueDate"].$setValidity("required", true);
                return false;
            }
            else{
                return true;
            }

        };

        vm.showFormErrors = function () {
            vm.form.setTouched();
        };

        vm.cancel = function () {           
            $location.path('/workspaces/budget-tasks');
            model.reset();

        };

        vm.userDelete = function(item){
            //logc(item);
            dataModel.addDeletedUsers(item);
        };

        vm.propertyDelete = function(item){
            //logc(item);
            dataModel.addDeletedProperties(item);
        };

        vm.modelDelete = function(item){
            //logc(item);
            dataModel.addDeletedModels(item);
        };

        vm.init();
    }

 
    angular
           .module('budgeting')
           .controller('ManageTasksCtrl', [
                       '$scope',
                       'manageTasksModel',
                       'manageTasksTabModel',
                       'manageTasksDataModel',
                       '$stateParams', 
                       /*'manageNewOrEditTask',*/
                       '$location',
                        'manage-task-config',                       
                       ManageTasksCtrl]);
})(angular);