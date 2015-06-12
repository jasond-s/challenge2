describe('Favourites', function () {

	var favouritesService = null;

	beforeEach(module("challenge2"));

	beforeEach(inject(function (_favouritesService_) {
		favouritesService = _favouritesService_;
	}));

	it('adds an item to the collection of favourites', function () {
		favouritesService.addToFavourites('test');
		expect(favouritesService.favourites.length).toEqual(1);
	});

	it('does not add duplicate items to favourites', function () {
		favouritesService.addToFavourites('test');
		favouritesService.addToFavourites('test');
		expect(favouritesService.favourites.length).toEqual(1);
	});

	it('removes a favourite from the collection', function () {
		favouritesService.removeFromFavourites('test');
		expect(favouritesService.favourites.length).toEqual(0);
	});

	it('can hold any number of items', function () {
		favouritesService.addToFavourites('test1');
		favouritesService.addToFavourites('test2');
		favouritesService.addToFavourites('test3');
		expect(favouritesService.favourites.length).toEqual(3);
	});

});