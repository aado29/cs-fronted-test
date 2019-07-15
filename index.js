var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var compression = require("compression");
var morgan      = require("morgan");
var PORT        = Number( process.env.PORT || 3000 );
var counters    = require("./lib/counters");

var coorsMiddleware = (req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
};

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(compression());

app.use(express.static('build'));

app.all('/*', coorsMiddleware);

// [json] GET /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3}
// => ]
app.get("/api/v1/counters", function(req, res) {
  res.json(counters.all())
});

// [json] POST {title: "bob"} /api/v1/counter
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.post("/api/v1/counter", function(req, res) {
  console.log(req.body)
  res.json(counters.create(req.body.title));
})

// [json] DELETE {id: "asdf"} /api/v1/counter
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.delete("/api/v1/counter", function(req, res) {
  res.json(counters.delete(req.body.id));
});

// [json] POST {id: "qwer"} /api/v1/counter/inc
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/inc", function(req, res) {
  res.json(counters.inc(req.body.id));
});

// [json] POST {id: "zxcv"} /api/v1/counter/dec
// => [
// =>   {id: "zxcv", title: "steve", count: 2},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/dec", function(req, res) {
  res.json(counters.dec(req.body.id));
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});
app.head("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, console.log.bind(null, "PORT: " + PORT));

// Easter egg
// fetch('/api/v1/counters', {method: 'get'})
//   .then(res => res.json())
//   .then(res => console.log(res))

// fetch('/api/v1/counter', {
//   method: 'post',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// })
// .then(res => res.json())
// .then(res => console.log(res))
