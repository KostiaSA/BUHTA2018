import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";
import {SchemaTable} from "../schema/table/SchemaTable";


export class SaveSchemObjectTestButton extends React.Component<any, any> {
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
        org.props.name = "Организация";
        org.props.className = "SchemaTable";
        org.props.description = "Справочник организаций";
        org.save().then((eee: any) => {
            console.log("Организация save Ok");
        });
    };

    render() {

        return (
            <button onClick={() => {
                this.handleClick()
            }}>SaveSchemObjectTestButton</button>
        );
    }

}