import axios from 'axios';

// ASYNC ACTION CREATOR
export function loadNotes () {
    return (dispatch) => {
        dispatch(fetchNotesRequest());

        axios
            .get('https://reqres.in/api/unknown')
            .then(res => {
                dispatch(fetchNotesSuccess(res.data.data))
            })        
            .catch(err => {
                dispatch(fetchNotesError(err))
            })
    
    }
}
const fetchNotesRequest = () => ({type: 'FETCH_NOTES_REQUEST'});
const fetchNotesSuccess = (notes) => ({type: 'FETCH_NOTES_SUCCESS', data: notes});
const fetchNotesError = (error) => ({type: 'FETCH_NOTES_ERROR', error: error});

// SYNC ACTION CREATORS
export function selectNote (index) {
    return {
        type: 'SELECT_NOTE',
        index: index
    }
}

export function editorInput (value, line) {
    return {
        type: 'UPDATE_EDITOR',
        value: value,
        line: line
    }
}

export function saveNote (value) {
    return {
        type: 'SAVE_NOTE',
        value: value
    }
}

export function addNewNote () {
    return {
        type: 'ADD_NEW_NOTE'
    }
}

export function clickAway () {
    return {
        type: 'CLICK_AWAY'
    }
}

export function enterKeyPress () {
    return {
        type: 'ENTER_KEY_PRESSED'
    }
}

export function handleEditorClick () {
    return {
        type: 'HANDLE_EDITOR_CLICK'
    }
}

export function onSearchInputChange (value) {
    return {
        type: 'ON_SEARCH_INPUT_CHANGE',
        value: value
    }
}

export function deleteNote (i) {
    return {
        type: 'DELETE_NOTE',
        index: i
    }
}
