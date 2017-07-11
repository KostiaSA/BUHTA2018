import * as  React from "react";
import * as  ReactDOM from "react-dom";
import {findSchemaObjectsApiRequest} from "./schema/api/findSchemaObjectsApiRequest";
import {appState} from "./AppState";
import {ISchemaAppProps} from "./schema/ISchemaApp";
import {ISchemaPageClassInfo, SchemaPage} from "./schema/SchemaPage";
import {IPageTemplateClassInfo, IPageTemplateProps} from "./components/PageTemplate";
import {ISchemaPageProps} from "./schema/ISchemaPage";
import {SchemaHelper} from "./schema/SchemaHelper";


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
    let startPage=await SchemaHelper.createSchemaObject<SchemaPage>((document as any).schemaPageId);
    let startPageTemplate = appState.getRegisteredClassInfo<IPageTemplateClassInfo>(startPage.props.template);

    ReactDOM.render(React.createElement(startPageTemplate.constructor,{schemaPageId:startPage.props.id} as any /*IPageTemplateProps*/), document.getElementById("content"));
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
        console.error(err);
        ReactDOM.render(<div>ОШИБКА СТАРТА: {err.toString()}</div>, document.getElementById("content"));
    });


