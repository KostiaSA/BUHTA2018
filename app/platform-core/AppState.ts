import {MenuTemplate} from "./components/MenuTemplate";
import {SchemaObject} from "./schema/SchemaObject";
import {PageTemplate} from "./components/PageTemplate";
import {Action} from "./actions/Action";
import {ISqlDataTypeClassInfo, SqlDataType} from "./schema/table/SqlDataType";
import {ISqlDataTypeProps} from "./schema/table/ISqlDataTypeProps";
import {IClassInfo} from "./IClassInfo";

export class AppState {

    registeredClassInfos: { [className: string]: IClassInfo<any> } = {};

    registerClassInfo(regInfo: IClassInfo<any>) {
        if (this.registeredClassInfos[regInfo.className]) {
            let msg = "уже зарегистрирован класс " + regInfo.className;
            console.error(msg);
            throw msg + ", " + __filename;
        }
        this.registeredClassInfos[regInfo.className] = regInfo;
    }

    getRegisteredClassInfo<T extends IClassInfo<any>>(className: string): T {
        let objClass = this.registeredClassInfos[className];
        if (!objClass) {
            let err = "registerClass(): не найден зарегистрированный класс " + className;
            console.error(err);
            throw err;
        }
        else
            return objClass as any;
    }


    // classes: { [classSourcePath: string]: Function } = {};
    //
    // registerClass(_class: Function) {
    //     if (!(_class as any).className) {
    //         let msg = "не найден className";
    //         console.error(msg);
    //         throw msg + ", " + __filename;
    //     }
    //     this.classes[(_class as any).className] = _class;
    // }

    // getRegisteredClass(className: string): any {
    //     let objClass = this.classes[className];
    //     if (!objClass) {
    //         let err = "registerClass(): не найден зарегистрированный класс " + className;
    //         console.error(err);
    //         throw err;
    //     }
    //     else
    //         return objClass as any;
    // }


    globals: { [propName: string]: any } = {};


    // ------------------ pageTemplates ------------------
    // pageTemplates: { [pageTemplateId: string]: typeof PageTemplate; } = {};
    //
    // registerPageTemplate(pageTemplateClass: typeof PageTemplate) {
    //     // if (!pageTemplateClass.className) {
    //     //     let err = "registerPageTemplate(): неверный класс шаблона страницы";
    //     //     console.error(err);
    //     //     throw err;
    //     // }
    //     // else
    //     this.pageTemplates[pageTemplateClass.className] = pageTemplateClass;
    // }

    // getRegisteredPageTemplate(pageTemplateId: string): typeof PageTemplate {
    //     let pageClass = this.pageTemplates[pageTemplateId];
    //     if (!pageClass) {
    //         let err = "registerPageTemplate(): не найден зарегистрированный шаблон страницы " + pageTemplateId;
    //         console.error(err);
    //         throw err;
    //     }
    //     else
    //         return pageClass;
    // }

    // //------------------ menuTemplates ------------------
    // menuTemplates: { [menuTemplateId: string]: typeof MenuTemplate; } = {};
    //
    // registerMenuTemplate(menuTemplateClass: typeof MenuTemplate) {
    //     // if (!(menuTemplateClass as any).menuTemplateId) {
    //     //     let err = "registerMenuTemplate(): неверный класс шаблона меню";
    //     //     console.error(err);
    //     //     throw err;
    //     // }
    //     // else
    //     this.menuTemplates[menuTemplateClass.menuTemplateId] = menuTemplateClass;
    // }
    //
    // getRegisteredMenuTemplate(menuTemplateId: string): typeof MenuTemplate {
    //     let menuClass = this.menuTemplates[menuTemplateId];
    //     if (!menuClass) {
    //         let err = "registerMenuTemplate(): не найден зарегистрированный шаблон страницы " + menuTemplateId;
    //         console.error(err);
    //         throw err;
    //     }
    //     else
    //         return menuClass;
    // }

    // ------------------ actions ------------------
    // actions: { [actionId: string]: typeof Action; } = {};
    //
    // registerAction(actionClass: typeof Action) {
    //     // if (!(actionClass as any).actionId) {
    //     //     let err = "registerAction(): неверный класс action";
    //     //     console.error(err);
    //     //     throw err;
    //     // }
    //     // else
    //     this.actions[actionClass.actionId] = actionClass;
    // }
    //
    // getRegisteredAction(actionId: string): typeof Action {
    //     let actionClass = this.actions[actionId];
    //     if (!actionClass) {
    //         let err = "registerAction(): не найден зарегистрированный action " + actionId;
    //         console.error(err);
    //         throw err;
    //     }
    //     else
    //         return actionClass;
    // }

    // // ------------------ schemaObjects ------------------
    // schemaObjects: { [schemaObjectClassName: string]: typeof SchemaObject; } = {};
    //
    // registerSchemaObject(schemaObjectClassName: typeof SchemaObject) {
    //     // if (!schemaObjectClassName.className) {
    //     //     let err = "registerPageTemplate(): неверный класс объекта схемы";
    //     //     console.error(err);
    //     //     throw err;
    //     // }
    //     // else
    //     this.schemaObjects[schemaObjectClassName.className] = schemaObjectClassName;
    // }
    //
    // getRegisteredSchemaObject(schemaObjectClassName: string): typeof SchemaObject {
    //     let schemaObjectClass = this.schemaObjects[schemaObjectClassName];
    //     if (!schemaObjectClass) {
    //         let err = "registerSchemaObject(): не найден зарегистрированный класс объекта схемы" + schemaObjectClassName;
    //         console.error(err);
    //         throw err;
    //     }
    //     else
    //         return schemaObjectClass;
    // }

    // ------------------ sqlDataTypes ------------------
    // sqlDataTypes: { [sqlDataTypeClassName: string]: typeof SqlDataType; } = {};
    //
    // registerSqlDataType(sqlDataTypeClassName: typeof SqlDataType) {
    //     this.sqlDataTypes[sqlDataTypeClassName.className] = sqlDataTypeClassName;
    // }

    getRegisteredSqlDataTypes(): (ISqlDataTypeClassInfo)[] {
        return [];
        // let ret: (typeof SqlDataType)[] = [];
        // for (let typeName in this.sqlDataTypes)
        //     ret.push(this.sqlDataTypes[typeName]);
        // return ret;
    }

    // getRegisteredSqlDataType(sqlDataTypeClassName: string): typeof SqlDataType {
    //     let sqlDataTypeClass = this.sqlDataTypes[sqlDataTypeClassName];
    //     if (!sqlDataTypeClass) {
    //         let err = "registerSqlDataType(): не найден зарегистрированный класс типа данных sql" + sqlDataTypeClassName;
    //         console.error(err);
    //         throw err;
    //     }
    //     else
    //         return sqlDataTypeClass;
    // }
}

export const appState = new AppState();
