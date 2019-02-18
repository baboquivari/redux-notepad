import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editorInput, saveNote, enterKeyPress, handleEditorClick } from '../actions/actions';


class TextEditor extends Component {

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
   
    componentWillReceiveProps (newProps) {
        if (newProps.newNoteButtonClicked) {
            document.getElementsByClassName('noteEditor')[0].focus();
        }
        if (newProps.editorSelected) {
            document.getElementsByClassName('noteEditor')[0].removeAttribute('disabled')
            document.getElementsByClassName('noteEditor')[0].removeAttribute('style')
        }
    }

    render () {
        return (
            <div className="notes">
                <textarea 
                    className="noteEditor" 
                    readOnly
                    style={{cursor: 'default'}}
                    onChange={this.props.editorInput.bind(this)} 
                    value={this.props.editorText}
                >
                </textarea>
            </div>
        )
    }

    handleClick (e) {
        e.target.blur();
    }
}

function mapStateToProps (state) {
    return {
        notes: state.notes,
        selectedNoteIndex: state.selectedNoteIndex,
        newNoteButtonClicked: state.newNoteButtonClicked,
        editorText: state.editorInput,
        editorSelected: state.editorSelected,
        enterKeyPressed: state.enterKeyPressed
    }
}

function mapDispatchToProps (dispatch) {
    return {
        editorInput: (e) => {
            var textarea = document.getElementsByClassName('noteEditor')[0];
            var line = textarea.value.substr(0, textarea.selectionStart).split('\n').length;

            dispatch(editorInput(e.target.value, line))
        },
        saveNote: (formValue, event) => {
            event.preventDefault();
            document.getElementById('noteInput').value = ''; // reset form
            dispatch(saveNote(formValue))
        },
        enterKeyPress: () => {
            dispatch(enterKeyPress())
        },
        handleEditorClick: () => {
            dispatch(handleEditorClick())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);