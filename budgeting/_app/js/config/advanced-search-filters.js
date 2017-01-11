//  Configure Advanced-search

(function (angular) {
    "use strict";

    function config(prov) {
        var metaData = {
            'Person': [
                {
                    key: "Resident Status",
                    values: [
                        {
                            filter: {
                                key: "Prospects",
                                value: "Prospects"
                            },
                            options: [
                                {
                                    name: 'All',
                                    value: 'All'
                                },
                                {
                                    name: 'Active',
                                    value: 'Active'
                                },
                                {
                                    name: 'Online',
                                    value: 'Online'
                                },
                                {
                                    name: 'MyProspectives',
                                    value: 'MyProspectives'
                                },
                                {
                                    name: 'Returning',
                                    value: 'Returning'
                                },
                                {
                                    name: 'Unassigned',
                                    value: 'Unassigned'
                                }
                            ]
                        },
                        {
                            filter: {
                                key: "Applicants",
                                value: "Applicants"
                            },
                            options: [
                                {
                                    name: 'All',
                                    value: 'All'
                                },
                                {
                                    name: 'Current',
                                    value: 'Current'
                                },
                                {
                                    name: 'Canceled/Denied',
                                    value: 'Canceled/Denied'
                                },
                                {
                                    name: 'PreviousApplicant',
                                    value: 'PreviousApplicant'
                                }
                            ]
                        },
                        {
                            filter: {
                                key: "Waitlist",
                                value: "Waitlist"
                            },
                            options: [
                                {
                                    name: 'All',
                                    value: 'All'
                                },
                                {
                                    name: 'Current',
                                    value: 'Current'
                                },
                                {
                                    name: 'Canceled/Denied',
                                    value: 'Canceled/Denied'
                                },
                                {
                                    name: 'PreviousApplicant',
                                    value: 'PreviousApplicant'
                                }
                            ]
                        },
                        {
                            filter: {
                                key: "Residents",
                                value: "Current Residents"
                            },
                            options: [
                                {
                                    name: 'All',
                                    value: 'All'
                                },
                                {
                                    name: 'Current',
                                    value: 'Current'
                                },
                                {
                                    name: 'Pending-Moveout',
                                    value: 'Pending-Moveout'
                                },
                                {
                                    name: 'Pending-Renewal',
                                    value: 'Pending-Renewal'
                                },
                                {
                                    name: 'Pending-Transfer',
                                    value: 'Pending-Transfer'
                                }
                            ]
                        },
                        {
                            filter: {
                                key: "PreviousResidents",
                                value: "Previous Residents"
                            },
                            options: [
                                {
                                    name: 'All',
                                    value: 'All'
                                },
                                {
                                    name: 'Previous',
                                    value: 'Previous'
                                },
                                {
                                    name: 'PendingFinalStatement',
                                    value: 'PendingFinalStatement'
                                }
                            ]
                        },
                        {
                            filter: {
                                key: "NonResidents",
                                value: "New Resident Account"
                            },
                            options: [

                            ]
                        }
                    ]
                },
                {
                    key: "Relationship",

                },
                {
                    key: "Contact Type",
                    values: [
                        {
                            filter: {
                                key: "BusinessContact",
                                value: "Business"
                            },

                        },
                        {
                            filter: {
                                key: "EmployeeContact",
                                value: "Employee"
                            },

                        },
                        {
                            filter: {
                                key: "GuarantorContact",
                                value: "Guarantor"
                            },

                        },
                        {
                            filter: {
                                key: "LeaseSignerContact",
                                value: "Lease Signer"
                            },

                        },
                        {
                            filter: {
                                key: "OccupantContact",
                                value: "Occupant"
                            },

                        }
                    ]
                },
                {
                    key: "Date Range",
                    options: [
                        {
                            name: 'Move In',
                            value: 'MoveIn'
                        },
                        {
                            name: 'Move Out',
                            value: 'MoveOut'
                        },
                        {
                            name: 'Lease Start',
                            value: 'LeaseStart'
                        },
                        {
                            name: 'Lease End',
                            value: 'LeaseEnd'
                        }
                    ]
                }
            ]
        };
        prov.setData(metaData);
    }

    angular
        .module("budgeting")
        .config(['rpAdvancedSearchFiltersModelProvider', config]);
})(angular);
