import * as React from "react";
import * as ReactDOM from "react-dom";
import {pingApiRequest} from "../rest-api/pingApiRequest";
import {superPingApiRequest} from "../rest-api/superPingApiRequest";


export interface ITestButtonProps  {

}

export class TestButton extends React.Component<ITestButtonProps,ITestButtonProps> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    componentDidMount() {
    };

    handleClick=()=>{
        pingApiRequest({login:"111"}).then((eee:any)=>{console.log(eee);});
        superPingApiRequest({super_login:"222"}).then((eee:any)=>{console.log(eee);});
        console.log("click1");
    };

    render() {

        return (
            <button onClick={()=>{ this.handleClick()}}>Test button 1</button>
        );
    }

}