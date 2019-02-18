import React from 'react';
import { enterKeyPress } from '../actions/actions';

const NotesTitles = props => {
    let { notes, selectNote, searchBarInput, editorInput, deleteNote, moment, i } = props;

    if (props.searchBarInput) {
        var searchBarInputLength = props.searchBarInput.length;
        var noteTitle = props.title.slice(0, searchBarInputLength);
        if (searchBarInput.toLowerCase() !== noteTitle.toLowerCase()) return null;
    }

    return (
        <div className="card">
            <li className="noteTitle" onClick={selectNote.bind(null, i)}>
                <div className="noteTitleProper">
                    <strong>{ !editorInput.length && notes[0].title.length == 1 ? 'New Note' : notes[i].title || 'New Note' }</strong>
                </div> 
                <div>
                    <i className="subTitle">{ moment(notes[i].timeCreated).fromNow() }</i>
                    <span className="subTitle2">{ notes[i].subtitle || 'No additional text' }</span>
                </div>
            </li>
            <p className="deleteButton" onClick={ props.deleteNote.bind(null, i) }>x</p>
        </div>
    )
}

export default NotesTitles;