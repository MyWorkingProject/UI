// Job Position Details State Model

(function (angular) {
    "use strict";

    function factory(pageState, i18n) {
        var defaultState = {
            mode: pageState.VIEW,
            isReady: false,
            jobPositionDetailsForm: null,
            
            modalHeader: "",            
            errorMessage: null,

            form: {
                isEditable: false,
                isTitleEditable: false,
                isEmployeeCountEditable: false
            }
        };


        return function(jobPosition) {
            var model = angular.copy(defaultState);


            model.init = function() {
                if(jobPosition.state !== null && jobPosition.state !== undefined) {
                    model.mode = jobPosition.state;
                }
                model.updateForm();

                return model;
            };

            model.updateForm = function() {
                if(model.mode == pageState.NEW) {
                    model.modalHeader = i18n.translate("job_pos_new_header");             

                    model.form.isEditable = true;
                    model.form.isTitleEditable = true;
                    model.form.isEmployeeCountEditable = true;
                } else if(model.mode == pageState.EDIT) {
                    model.modalHeader = i18n.translate("job_pos_edit_header");

                    model.form.isEditable = true;                    
                    model.form.isTitleEditable = false;
                    model.form.isEmployeeCountEditable = true;
                } else {
                    model.modalHeader = i18n.translate("job_pos_view_header");

                    model.form.isEditable = false;                    
                    model.form.isTitleEditable = false;
                    model.form.isEmployeeCountEditable = false;
                }
            };

            model.setPageState = function(newPageState) {
                model.mode = newPageState;
                model.updateForm();
            };

            model.addErrorMsg = function(msg) {
                if(model.errorMessage === null) {
                    model.errorMessage = [];
                }

                model.errorMessage.push(msg);
            };

            model.ready = function() {
                model.isReady = true;
            };

            model.destroy = function() {
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("jobPosDetailsStateModel", [
            "pageState",
            "jobPosDetailsTranslatorSvc",
            factory
        ]);

})(angular);