import * as React from "react";
import * as ReactDOM from "react-dom";
import {clone, equals} from "ejson";

export interface ILazyRenderProps {
    render: () => Promise<JSX.Element>;
    params: any;
}


export class LazyRender extends React.Component<ILazyRenderProps, any> {

    rendered: JSX.Element;
    error?: string;

    oldRenderParams: any;

    componentDidMount() {
        this.error = undefined;
        this.oldRenderParams = this.props.params;
        this.props.render()
            .then((rendered: JSX.Element) => {
                this.rendered = rendered;
                this.forceUpdate();
            })
            .catch((err: any) => {
                this.error = err.toString();
                this.forceUpdate();
            })
    }

    componentDidUpdate() {
        if (equals(this.oldRenderParams,this.props.params))
            return;
        this.oldRenderParams = this.props.params;
        this.error = undefined;
        this.props.render()
            .then((rendered: JSX.Element) => {
                this.rendered = rendered;
                this.forceUpdate();
            })
            .catch((err: any) => {
                this.error = err.toString();
                this.forceUpdate();
            })
    }

    render(): JSX.Element | null {
        if (this.error)
            return <span style={{color: "red"}}>{this.error.substr(0, 50)}</span>;
        else if (this.rendered)
            return this.rendered;
        else
            return null;
    }
}