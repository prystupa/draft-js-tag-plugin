import React from "react";
import Editor from "draft-js-plugins-editor";
import {EditorState} from "draft-js";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: EditorState.createEmpty()
        };
    }

    onChange = (editor) => {
        this.setState({editor});
    };

    render() {
        return (
            <div className="w-100 h-100 d-flex align-items-center">
                <div className="border w-50 mx-auto h-50 px-2"
                     style={{overflow: 'auto'}}
                     onClick={() => this.editor.focus()}>
                    <Editor ref={ref => this.editor = ref} editorState={this.state.editor}
                            onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}

export default App;
