(function () {

    // A directive for displaying an item from a feed.

    angular
    	.module('feed')
    	.directive('feedItem', ['favouritesService', function (favouritesService) {

            var templateUrl = '/feed/feed-item.dir.html';

            return {
                restrict: "E",
                replace: true,
                templateUrl: templateUrl,
                scope: {
                    item: '='
                },

                link: function (scope) {
                    if (typeof scope.item.isFavourite === 'undefined') scope.item.isFavourite = false;

                    scope.$watch('item.isFavourite', function () {
                        if (scope.item.isFavourite)
                            favouritesService.addToFavourites(scope.item);
                        else
                            favouritesService.removeFromFavourites(scope.item);
                    })
                }
            }

    	}]);

} ());
