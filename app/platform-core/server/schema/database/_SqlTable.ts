
export type _SqlDataType =
    "sbyte" | "byte" | "short" | "ushort" | "int" | "uint" | "long" | "ulong" |
    "float" | "double" | "decimal"|
    "string" | "text" |
    "guid" |
    "date" | "datetime" | "timestamp" | "blob";


export interface _ISqlTableColumn {
    name: string;
    dataType: _SqlDataType;
    dataLen?: number;
    decimals?: number;
    notNull?: boolean;
    primaryKey?: boolean;
}

export interface _ISqlTable {
    name: string;
    columns: _ISqlTableColumn[];
    isTemp?: boolean;
}