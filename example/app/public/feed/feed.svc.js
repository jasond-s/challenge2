(function () {

	// A service for retrieving items from a feed.
	var FEED_URL = '/api/feed/';

	angular
		.module('feed')
		.service('feedService', ['$http', function ($http) {

			this.getLatestItem = function () {
				return $http.get(FEED_URL + '1');
			}

		}]);

} ());
