import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";


export namespace Fireworks {
    interface RocketInter {
        [type: string]: undefined | string | string[];
    }

    export let rocketCreations: string[];

    let rocketsCollection: Mongo.Collection;

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    let databaseUrl: string = "mongodb+srv://maramonaria:Flocke-1998@eia2fireworks.k4n7e.mongodb.net/RocketScience?retryWrites=true&w=majority";


    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);

        mongoClient.connect(err => {
            rocketsCollection = mongoClient.db("RocketScience").collection("Rockets");
            console.log("Database connection ", rocketsCollection != undefined);
        });
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let command: undefined | string | string[] = url.query["command"];

            switch (command) {
                case "retrieve":
                    retrieveAll(_request, _response);
                    break;
                case "delete":
                    console.log("url: ", url);
                    deleteRocket(_request, _response);
                    break;
                default:
                    let jsonString: string = JSON.stringify(url.query);
                    _response.write(jsonString);

                    console.log("Query: ", url.query);
                    storeRocket(url.query);
                    _response.end();

            }
        }  
    }

    function storeRocket(_rocket: RocketInter): void {
        rocketsCollection.insertOne(_rocket);
    }

    async function retrieveAll(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let results: Mongo.Cursor = rocketsCollection.find();
        rocketCreations = await results.toArray();
        _response.write(JSON.stringify(rocketCreations));

        _response.end();
    }    

    async function deleteRocket(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("deleting");
        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let rocketId: undefined | string | string[] = url.query["id"];
            rocketsCollection.deleteOne({ "_id": rocketId });
        }

    }
}