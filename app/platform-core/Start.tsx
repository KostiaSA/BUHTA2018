import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {TestButton} from "./test/TestButton1";
import {SaveSchemObjectTestButton} from "./test/SaveSchemObjectTestButton";
import {LoadSchemObjectTestButton} from "./test/LoadSchemObjectTestButton";
//import {Router, Route, Link} from "react-router"
//import {App, expressApp, setApp} from "./App";
//..import {appState} from "./AppState";
//import {getRandomString} from "./utils/getRandomString";
//import moment = require("moment");
//import Notifications, {notify} from "react-notify-toast";
//import  {RouteHandler} from "react-router";
//import  {DefaultRoute} from "react-router";
//import  {Router, Route, DefaultRoute, RouteHandler, Link, NotFoundRoute} from "react-router";


//moment.locale("ru");

//if (!window.localStorage.getItem("sessionId")) {
//    window.localStorage.setItem("sessionId", getRandomString());
//}

//appState.sessionId = window.localStorage.getItem("sessionId")!;
//appState.login = window.localStorage.getItem("login")!;
//appState.password = window.localStorage.getItem("password")!;


//console.log("sessionId", appState.sessionId);
//console.log("login", appState.login);
//console.log("password", appState.password);

//ReactDOM.render(<div ref={(e:any)=>setApp(e)}/>, document.body);


ReactDOM.render(<div>ПРИВЕТ !!! 77<TestButton/><SaveSchemObjectTestButton/><LoadSchemObjectTestButton/></div>, document.getElementById("content"));