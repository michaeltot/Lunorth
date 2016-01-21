'use strict';

describe('Controller: PrintBillCtrl', function () {

  // load the controller's module
  beforeEach(module('lunorthApp'));

  var PrintCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrintCtrl = $controller('PrintCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
