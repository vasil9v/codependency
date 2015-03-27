var fs = require("fs"),
    request = require("request"),
    restify = require("restify");

var server = restify.createServer();
server.use(restify.queryParser());
server.pre(function(req, res, next) {
    console.log("pre: request: " + req.getPath());
    return next();
});

function getNow() {
    return (new Date()).getTime()
}

var lastCheckinTime = getNow();

server.get("/checkin", function(req, res) {
    var now = getNow();
    lastCheckinTime = now;
    var msg = "ok got you checked in at: " + now;
    console.log(msg);
    res.json(msg);
});

server.listen(9955, function() {
    console.log("%s listening at %s", server.name, server.url);
});

var checkAlive = setInterval(function() {
    // check they haven't missed 3 checkins
    if ((getNow() - lastCheckinTime) > 3000) {
        var now = getNow();
        lastCheckinTime = now + 10000; // give it some time
        console.log("killing app1");
        fs.writeFile("../app1/killthis.js", "killed at " + now, function (err) {
            if (err) {
                console.log("failed to write kill file: " + err);
            }
        });
    }
}, 100);
