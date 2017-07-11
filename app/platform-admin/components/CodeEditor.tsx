import * as React from "react";
import {EditorConfiguration, EditorFromTextArea} from "codemirror";
var CodeMirror = require("codemirror");

// adapted from:
// https://github.com/facebook/react/blob/master/docs/_js/live_editor.js#L16

// also used as an example:
// https://github.com/facebook/react/blob/master/src/browser/ui/dom/components/ReactDOMInput.js

export interface ICodeEditorProps {
    code: string;
    readOnly?: boolean;
    onChange?: (code: string) => void;
    options: EditorConfiguration;
}


export class CodeEditor extends React.Component<ICodeEditorProps, any> {

    editor: EditorFromTextArea;
    textArea: HTMLElement;
    // propTypes() {
    //     value: React.PropTypes.string,
    //     defaultValue: React.PropTypes.string,
    //     style: React.PropTypes.object,
    //     className: React.PropTypes.string,
    //     onChange: React.PropTypes.func
    // },

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.textArea, this.props.options);
        this.editor.on("change", this.handleChange);

    }

    componentDidUpdate() {
        if (this.editor) {
            if (this.props.code != null) {
                if (this.editor.getValue() !== this.props.code) {
                    this.editor.setValue(this.props.code);
                }
            }
        }
    }

    handleChange = () => {
        if (this.editor) {
            var value = this.editor.getValue();
            if (value !== this.props.code) {
                this.props.onChange && this.props.onChange(value);
                if (this.editor.getValue() !== this.props.code) {
                    //if (this.state.isControlled) {
                    //  this.editor.setValue(this.props.code);
                    //} else {
                    this.props.code = value;
                    //}
                }
            }
        }
    }

    render() {
        return (
            <textarea
                ref={(e) => {
                    this.textArea = e
                }}
                style={{height:"100%"}}
                value={this.props.code}
                readOnly={this.props.readOnly}
                onChange={() => this.props.onChange && this.props.onChange("")}
            />
        );
    }
}


