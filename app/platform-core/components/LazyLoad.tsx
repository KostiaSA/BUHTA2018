import * as React from "react";
import * as ReactDOM from "react-dom";
import {clone} from "ejson";

export interface ILazyLoadProps {
    onLoad: () => Promise<void>;
    parent: React.Component<any, any>;
    loadParams: any;
}


export class LazyLoad extends React.Component<ILazyLoadProps, any> {

    loaded: boolean;
    error?: string;

    oldLoadParams: any;

    componentDidMount() {
        console.log("LAZY didmount");
        this.error = undefined;
        this.loaded = false;
        this.oldLoadParams = this.props.loadParams;
        this.props.onLoad()
            .then(() => {
                this.loaded = true;
                this.props.parent.forceUpdate();
            })
            .catch((err: any) => {
                this.error = err.toString();
                this.props.parent.forceUpdate();
            })
    }

    componentDidUpdate() {
        console.log("LAZY didupdate",this.oldLoadParams === this.props.loadParams);
        if (this.oldLoadParams === this.props.loadParams)
            return;
        this.error = undefined;
        this.loaded = false;
        this.oldLoadParams = this.props.loadParams;
        this.props.onLoad()
            .then(() => {
                this.loaded = true;
                this.props.parent.forceUpdate();
            })
            .catch((err: any) => {
                this.error = err.toString();
                this.props.parent.forceUpdate();
            })
    }

    // shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any) {
    //     return true;
    // }

    render(): JSX.Element | null {
        console.log("render lasy, loaded=", this.loaded);
        if (this.error)
            return <span style={{color: "red"}}>{this.error.substr(0, 50)}</span>;
        else if (this.loaded)
            return this.props.children as any;
        else
            return null;
    }
}