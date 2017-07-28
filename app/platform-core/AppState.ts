import {ISqlDataTypeClassInfo, SqlDataType} from "./schema/table/datatypes/SqlDataType";
import {IClassInfo} from "./IClassInfo";
import {ISchemaObjectClassInfo, SchemaObject} from "./schema/SchemaObject";
import {AccessRole} from "./access-role/AccessRole";

export class AppState {

    registeredPrefixes: { [prefix: string]: IClassInfo<any> } = {};
    registeredClassInfos: { [className: string]: IClassInfo<any> } = {};
    registeredAccessRoles: { [roleId: string]: AccessRole } = {};

    registerAccessRole(role: AccessRole) {
        if (this.registeredAccessRoles[role.id]) {
            let msg = "уже зарегистрирована роль '" + role.id + ":" + role.title + "'";
            console.error(msg);
            throw msg + ", " + __filename;
        }
        this.registeredAccessRoles[role.id] = role;

    }

    registerClassInfo(regInfo: IClassInfo<any>) {
        if (this.registeredClassInfos[regInfo.className]) {
            let msg = "уже зарегистрирован класс " + regInfo.className;
            console.error(msg);
            throw msg + ", " + __filename;
        }
        this.registeredClassInfos[regInfo.className] = regInfo;

        if (regInfo.recordIdPrefix) {
            if (this.registeredPrefixes[regInfo.recordIdPrefix]) {
                let msg = "уже зарегистрирован префикс" + regInfo.recordIdPrefix;
                console.error(msg);
                throw msg + ", " + __filename;
            }
            this.registeredPrefixes[regInfo.recordIdPrefix] = regInfo;
        }
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

    getRegisteredClassInfoByPrefix<T extends IClassInfo<any>>(prefix: string): T | undefined {
        prefix = prefix.split(":")[0];
        let objClass = this.registeredPrefixes[prefix];
        if (!objClass) {
            return undefined;
            //let err = "registerClass(): не найден зарегистрированный префикс " + prefix;
            //console.error(err);
            //throw err;
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

    getRegisteredSqlDataTypes(): ISqlDataTypeClassInfo[] {
        //return [];
        let ret: ISqlDataTypeClassInfo[] = [];
        for (let infoName in this.registeredClassInfos) {
            let info = this.registeredClassInfos[infoName];
            if (info.constructor.prototype instanceof SqlDataType)
                ret.push(info as any);
        }
        return ret;
    }

    getRegisteredSchemaObjectTypes(): ISchemaObjectClassInfo<any>[] {
        //return [];
        let ret: ISchemaObjectClassInfo<any>[] = [];
        for (let infoName in this.registeredClassInfos) {
            let info = this.registeredClassInfos[infoName];
            if (info.constructor.prototype instanceof SchemaObject)
                ret.push(info as any);
        }
        return ret;
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
