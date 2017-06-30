import * as express from "express";
import * as path from "path";
//import * as logger from "morgan";
import * as favicon from "serve-favicon";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import {_config} from "../../../_config";
import {_bindApi} from "./_bindApi";
import {_serverStartup} from "../_serverStartup";
import {_bindSchemaPages} from "./_bindSchemaPages";

const expressApp = express();

_startServer().then(() => {
    console.log("Сервер стартовал.")
});

async function _startServer() {
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(cookieParser());


    await _bindApi(expressApp);

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

    await _bindSchemaPages(expressApp);

    expressApp.use(express.static("app")); //serve public files

    expressApp.use((req: express.Request, res: express.Response, next: Function) => {
        let err = new Error("not found: " + req.originalUrl);
        err.stack = undefined;
        res.status(404);
        return next(err);
    });

}

// Main expressApp

// view engine setup
//expressApp.set("views", path.join(__dirname, "views"));
//expressApp.set("view engine", "jade");

//expressApp.use(favicon(__dirname + "/public/favicon.ico"));
//expressApp.use(logger("dev"));

