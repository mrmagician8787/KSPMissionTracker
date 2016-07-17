/// <reference path="_all.d.ts" />

"use strict";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index";
import * as addMissionRoute from "./routes/addMission";
import * as editMissionRoute from "./routes/editMission";
import * as deleteMissionRoute from "./routes/deleteMission";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // create expressjs application
        this.app = express();

        // configure application
        this.config();

        // configure routes
        this.routes();
    }

    /**
     * Configures the application.
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {
        // configure jade
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");

        // mount logger
        // this.app.use(logger("dev"));

        // mount json form parser
        this.app.use(bodyParser.json());

        // mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // add static paths
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            // TODO
            // var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        // get router
        let router: express.Router;
        router = express.Router();

        // create routes
        var index: indexRoute.Index = new indexRoute.Index();
        var addMission: addMissionRoute.AddMission = new addMissionRoute.AddMission();
        var editMission: editMissionRoute.EditMission = new editMissionRoute.EditMission();
        var deleteMission: deleteMissionRoute.DeleteMission = new deleteMissionRoute.DeleteMission();

        // home page
        router.get("/", index.index.bind(index.index));
        router.get("/addMission", addMission.addMission.bind(addMission.addMission));
        router.get("/editMission", editMission.editMission.bind(editMission.editMission));
        router.get("/deleteMission", deleteMission.deleteMission.bind(deleteMission.deleteMission));

        // use router middleware
        this.app.use(router);
    }
}

var server = Server.bootstrap();
export = server.app;
