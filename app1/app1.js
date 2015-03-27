var fs = require("fs"),
    request = require("request"),
    restify = require("restify");

console.log("restarting!!!");
fs.unlink("killthis.js", function(err) {
    console.log(err || "removed killthis.js");
});

var server = restify.createServer();
server.use(restify.queryParser());
server.pre(function(req, res, next) {
    console.log("pre: request: " + req.getPath());
    return next();
});

server.get("/api/serve/:time", function(req, res) {
    var time = Number(req.params.time || "1000"); // default 1 second later
    console.log("sleeping for " + time);
    if (time == 999) {
        while(1) {
            time += 1;
            time -= 1;
        }
    }
    setTimeout(function() {
        res.json(200, "ok, took " + time + "ms");
    }, time);
});

server.listen(9944, function() {
    console.log("%s listening at %s", server.name, server.url);
});

if (1) {
    var keepalive = setInterval(function() {
        var options = {
            url: "http://localhost:9955/checkin"
        };
        function callback(error, response, body) {
            var msg = "called checkin: " + body;
            if (error) {
                msg = error;
            }
            console.log(msg);
        }
        request(options, callback);
    }, 1000);
    // ddd    
}
