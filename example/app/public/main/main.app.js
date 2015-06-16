
(function () {

	var LENGTH_OF_LIST = 5;
	var REFRESH_TIME = 1000;

	// The main module declaration for the app.

	angular.module('challenge2', [
		'feed'
	]);


	// The main ctrl loaded after bootstrapping the app.

	angular
		.module('challenge2')
		.controller('appCtrl', ['$scope', '$interval', 'feedService', 'favouritesService', function ($scope, $interval, feedService, favouritesService) {

			// Controller static values.

			this.title = "Challenge Number 2";
			this.subtitle = "This One Should Be A Bit Tougher";

			// Main scope things to digest.

			$scope.items = [];
			$scope.favourites = favouritesService.favourites;

			// A hashset used to de-dupe the feed item collection.

			var hashSet = {};

			// Every REFRESH_TIME, in milliseconds, go and see if there is a new item.

			// Bonus: Make this an observable from Rx. Then make the services observers.

			$interval(function () {

				// Get the feed of most recent items.
				feedService
					.getLatestItem()
					.success(function (data) {
						if (data instanceof Array && data[0]) {

							// Is the new item to the hashSetionary?
							if (!hashSet[data[0].id]) {

								// Populate the hashSet for the items from the feed.
								hashSet[data[0].id] = data[0]

								// Add the new item to the start of the array.
								$scope.items.unshift(data[0]);

								// Find and delete any old items from the hashSet.
								var deleted = $scope.items.splice(LENGTH_OF_LIST, $scope.items.length)
								for (var i = 0; i > deleted.length; i++) {
									delete hashSet[deleted[i].id];
								}
							}
						}
					})
					.error(function (err) {
						console.log(err);
					});
			}, REFRESH_TIME);
		}]);

	var startUpLogo = "\n    __  __ __   ____  _      _        ___  ____    ____    ___     \n   /  ]|  |  | /    || |    | |      /  _]|    \\  /    |  /  _]    \n  /  / |  |  ||  o  || |    | |     /  [_ |  _  ||   __| /  [_     \n /  /  |  _  ||     || |___ | |___ |    _]|  |  ||  | _ |    _] \n/   \\_ |  |  ||  _  ||     ||     ||   [_ |  |  ||  |_|||   [_     \n\\     ||  |  ||  |  ||     ||     ||     ||  |  ||     ||     |    \n \\____||__|__||__|__||_____||_____||_____||__|__||___,_||_____|    \n                      _____  _____                                 \n                     [_   _||_   _]                                \n                       | |    | |                                  \n                      _| |_  _| |_                                 \n                     [_____||_____]                                 \n\n          SO LETS GET GOING WITH THIS FEED THINGY\n            BY: J450|\\| |)ry|-|ur5t - 5|\\/|1tH";
	console.log(startUpLogo);

} ());