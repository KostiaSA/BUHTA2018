import {_SqlDataType} from "./sql/_SqlDataType";
import {_SchemaObject} from "./_SchemaObject";
import {IClassInfo} from "../IClassInfo";

export class _ServerState {
    // classes: { [classSourcePath: string]: Function } = {};
    //
    // registerClass(_class: Function) {
    //     this.classes[(_class as any).className] = _class;
    //     console.log("зарегистрирован класс",(_class as any).className);
    // }

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


    externalScripts: string[] = [];

    registerExternalScript(scriptTag: string) {
        this.externalScripts.push(scriptTag);
    }

    externalStyles: string[] = [];

    registerExternalStyle(linkTag: string) {
        this.externalStyles.push(linkTag);
    }

    // ------------------ schemaObjects ------------------
    // schemaObjects: { [schemaObjectClassName: string]: typeof _SchemaObject; } = {};
    //
    // registerSchemaObject(schemaObjectClassName: typeof _SchemaObject) {
    //     this.schemaObjects[schemaObjectClassName.className] = schemaObjectClassName;
    // }
    //
    // getRegisteredSchemaObject(schemaObjectClassName: string): typeof _SchemaObject {
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
    sqlDataTypes: { [sqlDataTypeClassName: string]: typeof _SqlDataType; } = {};

    registerSqlDataType(sqlDataTypeClassName: typeof _SqlDataType) {
        this.sqlDataTypes[sqlDataTypeClassName.className] = sqlDataTypeClassName;
    }

    getRegisteredSqlDataTypes(): (typeof _SqlDataType)[] {
        let ret: (typeof _SqlDataType)[] = [];
        for (let typeName in this.sqlDataTypes)
            ret.push(this.sqlDataTypes[typeName]);
        return ret;
    }

    getRegisteredSqlDataType(sqlDataTypeClassName: string): typeof _SqlDataType {
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

export const serverState = new _ServerState();
