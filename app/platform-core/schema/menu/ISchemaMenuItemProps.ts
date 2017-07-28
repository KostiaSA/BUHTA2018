
import {IActionProps} from "../../actions/IActionProps";

export interface ISchemaMenuItemProps {
    key: string;
    path: string;
    title: string;
    action:IActionProps;
    icon?: string;
    children?: ISchemaMenuItemProps[];
}

