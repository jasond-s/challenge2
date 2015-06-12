describe('Local storage', function () {

	var localstorageService = null;

	beforeEach(module("challenge2"));

	beforeEach(inject(function (_localstorageService_) {
		localstorageService = _localstorageService_;
	}));

	it('stores a value for a provided key', function () {
		localstorageService.addToStorage('test', 'test');
		expect(localstorageService.getFromStorage('test')).toEqual('test');
	});

	it('returns the value for the provided key', function () {
		localstorageService.removeFromStorage('test');
		expect(localstorageService.getFromStorage('test')).toBeFalsy();
	});

	it('clears the storage completely if asked', function () {
		localstorageService.addToStorage('test', 'test');
		localstorageService.clearStorage();
		expect(localstorageService.getFromStorage('test')).toBeFalsy();
	});

	it('will tell you if the data is persisted across browser sessions', function () {

		// TODO - Cannot test for disabled localStorage as phantomJs does not support this

		expect(localstorageService.isPersisted).toBeTruthy();
	});

});