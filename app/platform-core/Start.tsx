import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {findSchemaObjectsApiRequest} from "./schema/api/findSchemaObjectsApiRequest";
import {appState} from "./AppState";
import {ISchemaAppProps} from "./schema/ISchemaApp";
import {SchemaPage} from "./schema/SchemaPage";
import {IPageTemplateProps} from "./components/PageTemplate";
import {createSchemaObject} from "./schema/SchemaObject";
import {ISchemaPageProps} from "./schema/ISchemaPage";


async function start() {
    await require("./clientStartup").clientStartup();
    await require("../platform-admin/clientStartup").clientStartup();

    // let objects = (await findSchemaObjectsApiRequest({where: {type: "SchemaApp"}})).objects;
    // if (objects.length === 0)
    //     throw "в конфигурации нет ни одного объекта 'SchemaApp'";
    //
    // let schemaApp = objects[0] as ISchemaAppProps;

    // let startPage = new SchemaPage();
    // await startPage.load((document as any).schemaPageId);
    let startPage=await createSchemaObject<SchemaPage>((document as any).schemaPageId);
    let startPageTemplate = appState.getRegisteredPageTemplate(startPage.props.template);

    ReactDOM.render(React.createElement(startPageTemplate,{schemaPageId:startPage.props.id} as IPageTemplateProps), document.getElementById("content"));
    //ReactDOM.render(<PageTemplate>ПРИВЕТ 90 !!!</PageTemplate>, document.getElementById("content"));

}

start()
    .then(() => {

        // findSchemaObjectsApiRequest({where: {}}).then((result: ISchemaObjectProps[]) => {
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


