import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {TestButton} from "./test/TestButton1";
import {SaveSchemObjectTestButton} from "./test/SaveSchemObjectTestButton";
import {LoadSchemObjectTestButton} from "./test/LoadSchemObjectTestButton";
import {PageTemplate} from "./components/PageTemplate";
import {clientStartup} from "./clientStartup";
import {findSchemaObjectsApiRequest} from "./schema/api/findSchemaObjectsApiRequest";
import {ISchemaObject} from "./schema/ISchemaObject";
import {appState} from "./AppState";
import {ISchemaApp} from "./schema/ISchemaApp";
import {loadSchemaObjectApiRequest} from "./schema/api/loadSchemaObjectApiRequest";
import {SchemaObject} from "./schema/SchemaObject";
import {SchemaPage} from "./schema/SchemaPage";
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


async function start() {
    await clientStartup();

    let objects = (await findSchemaObjectsApiRequest({where: {type: "SchemaApp"}})).objects;
    if (objects.length === 0)
        throw "в конфигурации нет ни одного объекта 'SchemaApp'";

    let schemaApp = objects[0] as ISchemaApp;

    let startPage = new SchemaPage();
    await startPage.load(schemaApp.startPage);
    let startPageTemplate = appState.getRegisteredPageTemplate(startPage.props.template);

    ReactDOM.render(React.createElement(startPageTemplate as any), document.getElementById("content"));
    //ReactDOM.render(<PageTemplate>ПРИВЕТ 90 !!!</PageTemplate>, document.getElementById("content"));

}

start().then(() => {

    // findSchemaObjectsApiRequest({where: {}}).then((result: ISchemaObject[]) => {
    // });
    //
    //
    // ReactDOM.render(<div>ПРИВЕТ !!!
    //     77<TestButton/><SaveSchemObjectTestButton/><LoadSchemObjectTestButton/><PageTemplate/>
    // </div>, document.getElementById("content"));
})
    .catch((err: any) => {
        ReactDOM.render(<div>ОШИБКА СТАРТА: {err}</div>, document.getElementById("content"));
    });


