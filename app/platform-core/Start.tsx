import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {findSchemaObjectsApiRequest} from "./schema/api/findSchemaObjectsApiRequest";
import {appState} from "./AppState";
import {ISchemaApp} from "./schema/ISchemaApp";
import {SchemaPage} from "./schema/SchemaPage";
import {IPageTemplateProps} from "./components/PageTemplate";


async function start() {
    await require("./clientStartup").clientStartup();
    await require("../platform-admin/clientStartup").clientStartup();

    // let objects = (await findSchemaObjectsApiRequest({where: {type: "SchemaApp"}})).objects;
    // if (objects.length === 0)
    //     throw "в конфигурации нет ни одного объекта 'SchemaApp'";
    //
    // let schemaApp = objects[0] as ISchemaApp;

    let startPage = new SchemaPage();
    await startPage.load((document as any).schemaPageId);
    let startPageTemplate = appState.getRegisteredPageTemplate(startPage.props.template);

    ReactDOM.render(React.createElement(startPageTemplate as any,{schemaPageId:startPage.props.id} as IPageTemplateProps), document.getElementById("content"));
    //ReactDOM.render(<PageTemplate>ПРИВЕТ 90 !!!</PageTemplate>, document.getElementById("content"));

}

start()
    .then(() => {

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


