        __  __ __   ____  _      _        ___  ____    ____    ___
       /  ]|  |  | /    || |    | |      /  _]|    \  /    |  /  _]
      /  / |  |  ||  o  || |    | |     /  [_ |  _  ||   __| /  [_
     /  /  |  _  ||     || |___ | |___ |    _]|  |  ||  | _ |    _]
    /   \_ |  |  ||  _  ||     ||     ||   [_ |  |  ||  |_|||   [_
    \     ||  |  ||  |  ||     ||     ||     ||  |  ||     ||     |
     \____||__|__||__|__||_____||_____||_____||__|__||___,_||_____|
                          _____  _____
                         [_   _||_   _]
                           | |    | |
                          _| |_  _| |_
                         [_____||_____]


# Coding Challenge


## Story

- Create an app for viewing one or more rss feeds.
	- HTTP and the like for retrieval, you can use the express server provided if you like.

- You should be able to see the updates to the feed live, as and when they happen.
	- Rx.js or bacon.js observables for bonus points.

- You should be able to mark items from the feed as favourites.
	- Some bit of fancy pants UI if you like.

- Favourites should be cacheable for viewing later, must be viewable when the browser refreshes.
	- I would suggest using localStorage (or a database if you prefer).

- Whenever a user clicks on an item for details. This must be recorded.
	- Over time stats should be generated for the user actions.
	- This could be done async by a using a WebWorker.

- Something with file Blobs.
- Something with Audio elements.



#Run

To run the src:

- Testing: `npm test`
	- Tests output to `src/tests/output`

- Run Server: `npm start`
	- The servce will start on localhost:9123


To run the example:

- Testing: `npm run testex`
	- Tests output to `example/tests/output`

- Run Server: `npm run startex`
	- The servce will start on localhost:9123


# Sketches


## Ideas

- Some sort of game.
	- Matching things together.
	- Text adventure (HTTP adventure).
	- Platformer.

- Responding to server events.
	- Websockets.
	- Webworker.
	- Plain old HTTP.

- UI.
	- Responsiveness.
		- Media queries.
		- Flow layouts.
	- Data centric.
	- Memory leaks.

- Maybe not doing anything with angular. Or extra bits.
	- Rx (Functional Reactive Programming frameworks, bacon.js etc also acceptable).
		- For responding to events from the server.
		- For responding to events from the user.
	- Fabric.
		- Drawing.
		- Interaction.

- Using Angular.
	- Directives.
	- Services.
	- Controllers.
	- Resources.


## App

- Provided
	- Client.
		- NOTHING.
	- Server.
		- SOMETHING?

- Expected.
	- Client.
		- LOTS.
	- Server.
		- NOT SO MUCH.


## Tips

- Don't eat yellow snow.