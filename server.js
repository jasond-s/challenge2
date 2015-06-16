var cluster = require('cluster'),
	numCPUs = require('os').cpus().length,
	path = require('path'),
	jadeStatic = require('connect-jade-static'),
	stylus = require('stylus'),
	nib = require('nib'),
	request = require('request'),
	xml2js = require('xml2js'),
	express = require('express'),
	app = express(),
	parser = new xml2js.Parser();


// app globals

var type = process.argv[2];
var publicRoute = path.join(__dirname, '/' + type + '/app/public');
var viewRoute = path.join(__dirname, type + '/app/views');

// configure environment

if (app.settings.env === 'development') {
	// Development specific code...
}
else if (app.settings.env === 'production') {
	// Noop for the console log...
	console.log = function () {};
}

// app code

if (cluster.isMaster) {

	(function() {

		// Fork workers.
		// Helps with serving static file requests that are heavy on IO.

		for (var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		// Log the cluster instances status.

		cluster.on('online', function(worker) {
	  		console.info("%s [worker %s]\t responded to fork PID:%s", new Date().toISOString(), worker.id, worker.process.pid);
		});

		cluster.on('listening', function(worker, address) {
			console.info("%s [worker %s]\t is now connected to %s:%s", new Date().toISOString(), worker.id, address.address, address.port);
		});

		cluster.on('exit', function(worker, code, signal) {
			console.info('%s [worker %s]\t died, restarting', new Date().toISOString(), worker.id);
			cluster.fork();
		});
	} ());

} else {

	(function() {

		// Add our middleware.

		app.use(jadeStatic({
			baseDir: publicRoute,
			baseUrl: '/',
			maxAge: 86400,
			jade: { pretty: true }
		}));

		app.use(stylus.middleware({
			src: publicRoute,
			compile: function (str, path) {
				return stylus(str).set('filename', path).use(nib())
			}
		}));


		// Use express to serve our static as well.

		app.use(express.static(publicRoute));

		// View setup.

		app.set('view engine', 'jade');

		app.set('views', viewRoute);

		// Add the route for the base URL.

		app.get('/', function (req, res) {

			console.log('%s [Req %s]\t [/] Render view: index', new Date().toISOString(), cluster.worker.id);

			res.render('index');
		});


		// The rss parse function.

		function rss(req, res){

			// Make a request to the feed for the data.

			request('http://lorem-rss.herokuapp.com/feed?unit=second&interval=30', function (error, response, body) {

				if (!error && response.statusCode == 200) {

					// Parse the RSS xml into json for usage.

					parser.parseString(body, function (err, result) {

						// The number of items we really want to see.

						var number = req.params.number || result.rss.channel[0].item.length;

						// Parse the feeed into a nice JSON object.

						var parsedItems = result.rss.channel[0].item.map(function (item, index) {

							if (index > number) return null;

							// Map the rss item to something more useful.

							return {
								id: item.link[0],
								title: item.title[0],
								description: item.description[0],
								creator: item['dc:creator'][0],
								createdOn: item.pubDate[0]
							};
						}).slice(0, number);

						// Send back all of the good stuff.

						res.json(parsedItems);
					});

				} else {

					// Just send back some nonsense.

					res.json({ statusCode: response.statusCode });
				}

				// Flush anything left in the response.

				res.end();
			});
		}


		// Add the route for the feed that we will be choping up.

		app.get('/feed', function (req, res) {

			console.log('%s [Req %s]\t [/feed/]', new Date().toISOString(), cluster.worker.id);

			rss(req, res);
		});

		app.get('/feed/:number', function (req, res) {

			console.log('%s [Req %s]\t [/feed/:number] number: %s', new Date().toISOString(), cluster.worker.id, req.params.number);

			rss(req, res);
		});


		// Start the server.

		var server = app.listen('9555', function() {

			var address = server.address();

			console.info('%s [%s %s]\t server started at %s:%s', new Date().toISOString(), type, cluster.worker.id, address.address, address.port)
		});

	} ());
}