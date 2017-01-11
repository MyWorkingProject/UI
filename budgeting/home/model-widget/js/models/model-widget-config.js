(function (angular) {
    "use strict";

    function factory(gridConfig, actions, langTranslate,modelWidget) {
        var model = gridConfig();
        var translate = langTranslate('modelWidget').translate;

        model.get = function () {
            return [
                    {
                        key: 'modelName',
                        type: 'custom',
                         templateUrl: 'app/templates/home.model-widget.property-model.html'
                    }, {
                        key: 'status',
                        type: 'custom',
                        templateUrl: 'app/templates/home.model-widget.status.html'
                    }, {
                        key: 'action',
                        type: 'actionsMenu',
                        getActions: actions.get
                    }                    
            ];
        };

        model.getFilters = function () {
            return [
               {
                   key: 'property',
                   type: 'text',
                   className: 'property',
                   placeholder:"Property Name"
               }, {
                   key: 'budgetYear',
                   type: 'menu',                                                       
                   options: modelWidget.getBudgetYearsFilters(),
                   value:modelWidget.getSelectedYear()
                  
                    


               }, {
                   key: 'modelType',
                   type: 'menu',
                   value:'',                  
                   options: [
                        {
                            value: '',
                            name: 'All Types'
                        },
                         {
                             value: 'budget',
                             name: 'Budget'
                         }, {
                             value: 'forecast',
                             name: 'Forecast'
                         }, {
                             value: 'proforma',
                             name: 'Proforma'
                         }
                   ]


               }
            ];
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('modelWidgetConfig', ['rpGridConfig', 'modelWidgetActions', 'appLangTranslate','modelWidget', factory]);
})(angular);
