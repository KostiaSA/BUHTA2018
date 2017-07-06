import {MenuTemplate} from "./components/MenuTemplate";
import {SchemaObject} from "./schema/SchemaObject";
import {PageTemplate} from "./components/PageTemplate";
import {Action} from "./actions/Action";
import {SqlDataType} from "./schema/table/SqlDataType";
import {ISqlDataTypeProps} from "./schema/table/ISqlDataTypeProps";
export class AppState {

    globals: { [propName: string]: any } = {};


    // ------------------ pageTemplates ------------------
    pageTemplates: { [pageTemplateId: string]: typeof PageTemplate; } = {};

    registerPageTemplate(pageTemplateClass: typeof PageTemplate) {
        // if (!pageTemplateClass.pageTemplateId) {
        //     let err = "registerPageTemplate(): неверный класс шаблона страницы";
        //     console.error(err);
        //     throw err;
        // }
        // else
        this.pageTemplates[pageTemplateClass.pageTemplateId] = pageTemplateClass;
    }

    getRegisteredPageTemplate(pageTemplateId: string): typeof PageTemplate {
        let pageClass = this.pageTemplates[pageTemplateId];
        if (!pageClass) {
            let err = "registerPageTemplate(): не найден зарегистрированный шаблон страницы " + pageTemplateId;
            console.error(err);
            throw err;
        }
        else
            return pageClass;
    }

    // ------------------ menuTemplates ------------------
    menuTemplates: { [menuTemplateId: string]: typeof MenuTemplate; } = {};

    registerMenuTemplate(menuTemplateClass: typeof MenuTemplate) {
        // if (!(menuTemplateClass as any).menuTemplateId) {
        //     let err = "registerMenuTemplate(): неверный класс шаблона меню";
        //     console.error(err);
        //     throw err;
        // }
        // else
        this.menuTemplates[menuTemplateClass.menuTemplateId] = menuTemplateClass;
    }

    getRegisteredMenuTemplate(menuTemplateId: string): typeof MenuTemplate {
        let menuClass = this.menuTemplates[menuTemplateId];
        if (!menuClass) {
            let err = "registerMenuTemplate(): не найден зарегистрированный шаблон страницы " + menuTemplateId;
            console.error(err);
            throw err;
        }
        else
            return menuClass;
    }

    // ------------------ actions ------------------
    actions: { [actionId: string]: typeof Action; } = {};

    registerAction(actionClass: typeof Action) {
        // if (!(actionClass as any).actionId) {
        //     let err = "registerAction(): неверный класс action";
        //     console.error(err);
        //     throw err;
        // }
        // else
        this.actions[actionClass.actionId] = actionClass;
    }

    getRegisteredAction(actionId: string): typeof Action {
        let actionClass = this.actions[actionId];
        if (!actionClass) {
            let err = "registerAction(): не найден зарегистрированный action " + actionId;
            console.error(err);
            throw err;
        }
        else
            return actionClass;
    }

    // ------------------ schemaObjects ------------------
    schemaObjects: { [schemaObjectClassName: string]: typeof SchemaObject; } = {};

    registerSchemaObject(schemaObjectClassName: typeof SchemaObject) {
        // if (!schemaObjectClassName.className) {
        //     let err = "registerPageTemplate(): неверный класс объекта схемы";
        //     console.error(err);
        //     throw err;
        // }
        // else
        this.schemaObjects[schemaObjectClassName.className] = schemaObjectClassName;
    }

    getRegisteredSchemaObject(schemaObjectClassName: string): typeof SchemaObject {
        let schemaObjectClass = this.schemaObjects[schemaObjectClassName];
        if (!schemaObjectClass) {
            let err = "registerSchemaObject(): не найден зарегистрированный класс объекта схемы" + schemaObjectClassName;
            console.error(err);
            throw err;
        }
        else
            return schemaObjectClass;
    }

    // ------------------ sqlDataTypes ------------------
    sqlDataTypes: { [sqlDataTypeClassName: string]: typeof SqlDataType; } = {};

    registerSqlDataType(sqlDataTypeClassName: typeof SqlDataType) {
        this.sqlDataTypes[sqlDataTypeClassName.className] = sqlDataTypeClassName;
    }

    getRegisteredSqlDataTypes(): (typeof SqlDataType)[] {
        let ret: (typeof SqlDataType)[] = [];
        for (let typeName in this.sqlDataTypes)
            ret.push(this.sqlDataTypes[typeName]);
        return ret;
    }

    getRegisteredSqlDataType(sqlDataTypeClassName: string): typeof SqlDataType {
        let sqlDataTypeClass = this.sqlDataTypes[sqlDataTypeClassName];
        if (!sqlDataTypeClass) {
            let err = "registerSqlDataType(): не найден зарегистрированный класс типа данных sql" + sqlDataTypeClassName;
            console.error(err);
            throw err;
        }
        else
            return sqlDataTypeClass;
    }
}

export const appState = new AppState();
