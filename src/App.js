import React from "react";
import Editor from "draft-js-plugins-editor";
import {EditorState} from "draft-js";
import createMentionPlugin, {defaultSuggestionsFilter} from "draft-js-mention-plugin";

import "bootstrap/dist/css/bootstrap.css";
import "draft-js-mention-plugin/lib/plugin.css";

import mentions from "./mentions";
import "./App.css";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: EditorState.createEmpty(),
            suggestions: mentions
        };

        this.mentionPlugin = createMentionPlugin();
    }

    onChange = (editor) => {
        this.setState({editor});
    };

    onSearchChange = ({value}) => {
        this.setState({suggestions: defaultSuggestionsFilter(value, mentions)});
    };

    render() {
        const {MentionSuggestions} = this.mentionPlugin;
        const plugins = [this.mentionPlugin];

        return (
            <div className="w-100 h-100 d-flex align-items-center">
                <div className="border w-50 mx-auto h-50 px-2"
                     style={{overflow: 'auto'}}
                     onClick={() => this.editor.focus()}>
                    <Editor ref={ref => this.editor = ref} editorState={this.state.editor}
                            onChange={this.onChange}
                            plugins={plugins}/>

                    <MentionSuggestions suggestions={this.state.suggestions}
                                        onSearchChange={this.onSearchChange}/>
                </div>
            </div>
        );
    }
}

export default App;
