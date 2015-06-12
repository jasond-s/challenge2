
// A service for dealing with localstorage.

(function () {

	var storage = window.localStorage || {
		store: {},
		isNotPersisted: true,
		setItem: function (key, item) {
			this.store[key] = item;
		},
		removeItem: function (key) {
			delete this.store[key];
		},
		getItem: function (key) {
			return this.store[key];
		},
		clear: function () {
			this.store = {};
		}
	};

	angular
		.module('challenge2')
		.service('localstorageService', [function () {

			this.getFromStorage = function (key) {
				// Using angular JSON methods here as
				// we used it to serialise and it does dates.
				return angular.fromJson(storage.getItem(key));
			};

			this.addToStorage = function (key, item) {
				// Using angular JSON methods here as
				// otherwise '$' props are serialised.
				return storage.setItem(key, angular.toJson(item));
			};

			this.removeFromStorage = function (key) {
				return storage.removeItem(key);
			};

			this.clearStorage = function (key) {
				return storage.clear();
			};

			// Double negative to check for loaded localstorage.
			this.isPersisted = !storage.isNotPersisted;

		}]);

} ());