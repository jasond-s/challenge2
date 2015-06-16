
// A service for dealing with the favourites.

(function () {

	var STORAGE_KEY = 'favouritesList';

	function add(array, item) {
		var length = array.length;

	    if (array.getArray) {
	        array = array.getArray();
	    }

	    var index = array.indexOf(item);

	    if (index > -1) {
	        return;
	    }

	    return array.push(item) > length;
	};

	function remove(array, item) {
	    if (array.getArray) {
	        array = array.getArray();
	    }

	    var index = array.indexOf(item);

	    if (index > -1) {
	        array.splice(index, 1);
	        return true;
	    }

	    return false;
	};

	angular
		.module('challenge2')
		.service('favouritesService', ['localstorageService', function (localstorageService) {

			this.favourites = localstorageService.getFromStorage(STORAGE_KEY) || [];

			this.addToFavourites = function (item) {
				if (add(this.favourites, item)) {
					localstorageService.addToStorage(STORAGE_KEY, this.favourites)
				}
			}

			this.removeFromFavourites = function (item) {
				if (remove(this.favourites, item)) {
					localstorageService.addToStorage(STORAGE_KEY, this.favourites)
				}
			}
		}]);

} ());