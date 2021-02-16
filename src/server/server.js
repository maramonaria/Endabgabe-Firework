"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Fireworks;
(function (Fireworks) {
    let rocketsCollection;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://maramonaria:Flocke-1998@eia2fireworks.k4n7e.mongodb.net/RocketScience?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        rocketsCollection = mongoClient.db("RocketScience").collection("Rockets");
        console.log("Database connection ", rocketsCollection != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            switch (command) {
                case "retrieve":
                    retrieveAll(_request, _response);
                    break;
                case "delete":
                    console.log("url: ", url);
                    deleteRocket(_request, _response);
                    break;
                default:
                    _response.write("Rocket sent!");
                    storeRocket(url.query);
                    _response.end();
            }
        }
    }
    function storeRocket(_rocket) {
        rocketsCollection.insertOne(_rocket);
    }
    async function retrieveAll(_request, _response) {
        let results = rocketsCollection.find();
        Fireworks.rocketCreations = await results.toArray();
        _response.write(JSON.stringify(Fireworks.rocketCreations));
        _response.end();
    }
    async function deleteRocket(_request, _response) {
        console.log("deleting");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.query["id"] != undefined) {
                let rocketId = "" + url.query["id"];
                let objectId = new Mongo.ObjectId(rocketId.toString());
                console.log("delete Object with Id: ", objectId);
                if (rocketId != undefined)
                    rocketsCollection.deleteOne({ "_id": objectId });
                _response.write("Rocket deleted!");
            }
        }
        _response.end();
    }
})(Fireworks = exports.Fireworks || (exports.Fireworks = {}));
//# sourceMappingURL=server.js.map