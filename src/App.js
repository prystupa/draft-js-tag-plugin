import React from "react";
import Editor from "draft-js-plugins-editor";
import {EditorState} from "draft-js";
import createMentionPlugin, {defaultSuggestionsFilter} from "draft-js-mention-plugin";

import "bootstrap/dist/css/bootstrap.css";
import "draft-js-mention-plugin/lib/plugin.css";

import mentions from "./mentions";
import "./App.css";


function positionSuggestionsBelowTextFullWidth(containerClassName) {
    function findContainer(element) {
        if (element === null || element.classList.contains(containerClassName)) {
            return element;
        }

        return findContainer(element.parentElement);
    }

    return ({state, props, popover, decoratorRect}) => {
        const container = findContainer(popover, containerClassName);

        if (state.isActive && props.suggestions.size > 0) {
            const containerRect = container.getBoundingClientRect();
            const scrollTop = container.scrollTop;

            return {
                maxWidth: 'none',
                width: `${container.clientWidth}px`,
                top: `${decoratorRect.bottom + scrollTop - containerRect.top}px`,
                transform: `scaleY(1)`
            };
        } else if (state.isActive) {
            return {
                transform: 'scaleY(0)'
            };
        }

        return {};
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editor: EditorState.createEmpty(),
            suggestions: mentions
        };

        this.mentionPlugin = createMentionPlugin({
            positionSuggestions: positionSuggestionsBelowTextFullWidth('test-editor-container')
        });
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
            <div className="test-editor-container border w-100 h-100"
                 style={{overflow: 'auto', position: 'relative'}}
                 onClick={() => this.editor.focus()}>
                <div className="px-3">
                    <Editor ref={ref => this.editor = ref} editorState={this.state.editor}
                            onChange={this.onChange}
                            plugins={plugins}/>
                </div>
                <MentionSuggestions suggestions={this.state.suggestions}
                                    onSearchChange={this.onSearchChange}/>
            </div>
        );
    }
}

export default App;
