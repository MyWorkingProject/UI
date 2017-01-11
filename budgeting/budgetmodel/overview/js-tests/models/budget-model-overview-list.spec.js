// Tests for Budget Model Overview List Model

describe('Budget Model Overview List Model', function () {
    var model, filterObj;

    beforeEach(module('budgeting.budgetmodel.overview'));

    beforeEach(inject(function ($filter, BdgtOverviewListModel) {
        filterObj = $filter;
        model = BdgtOverviewListModel;
    }));

    it('on isLink to return true or false if the object has url', function () {
        var resp = [{
            "name": "Account by Account",
            "dt": "Not Started",
            "summary": "",
            "status": "Inactive",
            "url": "#",
            "subItems": []
        }];
        var bln = model.isLink(resp[0]);

        expect(bln).toBe(true);

        resp = [{
            "name": "Account by Account",
            "dt": "Not Started",
            "summary": "",
            "status": "Inactive",
            "subItems": []
        }];
        bln = model.isLink(resp[0]);
        expect(bln).toBe(false);

    });

    it('on setModelID should set the modelID value', function () {
        model.setModelID(1);

        expect(model.form.modelID).toBe(1);
    });

    it('on updateStatus should update the status of the list item', function () {
        var resp = [{
            "name": "Account by Account",
            "dt": "Not Started",
            "summary": "",
            "status": "Inactive",
            "url": "#",
            "subItems": []
        }];
        model.updateStatus(resp[0]);

        expect(resp[0].status).toBe('Active');

        resp = [{
            "name": "Account by Account",
            "dt": "Not Started",
            "summary": "",
            "status": "Active",
            "url": "#",
            "subItems": []
        }];
        model.updateStatus(resp[0]);

        expect(resp[0].status).toBe('Completed');

        resp = [{
            "name": "Account by Account",
            "dt": "Not Started",
            "summary": "",
            "status": "Completed",
            "url": "#",
            "subItems": []
        }];
        model.updateStatus(resp[0]);

        expect(resp[0].status).toBe('Inactive');
    });

    it('on updateSubStatus should update the status of the sub list item', function () {

        model.updateParentStatus = function (record) {
            return true;
        };
        var resp = [{
            "name": "Tools",
            "dt": "Bob Smith, 10/27/2015 2:30PM",
            "summary": "",
            "status": "Inactive",
            "subItems": [
                {
                    "name": "Allocations",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,048",
                    "url": "#",
                    "status": "Inactive"
                }]
        }];
        model.updateSubStatus(resp[0].subItems[0], resp);

        expect(resp[0].subItems[0].status).toBe('Active');

        resp = [{
            "name": "Tools",
            "dt": "Bob Smith, 10/27/2015 2:30PM",
            "summary": "",
            "status": "Active",
            "subItems": [
                {
                    "name": "Allocations",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,048",
                    "url": "#",
                    "status": "Active"
                }]
        }];
        model.updateSubStatus(resp[0].subItems[0], resp);

        expect(resp[0].subItems[0].status).toBe('Completed');

        resp = [{
            "name": "Tools",
            "dt": "Bob Smith, 10/27/2015 2:30PM",
            "summary": "",
            "status": "Completed",
            "subItems": [
                {
                    "name": "Allocations",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,048",
                    "url": "#",
                    "status": "Completed"
                }]
        }];
        model.updateSubStatus(resp[0].subItems[0], resp);

        expect(resp[0].subItems[0].status).toBe('Inactive');
    });

    it('on updateParentStatus should update the status of the parent list item', function () {
        var resp = [{
            "name": "Tools",
            "dt": "Bob Smith, 10/27/2015 2:30PM",
            "summary": "",
            "status": "Inactive",
            "subItems": [
                {
                    "name": "Allocations",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,048",
                    "url": "#",
                    "status": "Inactive"
                },
                {
                    "name": "Custom Worksheets",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,070",
                    "url": "#",
                    "status": "Inactive"
                }]
        }];
        model.updateParentStatus(resp[0]);

        expect(resp[0].status).toBe('Inactive');

        resp = [{
            "name": "Tools",
            "dt": "Bob Smith, 10/27/2015 2:30PM",
            "summary": "",
            "status": "Inactive",
            "subItems": [
                {
                    "name": "Allocations",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,048",
                    "url": "#",
                    "status": "Active"
                },
                {
                    "name": "Custom Worksheets",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,070",
                    "url": "#",
                    "status": "Inactive"
                }]
        }];
        model.updateParentStatus(resp[0]);

        expect(resp[0].status).toBe('Active');

        resp = [{
            "name": "Tools",
            "dt": "Bob Smith, 10/27/2015 2:30PM",
            "summary": "",
            "status": "Active",
            "subItems": [
                {
                    "name": "Allocations",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,048",
                    "url": "#",
                    "status": "Completed"
                },
                {
                    "name": "Custom Worksheets",
                    "dt": "Bob Smith, 10/27/2015 2:30PM",
                    "summary": "$1,070",
                    "url": "#",
                    "status": "Completed"
                }]
        }];
        model.updateParentStatus(resp[0]);

        expect(resp[0].status).toBe('Completed');
    });

    it('on reset copy default data to form data', function () {
        model.emptyData = {
            modelID: 0
        };

        model.reset();

        expect(model.form.modelID).toBe(0);

    });
});

