import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ILazyLoadProps {
    onLoad: () => Promise<void>;
    parent:React.Component<any,any>;
    loadParams?: any;
}


export class LazyLoad extends React.Component<ILazyLoadProps, any> {

    loaded: boolean;
    error?: string;

    componentDidMount() {
        this.error = undefined;
        this.loaded = false;
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

    render(): JSX.Element | null {
        if (this.error)
            return <span style={{color: "red"}}>{this.error.substr(0, 50)}</span>;
        else if (this.loaded)
            return this.props.children as any;
        else
            return null;
    }
}