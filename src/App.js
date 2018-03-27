import React from "react";
import Editor from "draft-js-plugins-editor";
import {EditorState} from "draft-js";

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
            <div>
                <Editor editorState={this.state.editor}
                        onChange={this.onChange}/>
            </div>
        );
    }
}

export default App;
