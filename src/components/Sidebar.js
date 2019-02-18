import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNotes, selectNote, addNewNote, clickAway, editorInput, onSearchInputChange, deleteNote } from '../actions/actions';
import NoteTitles from './NoteTitles';
import moment from 'moment';

class Sidebar extends Component {

    componentWillReceiveProps (newProps) {
        if (newProps.newNoteButtonClicked) {
            document.getElementsByClassName('newNoteButton')[0].style = "opacity: 0.1; transition: opacity .25s ease-in-out; cursor: default;"
        }
        if (!newProps.newNoteButtonClicked) {
            document.getElementsByClassName('newNoteButton')[0].style = "opacity: 1; transition: opacity .25s ease-in-out;"
        }
    }

    render() {
        return ( 
            <div className="sidebar" onClick={this.props.clickAway.bind(this)}>
                <i onClick={this.props.addNewNote} className="fa fa-plus fa-lg newNoteButton" aria-hidden="true"></i>
                <div className="searchNotes">
                    <i className="fa fa-search searchIcon" aria-hidden="true"></i>
                    <form>
                        <label htmlFor="searchInput"></label>
                        <input 
                            className="searchInput" 
                            name="searchInput" 
                            type="search"
                            autoComplete="off"
                            placeholder="Search Notes"
                            onChange={this.props.onSearchInputChange}
                        ></input>
                    </form>
                </div>
                <div>
                    <ul className="list">
                        { this.createNoteTitles(this.props.notes) }
                    </ul>
                </div>
            </div>
        );
    }

    createNoteTitles (notes) {
        return notes.map((note, i) => {
            return (
                <NoteTitles 
                    notes={notes}
                    title={note.title}
                    body={note.content}
                    selectNote={this.props.selectNote}
                    searchBarInput={this.props.searchBarInput}
                    deleteNote={this.props.deleteNote}
                    editorInput={this.props.editorInput}
                    moment={moment}
                    i={i}
                    key={i}
                />
            )
        })
    }
}

function mapStateToProps (state) {
    return {
        notes: state.notes,
        fetching: state.fetching,
        formInput: state.formInput,
        newNoteButtonClicked: state.newNoteButtonClicked,
        clickAway: state.clickAway,
        editorInput: state.editorInput,
        editorSelected: state.editorSelected,
        searchBarInput: state.searchBarInput
    }
}

function mapDispatchToProps (dispatch) {
    return {
        loadNotes: () => {
            dispatch(loadNotes())
        },
        selectNote: (index) => {
            dispatch(selectNote(index))
            dispatch(clickAway())
        }, 
        addNewNote: (e) => {
            document.getElementsByClassName('noteEditor')[0].removeAttribute('readonly');
            document.getElementsByClassName('noteEditor')[0].removeAttribute('style');

            // if addNewNoteButton is seleceted, don't enable dispatch of any actions
            if (e.target.style.opacity === "0.1") return;
            
            dispatch(editorInput('clear'))
            dispatch(addNewNote())
        },
        clickAway: (e) => {
            // if you click on an existing note OR the ADD NOTE button, nothing will dispatch and the note won't save
            if ( document.getElementsByClassName('list')[0].contains(e.target) || 
                e.target.className.includes('newNoteButton')
            ) return;

            dispatch(clickAway())
            dispatch(editorInput('clear'))
        },
        onSearchInputChange: (e) => {
            dispatch(onSearchInputChange(e.target.value))
        },
        deleteNote: (i) => {
            dispatch(deleteNote(i))
            dispatch(editorInput('clear'))
            dispatch(clickAway())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);