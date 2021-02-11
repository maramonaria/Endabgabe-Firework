"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
var Fireworks;
(function (Fireworks) {
    let rocketsCollection;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://maramonaria:Flocke-1998@eia2fireworks.k4n7e.mongodb.net/RocketScience?retryWrites=true&w=majority";
    startServer(port);
    //    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    //    async function connectToDatabase(_url: string): Promise<void> {
    //        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    //        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    //        await mongoClient.connect();
    //        rocketsCollection = mongoClient.db("RocketScience").collection("Rockets");
    //        console.log("Database connection ", rocketsCollection != undefined);
    //    }
    function handleRequest(_request, _response) {
        //console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            console.log("Query: " + url.query);
            storeRocket(url.query);
        }
        _response.end();
    }
    function storeRocket(_rocket) {
        rocketsCollection.insertOne(_rocket);
    }
})(Fireworks = exports.Fireworks || (exports.Fireworks = {}));
//# sourceMappingURL=server.js.map