import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {SchemaTable} from "../schema/ISchemaTable";


export class LoadSchemObjectTestButton extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    componentDidMount() {
    };

    handleClick = () => {

        let org = new SchemaTable();
        org.props = {} as any;
        org.props.id = "23423fsfd";
        org.load();
        org.load().then((eee: any) => {
            console.log("Организация load Ok",org.props);
        });
    };

    render() {

        return (
            <button onClick={() => {
                this.handleClick()
            }}>LoadSchemObjectTestButton</button>
        );
    }

}