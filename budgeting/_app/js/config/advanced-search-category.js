//  Configure Advanced-search

(function (angular) {
    "use strict";

    function config(prov) {
        var metaData = {
            'Person': [
                {
                    name: 'Unit',
                    value: 'Unit',

                    },
                {
                    name: 'Name',
                    value: 'Name',

                    },
                {
                    name: 'Assignable Item',
                    value: 'AssignableItem',

                    },
                {
                    name: 'Check#',
                    value: 'Check',

                    },
                {
                    name: 'Email',
                    value: 'Email',

                    },
                {
                    name: 'Lease ID',
                    value: 'LeaseID',

                    },
                {
                    name: 'Phone',
                    value: 'Phone',

                    },
                {
                    name: 'Rentable Item',
                    value: 'RentableItem',

                    },
                {
                    name: 'Vehicle Tag',
                    value: 'VehicleTag',

                    }
               ]

        };
        prov.setData(metaData);
    }

    angular
        .module("budgeting")
        .config(['rpAdvancedSearchCategoryModelProvider', config]);
})(angular);
