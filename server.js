var express = require('express'),
	app = express.createServer(),
	sys = require('sys'),
	store = require('./server/store.js');
store.load();

app.use(express.bodyParser());
app.set('views', 'views/');
app.register('.html', require('ejs'));
app.set('view engine', 'html');
app.use(express.static('static/'));

app.get('/', function(request, response) {
	response.render('index', store.data);
});

function setHeaderForJSON(request, response, next) {
	response.header('content-type', 'application/json; charset=utf-8');
	next();
};

(function entries(global, app) {
	app.get('/entries', setHeaderForJSON, function get_entries(request, response) {
		response.send(JSON.stringify(store.getEntries()));
	});
	app.delete('/entries', function delete_entries(request, response) {
		store.clearEntries();
		response.send(200);
	});
	app.get('/entries/:name', setHeaderForJSON, function get_entriesName(request, response) {
		response.send(JSON.stringify(store.getEntry(request.params.name)));
	});
	app.put('/entries/:name', setHeaderForJSON, function put_entriesName(request, response) {
		if(store.addEntry(request.params.name)) {
			response.send(200);
		} else {
			response.send(400);
		}
	});
	app.delete('/entries/:name', setHeaderForJSON, function delete_entriesName(request, response) {
		store.deleteEntry(request.params.name);
		response.send(200);
	});
	app.post('/entries/:name', setHeaderForJSON, function post_entriesName(request, response) {
		var entry = store.updateEntry(request.params.name, request.body);
		response.send(JSON.stringify(entry));
	});
})(this, app);

app.listen(8081);
sys.puts('Server running on 8081');