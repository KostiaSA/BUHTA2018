import * as express from "express";
import * as path from "path";
//import * as logger from "morgan";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import {_config} from "../../../_config";
import {_bindApi} from "./_bindApi";
import {_serverStartup} from "../_serverStartup";

const expressApp = express();

_startServer().then(() => {
    console.log("Сервер стартовал.")
});

async function _startServer() {
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(cookieParser());
    expressApp.use(express.static("app")); //serve public files
    console.log("staticPath: expressApp");

//console.log(__dirname);
// Register routes (as middleware layer through express.Router())
//expressApp.use(exampleRoute);

    await _bindApi(expressApp);

    // expressApp.post('/api', (req: express.Request, res: express.Response, next: Function) => {
    //     console.log("api", req.body);
    //     pingApiResponse(req.body).then((result: any) => {
    //         res.send(result);
    //     });
    //
    // });

//expressApp.post('/api', commonApiResponse);


// catch 404 and forward to error handler
    expressApp.use((req: express.Request, res: express.Response, next: Function) => {
//    console.error("not found: "+req.originalUrl);
//    let err = new Error("not found: "+req.originalUrl);
        let err = new Error("not found: " + req.originalUrl);
        err.stack = undefined;
        res.status(404);
        //console.log("catching 404 error");
        return next(err);
    });


    expressApp.set("port", _config.port);

    console.log("sql server: " + _config.sqlServerAddress);

// executeSql("SELECT count(*) FROM channel")
//     .then(() => {
//         console.log("sql connect Ok");
//         expressApp.listen(expressApp.get("port"), () => {
//             console.log("Express server listening on port " + config.port);
//         }).on("error", err => {
//             console.log("Cannot start server, port most likely in use");
//             console.log(err);
//         });
//
//     })
//     .catch((e) => {
//         console.error(e);
//     });
//


    expressApp.listen(expressApp.get("port"), () => {
        console.log("Express server listening on port " + _config.port);
    }).on("error", err => {
        console.log("Cannot start server, port most likely in use");
        console.log(err);
    });

    await _serverStartup();

}

// Main expressApp

// view engine setup
//expressApp.set("views", path.join(__dirname, "views"));
//expressApp.set("view engine", "jade");

//expressApp.use(favicon(__dirname + "/public/favicon.ico"));
//expressApp.use(logger("dev"));

